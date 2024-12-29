import React, { ReactNode, HTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./Badge.module.css";

type BadgeVariant = "paid" | "pending" | "draft";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  ariaLabel?: string;
  ariaLive?: "polite" | "assertive";
}

function Badge({
  children,
  variant = "paid",
  ariaLabel,
  ariaLive = "polite",
  className,
  ...props
}:BadgeProps){
  const badgeClass = classNames(
    styles.badge,
    styles[variant],
    className

  );

  return (
    <span
      {...props}
      className={badgeClass}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role="status"
    >
      <span className={styles.oval} aria-hidden="true" />{" "}
      {children}
    </span>
  );
};

export default Badge;
