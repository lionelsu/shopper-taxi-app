import { useState } from "react";
import axios from "axios";

const RideHistory = () => {
  const [userId, setUserId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [rides, setRides] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchHistory = async () => {
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/ride/${userId}`,
        { params: { driver_id: driverId || undefined } }
      );
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

      {/* Formulário para filtro */}
      <div style={{ marginBottom: "20px" }}>
        <label>ID do Usuário:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        />

        <label>Motorista:</label>
        <select
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
          style={{ marginLeft: "10px", marginRight: "20px" }}
        >
          <option value="">Todos</option>
          <option value="1">Homer Simpson</option>
          <option value="2">Dominic Toretto</option>
          <option value="3">James Bond</option>
        </select>

        <button
          onClick={handleFetchHistory}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Aplicar Filtro
        </button>
      </div>

      {/* Exibição do histórico */}
      {rides.length > 0 ? (
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
              <tr key={ride.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{new Date(ride.date).toLocaleString()}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.driver.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.origin}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.destination}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.distance.toFixed(2)} km</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{ride.duration}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>R$ {ride.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Nenhuma viagem encontrada. Por favor, aplique um filtro.</p>
      )}

      {/* Exibição de erro */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RideHistory;
