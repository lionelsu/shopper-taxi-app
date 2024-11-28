import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import StaticMap from "../components/StaticMap";
import DriverOption from "../components/DriverOption";

const RideOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;

  const { estimateCostumer_id, options, origin, destination, routeResponse, originalAddresses } =
    location.state;

  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async (driverId: number, driverName: string) => {
    setError(null);

    try {
      await axios.patch("http://localhost:8080/ride/confirm", {
        customer_id: estimateCostumer_id,
        origin: originalAddresses.origin,
        destination: originalAddresses.destination,
        distance: routeResponse.distance.value / 1000,
        duration: routeResponse.duration.text,
        driver: { id: driverId, name: driverName },
        value: options.find((opt: { id: number }) => opt.id === driverId)?.value,
      });

      navigate("/history");
    } catch (err: any) {
      setError(err.response?.data?.error_description || "Erro ao confirmar a viagem");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Opções de Viagem</h1>

      <StaticMap origin={origin} destination={destination} apiKey={GOOGLE_API_KEY} />

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {options.map((option: any) => (
          <DriverOption
            key={option.id}
            id={option.id}
            name={option.name}
            description={option.description}
            vehicle={option.vehicle}
            rating={option.review.rating}
            value={option.value}
            onConfirm={handleConfirm}
          />
        ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RideOptions;
