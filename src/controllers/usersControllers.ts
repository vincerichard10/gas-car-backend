import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel';
import { JWT_SECRET } from '../utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        const isPasswordValid = await bcrypt.compare(password as string, user.password as string);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const personalDetails = async (req: Request, res: Response) => {
    try {
        const { id, first_name, last_name, phone, address, city, country, postal_code } = req.body;

        if (!first_name || !last_name || !phone || !address || !city || !country || !postal_code) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // if (!validatePhone(phone)) {
        //     return res.status(400).json({ message: 'Invalid phone number' });
        // }

        // if (!validatePostalCode(postal_code)) {
        //     return res.status(400).json({ message: 'Invalid postal code' });
        // }

        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({ message: 'user does not exist' });
        }


        user.first_name = first_name;
        user.last_name = last_name;
        user.phone = phone;
        user.address = address;
        user.city = city;
        user.country = country;
        user.postal_code = postal_code;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Personal details saved successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller for retrieving all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};