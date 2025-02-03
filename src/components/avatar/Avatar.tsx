import Icon from "../icon/Icon.tsx";
import styles from "./Avatar.module.css";
import { ButtonHTMLAttributes } from "react";

export interface AvatarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
}

function Avatar({ src, alt, size = "small", ...props }: AvatarProps) {
  return (
    <button
      {...props}
      className={styles.avatar}
      aria-label={`Avatar for ${alt}`}
    >
      <Icon
        src={src}
        alt={alt}
        size="md"
        radius="rounded-full"
        className={styles[size]}
      />
    </button>
  );
}

export default Avatar;
