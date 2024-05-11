import express from 'express';
import { vehicleDetails, getAllVehicle, getVehicleByid } from '../controllers/VehiclesControllers';


const router = express.Router();

router.post('/details', vehicleDetails);
router.post('/all', getAllVehicle);
router.post('/get:id', getVehicleByid);

export default router;