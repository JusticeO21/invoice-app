import styles from "./LoginPage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.background}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
