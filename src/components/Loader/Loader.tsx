import styles from "./Loader.module.css";
import { Text } from "../text/Text";

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className={styles.loader}>
      <Text>{message}</Text>
    </div>
  );
};

export default Loader;
