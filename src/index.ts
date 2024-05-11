import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { config } from './config';
import bodyParser from 'body-parser';
import authRoutes from './routes/usersRoutes';
import payRoute from './routes/paymentRoutes';
import carRoute from './routes/vehicleRoute'


const app = express();
dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());


app.get("/api/v1/test", async (req, res) => {
    return res.json({ "message": "ONLINE" })
})

// Routes
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/pay', payRoute);

app.use('/api/v1/car', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

/*###########################    connect to db and start listening  */
mongoose.connect(process.env.MONGO_URI || "")
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("**** backend running ****")
      
        })
    })
    .catch((error) => {
        console.log(error)
    })
/*########################     end of the line */
