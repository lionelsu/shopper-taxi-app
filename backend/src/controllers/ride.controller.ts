import { NextFunction, Request, Response } from "express";
import { estimateRideSchema, validateConfirmRideSchema, validateGetRidesSchema } from "../validations/ride.validation";
import { getDistanceFromGoogleMaps, getCoordinates } from "../services/googleMaps.service";
import { getAvailableDrivers } from "../data/drivers";
import { drivers } from "../data/drivers";
import { prisma } from "../prismaClient";

export const estimateRide = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { origin, destination, customer_id } = req.body;

  const { error } = estimateRideSchema.validate({ origin, destination, userId: customer_id });

  if (error) {
      return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos" });
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

export const getRides = async (req: Request, res: Response): Promise<any> => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  const { error } = validateGetRidesSchema.validate({ customer_id, driver_id: driver_id ? Number(driver_id) : undefined });
  if (error) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "Motorista invalido"
    });
  }

  if (driver_id) {
    const validDriver = drivers.find(d => d.id === Number(driver_id));
    if (!validDriver) {
      return res.status(400).json({
        error_code: "INVALID_DRIVER",
        error_description: "Motorista invalido"
      });
    }
  }

  try {
    const rides = await prisma.ride.findMany({
      where: {
        customerId: customer_id,
        ...(driver_id ? { driverId: Number(driver_id) } : {})
      },
      orderBy: { createdAt: "desc" }
    });

    if (rides.length === 0) {
      return res.status(404).json({
        error_code: "NO_RIDES_FOUND",
        error_description: "Nenhum registro encontrado"
      });
    }

    interface Ride {
      id: number;
      createdAt: Date;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      driverId: number;
      driverName: string;
      value: number;
    }

    interface FormattedRide {
      id: number;
      date: Date;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      driver: {
        id: number;
        name: string;
      };
      value: number;
    }

    const formattedRides: FormattedRide[] = rides.map((ride: Ride) => ({
      id: ride.id,
      date: ride.createdAt,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driverId,
        name: ride.driverName
      },
      value: ride.value
    }));

    return res.status(200).json({
      customer_id,
      rides: formattedRides
    });
  } catch (error) {
    console.error("Erro ao buscar viagens:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};
