// FormLabel.tsx
import React from "react";

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default FormLabel;
