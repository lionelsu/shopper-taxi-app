export type Coordinates = {
  latitude: number;
  longitude: number;
}

export type AvailableDriver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: string;
}

export type EstimateRideResponse = {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: AvailableDriver[];
  routeResponse: any;
}
