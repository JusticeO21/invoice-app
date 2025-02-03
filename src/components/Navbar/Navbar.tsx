import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";
import Logo from "../Logo/Logo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Avatar from "../avatar/Avatar";
import avatar from "../../assets/image-avatar.jpg";
import Button from "../button/Button";
import { logout } from "../../Redux/authSlice";
import { useAppDispatch } from "../../Hooks/useRedux";
import { useState } from "react";

function Navbar() {
  const dispatch = useAppDispatch();
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const handleLogout = () => {
    setShowLogout((prev) => !prev);
    dispatch(logout());
  };

  const handleLogoutCard = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className={styles.navbar}>
      <Logo logoSrc={logo} altText="" />
      <span className={styles.user_control}>
        <ThemeToggle />
        <div className={styles.logout_container}>
          {showLogout && (
            <div className={styles.logout}>
              <div className={styles.user}>
                <Avatar src={avatar} alt="profile picture" />
                <Button onClick={handleLogoutCard}>Cancel</Button>
              </div>

              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
          <Avatar
            src={avatar}
            alt="profile picture"
            onClick={handleLogoutCard}
          />
        </div>
      </span>
    </nav>
  );
}

export default Navbar;
