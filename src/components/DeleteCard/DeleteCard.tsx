import React from "react";
import styles from "./DeleteCard.module.css";
import { Heading } from "../heading/Heading";
import { Text } from "../text/Text";
import Button from "../button/Button";

type DeleteProps = {
  invoiceId: string;
  onDelete: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

function DeleteCard({ invoiceId, onDelete, onCancel, isLoading }: DeleteProps) {
  function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();
    onDelete();
  }

  function handleCancel(event: React.MouseEvent) {
    event.stopPropagation();
    onCancel();
  }

  return (
    <div className={styles.container}>
      <Heading>Confirm Deletion</Heading>
      <Text>
        {`Are you sure you want to delete invoice #${invoiceId}? This action cannot be
        undone.`}
      </Text>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? "...Loading" : "Confirm"}
        </Button>
      </div>
    </div>
  );
}

export default DeleteCard;
