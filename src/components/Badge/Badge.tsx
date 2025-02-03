import { ReactNode, HTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./Badge.module.css";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "paid" | "pending" | "draft";
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
}: BadgeProps) {
  const badgeClass = classNames(styles.badge, styles[variant], className);

  return (
    <span
      {...props}
      className={badgeClass}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role="status"
    >
      <span className={styles.oval} aria-hidden="true" role="presentation" />{" "}
      {children}
    </span>
  );
}

export default Badge;
