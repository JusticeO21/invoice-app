import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";
import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";

function ThemeToggle() {
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={styles.button}
    >
      <img
        src={theme === "dark" ? moon : sun}
        alt={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        width="24"
        height="24"
      />
    </button>
  );
}

export default ThemeToggle;
