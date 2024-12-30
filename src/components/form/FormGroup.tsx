import React from "react";

interface FormGroupProps {
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default FormGroup;
