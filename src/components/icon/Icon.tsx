import styles from "./Icon.module.css";

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

  return (
    <span className={`${styles.icon} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} ${radiusClass}`}
      />
    </span>
  );
};

export default Icon;
