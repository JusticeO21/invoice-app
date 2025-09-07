import styles from "./LoadingSpinner.module.css";
import { Text } from "../text/Text";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

function LoadingSpinner({ 
  size = "medium", 
  text = "Loading...", 
  fullScreen = true,
  className 
}: LoadingSpinnerProps) {
  const containerClass = fullScreen 
    ? `${styles.fullScreen} ${className || ''}` 
    : `${styles.inline} ${className || ''}`;

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size]}`} aria-hidden="true">
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      <Text className={styles.text} aria-label={text}>
        {text}
      </Text>
    </div>
  );
}

export default LoadingSpinner;
