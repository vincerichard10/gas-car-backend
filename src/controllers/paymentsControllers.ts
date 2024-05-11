import { Request, Response } from 'express';
import Payment from '../models/paymentModel';
import User from '../models/usersModel';
import { randomBytes } from 'crypto';


export const makePayment = async (req: Request, res: Response) => {
    try {
        const { UserId, amount } = req.body;

        if ( !amount ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const payment = await Payment.find({ user: UserId })
   
        if (!payment) {
            return res.status(401).json({ message: 'user does not exist' });
        }

        res.status(201).json({ message: 'Payment submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getLoanHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        // Retrieve loan history for the user
        const payment = await Payment.find({ user: userId });

        res.status(200).json({ payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const processPayment = async (req: Request, res: Response) => {
    try {
        const { paymentId, status } = req.body;

        // Validate the request body
        if (!paymentId || !status) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the loan by ID and update its status
        const loan = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        res.status(200).json({ message: 'Loan status updated successfully', loan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};