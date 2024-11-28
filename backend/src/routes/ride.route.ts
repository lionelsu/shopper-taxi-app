import { Router } from "express";
import { estimateRide, confirmRide, getRides } from "../controllers/ride.controller";

const rideRoutes = Router();

rideRoutes.post('/estimate', estimateRide);
rideRoutes.patch('/confirm', confirmRide);
rideRoutes.get("/:customer_id", getRides);

export default rideRoutes;
