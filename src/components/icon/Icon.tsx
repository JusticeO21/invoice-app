import styles from "./icon.module.css";
import classNames from "classnames";

interface IconProps {
  src: string;
  alt: string;
  radius?:
    | "rounded"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-full";
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Icon ({
  src,
  alt,
  radius = "rounded",
  size = "sm",
  className,
}: IconProps) {
  const sizeClass = size === "sm" || size === "md"  || size === "lg"? styles[size] : styles.sm; 
  const radiusClass = radius === "rounded" ||  radius === "rounded-sm" || radius === "rounded-md" || radius === "rounded-lg" || radius === "rounded-full"? styles[radius] : styles.rounded;
  const iconClass = classNames(styles.icon, className);

  return (
    <span className={iconClass}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} ${radiusClass}`}
      />
    </span>
  );
};

export default Icon;
