import { Router } from "express";
import { estimateRide, confirmRide } from "../controllers/ride.controller";

const rideRoutes = Router();

rideRoutes.post('/estimate', estimateRide);
rideRoutes.patch('/confirm', confirmRide)

export default rideRoutes;