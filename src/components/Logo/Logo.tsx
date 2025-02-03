import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

interface LogoProps {
  logoSrc: string;
  altText: string;
  linkUrl?: string;
}

function Logo({ logoSrc, altText, linkUrl = "/" }: LogoProps) {
  return (
    <div className={styles.logo_container}>
      <span className={styles.mask1}></span>
      <span className={styles.mask2}></span>

      <Link className={styles.logo} to={linkUrl} aria-label="Go to homepage">
        <img src={logoSrc} alt={altText} className={styles.logo_image} />
      </Link>
    </div>
  );
}

export default Logo;
