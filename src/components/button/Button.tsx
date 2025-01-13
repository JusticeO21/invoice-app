import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  radius?:
    | "rounded"
    | "rounded-md"
    | "rounded-full";
}

function Button ({
  children,
  variant = "primary",
  radius = "rounded",
  className,
  ...props
}: ButtonProps)  {
  const buttonClass = classNames(
    styles.button, 
    styles[variant],
    styles[radius], 
    className 
  );

  return (
    <button {...props} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
