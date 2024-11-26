import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RequestRide = () => {
  const [formData, setFormData] = useState({
    customer_id: "",
    origin: "",
    destination: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/ride/estimate", formData);
  
      // Navegar para a tela de opções com os dados retornados
      navigate("/options", {
        state: {
          options: response.data.options,
          origin: response.data.origin, // Objeto com latitude/longitude
          destination: response.data.destination, // Objeto com latitude/longitude
          routeResponse: response.data.routeResponse,
          originalAddresses: {
            origin: formData.origin, // Endereço original
            destination: formData.destination, // Endereço original
          },
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.error_description || "Erro ao estimar a viagem");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Solicitação de Viagem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Usuário:</label>
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Endereço de Origem:</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Endereço de Destino:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Estimar Viagem</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RequestRide;