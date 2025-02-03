import React from "react";
import styles from "./InvoiceCard.module.css";
import { Heading } from "../heading/Heading";
import { Text } from "../text/Text";
import Badge from "../Badge/Badge";
import { Link } from "react-router-dom";
import Icon from "../icon/Icon";
import rightArrow from "../../assets/icon-arrow-right.svg";
import { formatCurrency } from "./utils";

interface InvoiceCardProps {
  invoiceId: string;
  dueDate: string;
  name: string;
  amount: number;
  status: "paid" | "pending" | "draft";
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  invoiceId,
  dueDate,
  name,
  amount,
  status,
}) => {
  return (
    <Link to={`/invoice/${invoiceId}`}>
      <article className={styles.card}>
        <header className={styles.header}>
          <Heading className={styles.title} variant="h3">
            <span>#</span>
            {invoiceId}
          </Heading>
        </header>

        <time className={styles.dueDate} dateTime={dueDate}>
          <Text>Due {new Date(dueDate).toDateString()}</Text>
        </time>

        <Text className={styles.name}>{name}</Text>
        <Text className={styles.amount}>{formatCurrency(amount)}</Text>
        <Badge className={styles.badge} variant={status}>
          {status}
        </Badge>

        <footer className={styles.footer}>
          <Icon src={rightArrow} alt="arrow-right" />
        </footer>
      </article>
    </Link>
  );
};

export default InvoiceCard;
