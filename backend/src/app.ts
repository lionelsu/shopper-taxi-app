import express from 'express';
import rideRoutes from './routes/ride.route';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/ride', rideRoutes);

export default app;