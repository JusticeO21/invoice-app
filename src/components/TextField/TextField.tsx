import styles from "./TextField.module.css";
import { forwardRef, HTMLProps } from "react";
import classNames from "classnames";

interface TextFieldProps extends HTMLProps<HTMLInputElement> {
  placeholder?: string;
  disabled?: boolean;
  type: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ placeholder, disabled, type, className, ...props }, ref) => {
    const textFieldClass = classNames(styles.input, className);
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...props}
        disabled={disabled}
        className={textFieldClass}
      />
    );
  }
);

export default TextField;
