export interface Ride {
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

export interface FormattedRide {
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