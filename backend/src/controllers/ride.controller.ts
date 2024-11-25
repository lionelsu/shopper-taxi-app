import { NextFunction, Request, Response } from "express";
import { estimateRideSchema } from "../validations/ride.validation";
import { getDistanceFromGoogleMaps, getCoordinates } from "../services/googleMaps.service";
import { getAvailableDrivers } from "../services/drivers";

export const estimateRide = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { origin, destination, customer_id } = req.body;

  const { error } = estimateRideSchema.validate({ origin, destination, userId: customer_id });

  if (error) {
      console.log(error.details)
      return res.status(400).json({ error_code: "INVALID_DATA", error_description: error.details[0].message });
  }

  try {
      const originCoordinates = await getCoordinates(origin)
      const destinationCoordinates = await getCoordinates(destination)

      const routeResponse = await getDistanceFromGoogleMaps(origin, destination);

      const { distance, duration } = routeResponse;

      const distanceInKm = distance.value / 1000
      const durationInText = duration.text
      
      const availableDrivers = getAvailableDrivers(distanceInKm);

      return res.status(200).json({
        origin: { latitude: originCoordinates.lat, longitude: originCoordinates.lng },
        destination: { latitude: destinationCoordinates.lat, longitude: destinationCoordinates.lng },
        distance: distanceInKm,
        duration: durationInText,
        options: availableDrivers,
        routeResponse
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao estimar a viagem." });
  }
};
