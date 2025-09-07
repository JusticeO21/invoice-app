import { ReactNode } from "react";
import "./text.styles.css";

interface TextProps {
  children: ReactNode;
  variant?: "caption" | "description";
  className?: string;
}

export function Text({
  children,
  variant = "description",
  className,
}: TextProps) {
  return <p className={`text ${variant} ${className}`}>{children}</p>;
}
