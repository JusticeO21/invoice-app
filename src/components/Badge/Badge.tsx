import { ReactNode, HTMLAttributes, memo } from "react";
import classNames from "classnames";
import styles from "./Badge.module.css";

export type BadgeVariant = "paid" | "pending" | "draft";

export interface BadgeProps extends HTMLAttributes<HTMLOutputElement> {
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
}: Readonly<BadgeProps>) {
  const badgeClass = classNames(styles.badge, styles[variant], className);

  return (
    <output
      {...props}
      className={badgeClass}
      aria-label={ariaLabel || `Status: ${String(children)}`}
      aria-live={ariaLive}
    >
      <span className={styles.oval} aria-hidden="true" />
      {children}
    </output>
  );
}

export default memo(Badge);
