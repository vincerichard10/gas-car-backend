import express from 'express';
import { makePayment, processPayment, getLoanHistory } from '../controllers/paymentsControllers';


const router = express.Router();

router.post('/payment', makePayment);
router.post('/process', processPayment);
router.post('/getLoanHistory', processPayment);

export default router;