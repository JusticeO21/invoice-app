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
  const sizeClass = styles[size] || styles.sm; 
  const radiusClass = styles[radius] || styles.rounded;
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
