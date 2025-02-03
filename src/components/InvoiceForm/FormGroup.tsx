// FormGroup.tsx
import React, { HTMLProps } from "react";
import styles from "./FormGroup.module.css";
import classNames from "classnames";

interface FormGroupProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  error?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  error,
  className,
  ...props
}) => {
  const GroupCalss = classNames(error && styles.formError, className);
  return (
    <div {...props} className={GroupCalss}>
      {children}
    </div>
  );
};

export default FormGroup;
