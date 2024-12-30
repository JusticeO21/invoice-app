import React, { ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  required,
  placeholder,
  disabled,
  error,
}) => {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormInput;
