import { NextFunction, Request, Response } from "express";
import { estimateRideSchema } from "../validations/ride.validation";
import { getDistanceFromGoogleMaps } from "../services/googleMaps.service";
import { getAvailableDrivers } from "../services/drivers";

export const estimateRide = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { origin, destination, customer_id } = req.body;

  const { error } = estimateRideSchema.validate({ origin, destination, userId: customer_id });
  if (error) {
      return res.status(400).json({ error_code: "INVALID_DATA", error_description: error.details[0].message });
  }

  try {
      const routeResponse = await getDistanceFromGoogleMaps(origin, destination);

      const { distance, duration, start_location, end_location } = routeResponse;

      const availableDrivers = getAvailableDrivers(distance);

      return res.status(200).json({
        origin: { latitude: start_location, longitude: start_location },
        destination: { latitude: end_location, longitude: end_location },
        distance,
        duration,
        options: availableDrivers,
        routeResponse
      });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao estimar a viagem." });
  }
};