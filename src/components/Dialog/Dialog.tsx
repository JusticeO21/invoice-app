import React, { ReactNode } from "react";
import styles from "./Dialog.module.css";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const handleBackdropClick = () => {
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={styles.dialogBackdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      tabIndex={-1}
    >
      <div className={styles.dialogContent} onClick={handleClose}>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
