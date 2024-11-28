import React from "react";
import RideRow from "./RideRow";

type RideTableProps = {
  rides: Array<{
    id: number;
    date: string;
    driver: { name: string };
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
  }>;
};

const RideTable: React.FC<RideTableProps> = ({ rides }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Data</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Motorista</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Origem</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Destino</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Distância</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Duração</th>
        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Valor</th>
      </tr>
    </thead>
    <tbody>
      {rides.map((ride) => (
        <RideRow key={ride.id} ride={ride} />
      ))}
    </tbody>
  </table>
);

export default RideTable;
