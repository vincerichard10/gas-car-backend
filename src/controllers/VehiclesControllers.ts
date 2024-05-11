import { Request, Response } from 'express';
import Vehicle from '../models/vehicleModel';


export const vehicleDetails = async (req: Request, res: Response) => {
    try {
        const {
            id,
            vin,
            make,
            model,
            year,
            color,
            licensePlate,
            registrationState,
            ownerName,
            ownerContact,
            insuranceDetails,
            odometerReading,
            fuelType,
            engineSize,
            transmissionType,
            hasTrackingDevice
        } = req.body;


        if (!vin || !make || !model || !year || !color || !licensePlate || !registrationState || !ownerName || !ownerContact || !insuranceDetails || !odometerReading || !fuelType || !engineSize || !transmissionType || hasTrackingDevice === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const car = await Vehicle.findById({ user: id });

        if (!car) {
            return res.status(401).json({ message: 'car does not exist' });
        }

        car.vin = vin,
            car.make = make,
            car.mod = model,
            car.year = year,
            car.color = color,
            car.licensePlate = licensePlate,
            car.registrationState = registrationState,
            car.ownerName = ownerName,
            car.ownerContact = ownerContact,
            car.insuranceDetails = insuranceDetails,
            car.odometerReading = odometerReading,
            car.fuelType = fuelType,
            car.engineSize = engineSize,
            car.transmissionType = transmissionType,
            car.hasTrackingDevice = hasTrackingDevice


        // Save the new car to the database
        await car.save();

        res.status(201).json({ message: 'Car details saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const cars = await Vehicle.find();
        res.status(200).json({ cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getVehicleByid = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const car = await Vehicle.findById({ id });

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json({ car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};