import { NextFunction, Request, Response } from "express";
import { estimateRideSchema, validateConfirmRideSchema } from "../validations/ride.validation";
import { getDistanceFromGoogleMaps, getCoordinates } from "../services/googleMaps.service";
import { getAvailableDrivers } from "../data/drivers";
import { drivers } from "../data/drivers";
import { prisma } from "../prismaClient";

export const estimateRide = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { origin, destination, customer_id } = req.body;

  const { error } = estimateRideSchema.validate({ origin, destination, userId: customer_id });

  if (error) {
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

export const confirmRide = async (req: Request, res: Response): Promise<any> => {
  const { origin, destination, customer_id, distance, duration, driver, value } = req.body;

  const { error } = validateConfirmRideSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos" });
  }

  const selectedDriver = drivers.find(d => d.id === driver.id && d.name === driver.name);
  if (!selectedDriver) {
    return res.status(404).json({ error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado." });
  }

  if (distance < selectedDriver.minDistance) {
    return res.status(406).json({ error_code: "INVALID_DISTANCE", error_description: "Quilometragem inválida para o motorista" });
  }

  try {
    await prisma.ride.create({
      data: {
        customerId: customer_id,
        origin,
        destination,
        distance,
        duration,
        driverId: driver.id,
        driverName: driver.name,
        value
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao salvar a viagem." });
  }
};
