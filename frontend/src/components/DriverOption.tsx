import React from "react";

type DriverOptionProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  value: number;
  onConfirm: (driverId: number, driverName: string) => void;
};

const DriverOption: React.FC<DriverOptionProps> = ({
  id,
  name,
  description,
  vehicle,
  rating,
  value,
  onConfirm,
}) => {
  return (
    <li
      style={{
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <p>
        <strong>Nome:</strong> {name}
      </p>
      <p>
        <strong>Descrição:</strong> {description}
      </p>
      <p>
        <strong>Veículo:</strong> {vehicle}
      </p>
      <p>
        <strong>Avaliação:</strong> {rating}
      </p>
      <p>
        <strong>Valor:</strong> R$ {value.toFixed(2)}
      </p>
      <button
        onClick={() => onConfirm(id, name)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Escolher
      </button>
    </li>
  );
};

export default DriverOption;
