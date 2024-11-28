import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import InputField from "../components/InputField";

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

      navigate("/options", {
        state: {
          estimateCostumer_id: formData.customer_id,
          options: response.data.options,
          origin: response.data.origin,
          destination: response.data.destination,
          routeResponse: response.data.routeResponse,
          originalAddresses: {
            origin: formData.origin,
            destination: formData.destination,
          },
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.error_description || "Erro ao estimar a viagem");
    }
  };

  return (
    <div className="form-container">
      <h1>Solicitação de Viagem</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="ID do Usuário:"
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
        />
        <InputField
          label="Endereço de Origem:"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
        <InputField
          label="Endereço de Destino:"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <button type="submit">Estimar Viagem</button>
      </form>
      <ErrorMessage message={error} />
    </div>
  );
};

export default RequestRide;