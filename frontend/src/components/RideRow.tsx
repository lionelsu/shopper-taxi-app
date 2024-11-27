import React from "react";

type RideRowProps = {
  ride: {
    id: number;
    date: string;
    driver: { name: string };
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
  };
};

const RideRow: React.FC<RideRowProps> = ({ ride }) => (
  <tr>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
      {new Date(ride.date).toLocaleString()}
    </td>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.driver.name}</td>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.origin}</td>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.destination}</td>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.distance.toFixed(2)} km</td>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.duration}</td>
    <td style={{ border: "1px solid #ddd", padding: "8px" }}>R$ {ride.value.toFixed(2)}</td>
  </tr>
);

export default RideRow;
