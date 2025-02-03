import styles from "./InvoiceGroup.module.css";
import InvoiceCard from "../InvoiceCard/InvoiceCard";
import NoInvoice from "../NoInvoice/NoInvoice";
import type { Data, Invoice } from "../../types/AppDataType";
import { useAppSelector } from "../../Hooks/useRedux";

type InvoiceGroupProps = {
  data: Data | undefined;
  filterByStatus: string;
  isLoading: boolean;
  isError: boolean;
};

function InvoiceGroup({
  data,
  filterByStatus,
  isLoading,
  isError,
}: InvoiceGroupProps) {
  const totalInvices = useAppSelector(
    (state) => state.invoice.availableInvoices
  );
  if (isLoading) return <p>Loading invoices...</p>;
  if (isError)
    return (
      <NoInvoice message="Something went wrong //<strong>Please check your connection</strong>//" />
    );

  return (
    <div className={styles.invoices}>
      {totalInvices === 0 && (
        <NoInvoice message="Create an invoice by clicking the //<strong>New Invoice</strong>// button and get started" />
      )}

      {filterByStatus &&
        data
          ?.filter((invoice: Invoice) => invoice.status === filterByStatus)
          .map((invoice: Invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoiceId={invoice.id}
              name={invoice.clientName}
              dueDate={invoice.paymentDue}
              amount={invoice.total}
              status={invoice.status}
            />
          ))}

      {!filterByStatus &&
        data?.map((invoice: Invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoiceId={invoice.id}
            name={invoice.clientName}
            dueDate={invoice.paymentDue}
            amount={invoice.total}
            status={invoice.status}
          />
        ))}
    </div>
  );
}

export default InvoiceGroup;
