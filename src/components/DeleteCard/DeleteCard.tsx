import React, { useCallback, useEffect, useRef } from "react";
import styles from "./DeleteCard.module.css";
import { Heading } from "../heading/Heading";
import { Text } from "../text/Text";
import Button from "../button/Button";

interface DeleteProps {
  invoiceId: string;
  onDelete: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "secondary" | "primary" | "tertiary";
  autoFocus?: boolean;
  disabled?: boolean;
}

function DeleteCard({
  invoiceId,
  onDelete,
  onCancel,
  isLoading = false,
  title = "Confirm Deletion",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  autoFocus = true,
  disabled = false,
}: DeleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDelete = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!disabled && !isLoading) {
        onDelete();
      }
    },
    [onDelete, disabled, isLoading]
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!isLoading) {
        onCancel();
      }
    },
    [onCancel, isLoading]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        event.preventDefault();
        onCancel();
      }
    },
    [onCancel, isLoading]
  );

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      const confirmButton = containerRef.current.querySelector(
        "[data-confirm-button]"
      ) as HTMLButtonElement;
      if (confirmButton) {
        confirmButton.focus();
      }
    }
  }, [autoFocus]);

  const defaultMessage = `Are you sure you want to delete invoice #${invoiceId}? This action cannot be undone.`;
  const displayMessage = message || defaultMessage;

  const isDisabled = disabled || isLoading;

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      role="alertdialog"
      aria-labelledby="delete-title"
      aria-describedby="delete-description"
      tabIndex={-1}
    >
      <Heading id="delete-title" className={styles.title}>
        {title}
      </Heading>
      <div id="delete-description" className={styles.description}>
        <Text>{displayMessage}</Text>
      </div>

      <div
        className={styles.actions}
        role="group"
        aria-label="Confirmation actions"
      >
        <Button
          variant="secondary"
          onClick={handleCancel}
          disabled={isLoading}
          aria-label={`${cancelText} deletion`}
          type="button"
        >
          {cancelText}
        </Button>
        <Button
          variant={variant}
          onClick={handleDelete}
          disabled={isDisabled}
          aria-label={`${confirmText} deletion of invoice ${invoiceId}`}
          aria-describedby="delete-description"
          type="button"
          data-confirm-button="true"
        >
          {isLoading ? "Deleting..." : confirmText}
        </Button>
      </div>
    </div>
  );
}

export default DeleteCard;
