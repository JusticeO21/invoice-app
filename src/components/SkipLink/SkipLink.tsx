import React from "react";
import styles from "./SkipLink.module.css";

interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

function SkipLink({ 
  href = "#main-content", 
  children = "Skip to main content",
  className 
}: SkipLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      // Focus the target element
      (target as HTMLElement).focus();
      
      // Scroll to the target element
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${styles.skipLink} ${className || ''}`}
      aria-label="Skip to main content"
    >
      {children}
    </a>
  );
}

export default SkipLink;
