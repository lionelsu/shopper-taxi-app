import express from 'express';
import rideRoutes from './routes/ride.route';

const app = express();
app.use(express.json());

app.use('/ride', rideRoutes);

export default app;