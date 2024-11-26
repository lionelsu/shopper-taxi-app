import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RideOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const GOOGLE_API_KEY = "AIzaSyD6Ipcd3K0etGOfTy-Go3FxWOHv97TLvwE";

  const { estimateCostumer_id, options, origin, destination, routeResponse, originalAddresses } = location.state;

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

  const getStaticMapUrl = () => {
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    const originParam = `${origin.latitude},${origin.longitude}`;
    const destinationParam = `${destination.latitude},${destination.longitude}`;
    const pathParam = `path=color:blue|weight:5|${originParam}|${destinationParam}`;
    const markerOrigin = `markers=color:green|label:A|${originParam}`;
    const markerDestination = `markers=color:red|label:B|${destinationParam}`;
    const apiKey = GOOGLE_API_KEY;
  
    return `${baseUrl}?size=600x300&${pathParam}&${markerOrigin}&${markerDestination}&key=${apiKey}`;
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Opções de Viagem</h1>

      {/* Exibir mapa estático */}
      <div style={{ marginBottom: "20px" }}>
        <img
          src={getStaticMapUrl()}
          alt="Mapa com rota"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>

      {/* Exibir lista de motoristas */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {options.map((option: any) => (
          <li
            key={option.id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <p><strong>Nome:</strong> {option.name}</p>
            <p><strong>Descrição:</strong> {option.description}</p>
            <p><strong>Veículo:</strong> {option.vehicle}</p>
            <p><strong>Avaliação:</strong> {option.review.rating}</p>
            <p><strong>Valor:</strong> R$ {option.value.toFixed(2)}</p>
            <button
              onClick={() => handleConfirm(option.id, option.name)}
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
        ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RideOptions;