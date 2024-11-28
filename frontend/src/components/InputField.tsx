import React from "react"

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, name, value, onChange }: InputFieldProps) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputField;
