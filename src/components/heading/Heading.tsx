import { ReactNode, ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Heading.module.css";
import classNames from "classnames";

interface HeaderProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

type HeadingProps = HeaderProps & ComponentPropsWithoutRef<"h1">;

export function Heading ({
  children,
  variant = "h1",
  className ,
  ...props
}: HeadingProps) {
  const Tag: ElementType = variant;
  const headingClass = classNames(styles.heading, styles[variant], className);

  return (
    <Tag className={headingClass} {...props}>
      {children}
    </Tag>
  );
};
