import React from "react";

type FilterControlsProps = {
  userId: string;
  driverId: string;
  onUserIdChange: (value: string) => void;
  onDriverIdChange: (value: string) => void;
  onApplyFilter: () => void;
};

const FilterControls: React.FC<FilterControlsProps> = ({
  userId,
  driverId,
  onUserIdChange,
  onDriverIdChange,
  onApplyFilter,
}) => (
  <div style={{ marginBottom: "20px" }}>
    <label>ID do Usuário:</label>
    <input
      type="text"
      value={userId}
      onChange={(e) => onUserIdChange(e.target.value)}
      style={{ marginLeft: "10px", marginRight: "20px" }}
    />

    <label>Motorista:</label>
    <select
      value={driverId}
      onChange={(e) => onDriverIdChange(e.target.value)}
      style={{ marginLeft: "10px", marginRight: "20px" }}
    >
      <option value="">Todos</option>
      <option value="1">Homer Simpson</option>
      <option value="2">Dominic Toretto</option>
      <option value="3">James Bond</option>
    </select>

    <button
      onClick={onApplyFilter}
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
);

export default FilterControls;
