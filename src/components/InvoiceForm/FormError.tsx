// FormError.tsx
import React from "react";

interface FormErrorProps {
  children: React.ReactNode;
}

const FormError: React.FC<FormErrorProps> = ({ children }) => {
  return <p>{children}</p>;
};

export default FormError;
