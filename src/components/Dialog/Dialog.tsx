import React, { ReactNode, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  backdropClassName?: string;
  preventScroll?: boolean;
  autoFocus?: boolean;
}

function Dialog({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
  backdropClassName,
  preventScroll = true,
  autoFocus = true,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleCancel = useCallback(
    (event: Event) => {
      if (closeOnEscape) {
        event.preventDefault();
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  const handleDialogClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  const trapFocus = useCallback((event: KeyboardEvent) => {
    if (!dialogRef.current) return;

    const focusableElements = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      dialogRef.current.showModal();

      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }

      document.addEventListener("keydown", trapFocus);
      dialogRef.current.addEventListener("cancel", handleCancel);

      if (autoFocus) {
        const firstFocusable = dialogRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;

        if (firstFocusable) {
          firstFocusable.focus();
        }
      }

      return () => {
        if (dialogRef.current) {
          dialogRef.current.removeEventListener("cancel", handleCancel);
          dialogRef.current.close();
        }

        if (preventScroll) {
          document.body.style.overflow = "";
        }

        document.removeEventListener("keydown", trapFocus);

        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, preventScroll, autoFocus, trapFocus, handleCancel]);

  if (!isOpen) return null;

  const dialogContent = (
    <dialog
      className={`${styles.dialogBackdrop} ${backdropClassName || ""}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy || "dialog-title"}
      aria-describedby={ariaDescribedBy || "dialog-description"}
      ref={dialogRef}
      onClick={handleDialogClick}
    >
      <div className={`${styles.dialogContent} ${className || ""}`}>
        {children}
      </div>
    </dialog>
  );

  return createPortal(dialogContent, document.body);
}

export default Dialog;
