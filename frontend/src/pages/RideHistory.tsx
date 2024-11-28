import { useState } from "react";
import axios from "axios";
import FilterControls from "../components/FilterControls";
import RideTable from "../components/RideTable";

const RideHistory = () => {
  const [userId, setUserId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [rides, setRides] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchHistory = async () => {
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/ride/${userId}`, {
        params: { driver_id: driverId || undefined },
      });
      setRides(response.data.rides);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Nenhuma viagem encontrada para este usuário.");
      } else {
        setError(err.response?.data?.error_description || "Erro ao buscar histórico de viagens.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Histórico de Viagens</h1>

      <FilterControls
        userId={userId}
        driverId={driverId}
        onUserIdChange={setUserId}
        onDriverIdChange={setDriverId}
        onApplyFilter={handleFetchHistory}
      />

      {rides.length > 0 ? (
        <RideTable rides={rides} />
      ) : (
        !error && <p>Nenhuma viagem encontrada. Por favor, aplique um filtro.</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RideHistory;
