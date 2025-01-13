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

function InvoiceGroup({data, filterByStatus, isLoading, isError}:InvoiceGroupProps) {
  const totalInvices = useAppSelector(state => state.invoice.availableInvoices)
if (isLoading) return <p>Loading invoices...</p>;
//@ts-ignore
if (isError)
  return (
    <p>Error fetching invoices: {"Something went wrong"}</p>
    );
  
  return (
    <div className={styles.invoices}>
      {totalInvices === 0 && <NoInvoice />}

      {filterByStatus &&
        data?.filter(((invoice: Invoice) => invoice.status === filterByStatus))
        .map((invoice: Invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoiceId={invoice.id}
            name={invoice.clientName}
            dueDate={invoice.paymentDue}
            amount={invoice.total}
            status={invoice.status}
          />
        ))
        // .length === 0 && <NoInvoice />
      }

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
