import { Heading } from "../heading/Heading";
import noInvoiceImage from "../../assets/illustration-empty.svg";
import styles from "./NoInvoice.module.css";
import { Text } from "../text/Text";

interface NoInvoiceProps {
  message: string;
}

function NoInvoice({ message }: NoInvoiceProps) {
  return (
    <section aria-live="polite" className={styles.no_invoice_container}>
      <div
        role="img"
        aria-label="No invoices available"
        className={styles.no_invoice}
      >
        <img src={noInvoiceImage} alt="Illustration indicating no invoices" />
      </div>
      <header>
        <Heading>There is nothing here</Heading>
      </header>
      <Text className={styles.no_invoice_message}>{message}</Text>
    </section>
  );
}

export default NoInvoice;
