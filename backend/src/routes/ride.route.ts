import { Router } from "express";
import { estimateRide } from "../controllers/ride.controller";

const rideRoutes = Router();

rideRoutes.post('/estimate', estimateRide);

export default rideRoutes;