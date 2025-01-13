import styles from "./Navbar.module.css"
import logo from "../../assets/logo.svg";
import Logo from '../Logo/Logo';
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Avatar from "../avatar/Avatar";
import avatar from "../../assets/image-avatar.jpg"

function Navbar() {
  return (
    <nav className={styles.navbar}>
          <Logo logoSrc={logo} altText='' />
          <span className={styles.user_control}>
              <ThemeToggle />
            <Avatar src={avatar} alt="profile picture"/>  
          </span>
    </nav>
  );
}

export default Navbar
