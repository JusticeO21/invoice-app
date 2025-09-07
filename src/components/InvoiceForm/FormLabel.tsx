// FormLabel.tsx
import React, { HTMLProps } from "react";
import { Text } from "../text/Text";
import styles from "./FormGroup.module.css";
import formStyles from "./FormLabel.module.css";

interface FormLabelProps extends HTMLProps<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children, error }) => {
  return (
    <label htmlFor={htmlFor} className={formStyles.formLabel}>
      {children}
      {error && <Text className={styles.error_message}>{error}</Text>}
    </label>
  );
};

export default FormLabel;
