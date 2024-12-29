import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import Badge from "../../components/Badge/Badge";
import styles from "./Invoice.module.css";
import { Text } from "../../components/text/Text";
import { Heading } from "../../components/heading/Heading";
import Table from "../../components/Table/Table";
import { useParams, Link } from "react-router-dom";
import { findItemById } from "./utils";
import { useAppSelector, useAppDispatch } from "../../Hooks/useRedux";
import type { Invoice } from "../../types/AppDataType";
import leftArrow from "../../assets/icon-arrow-left.svg";
import Icon from "../../components/icon/Icon";
import { formatCurrency } from "../../components/InvoiceCard/utils";
import { toggleDialog } from "../../Redux/dialogReducer";
import { updateInvoiceToBeDeleted, updateInvoice } from "../../Redux/invoiceReducer";
import { format } from "date-fns";
import Dialog from "../../components/Dialog/Dialog";

const Invoice: React.FC<{}> = () => {
  const data = useAppSelector((state) => state.invoice.invoiceList);
  const dispatch = useAppDispatch();
  const { invoiceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<Invoice | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const fetchedInvoice = findItemById(data, invoiceId as string);
      setInvoice(fetchedInvoice);
    } catch (err) {
      setError("Failed to load invoice data.");
    } finally {
      setLoading(false);
    }
  }, [data, invoiceId]);

  function handleDeleteDialog() {
    dispatch(toggleDialog());
    dispatch(updateInvoiceToBeDeleted(invoiceId || ""));
  }

  function handleEditClick() {
    setIsEditModalOpen(true);
  }

  function handleEditClose() {
    setIsEditModalOpen(false);
  }

  function handleMarkAsRead() {
    if (invoice?.status === "paid") return;
    invoice && dispatch(updateInvoice({...invoice, status:"paid"}))
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className={styles.invoice}>
      <Link to={"/invoice"}>
        <Button className={styles.goBackButton}>
          <Icon src={leftArrow} alt="Go back" />
          <Text>Go back</Text>
        </Button>
      </Link>

      <header className={`${styles.header}`}>
        <div className={styles.status}>
          <Text>Status</Text>
          <Badge variant={invoice?.status}>{invoice?.status}</Badge>
        </div>

        <div className={`${styles.actions} ${styles.desktop_header}`}>
          <Button
            variant="secondary"
            radius="rounded-md"
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            radius="rounded-md"
            onClick={handleDeleteDialog}
          >
            Delete
          </Button>
          <Button variant="primary" radius="rounded-md" disabled={invoice?.status === "paid"} onClick={handleMarkAsRead}>
            Mark as Read
          </Button>
        </div>
      </header>

      <div className={styles.invoice_content}>
        <section className={styles.invoice_details}>
          <span className={styles.invoice_id}>
            <Heading>#{invoice?.id}</Heading>
            <Text>Graphic Design {invoice?.description}</Text>
          </span>

          <span className={styles.address}>
            <Text>{invoice?.clientAddress.street}</Text>
            <Text>{invoice?.clientAddress.city}</Text>
            <Text>{invoice?.clientAddress.postCode}</Text>
            <Text>{invoice?.clientAddress.country}</Text>
          </span>

          <span className={styles.issueDate}>
            <Text>Invoice Date</Text>
            <Text>
              <strong>
                {invoice?.createdAt &&
                  format(new Date(invoice?.createdAt), "MMMM dd, yyyy")}
              </strong>
            </Text>
          </span>

          <span className={styles.dueDate}>
            <Text>Payment Due</Text>
            <Text>
              <strong>
                {invoice?.paymentDue &&
                  format(new Date(invoice?.paymentDue), "MMMM dd, yyyy")}
              </strong>
            </Text>
          </span>

          <span className={styles.invoice_reciever}>
            <Text>Bill To</Text>
            <Text>
              <strong>{invoice?.clientName}</strong>
            </Text>
            <Text>{invoice?.clientAddress.street}</Text>
            <Text>{invoice?.clientAddress.city}</Text>
            <Text>{invoice?.clientAddress.postCode}</Text>
            <Text>{invoice?.clientAddress.country}</Text>
          </span>

          <span className={styles.reciever_mail}>
            <Text>Sent To</Text>
            <Text>
              <strong>{invoice?.clientEmail}</strong>
            </Text>
          </span>
        </section>

        <section className={styles.invoice_items}>
          <Table />
        </section>

        <footer className={styles.total}>
          <Text>Grand total</Text>
          <Text>{invoice && formatCurrency(invoice?.total)}</Text>
        </footer>
      </div>

      <footer>
        <div
          className={`${styles.actions} ${styles.header} ${styles.mobile_header}`}
        >
          <Button
            variant="secondary"
            radius="rounded-md"
            onClick={handleEditClick}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            radius="rounded-md"
            onClick={handleDeleteDialog}
          >
            Delete
          </Button>
          <Button variant="primary" radius="rounded-md" disabled={invoice?.status === "paid"}>
            Mark as Read
          </Button>
        </div>
      </footer>

      {isEditModalOpen && (
        <div className={styles.editModal}>
          <h2>Edit Invoice</h2>
          <form>
            <input
              type="text"
              value={invoice?.description}
              onChange={() => {}}
            />
            <Button onClick={handleEditClose}>Close</Button>
          </form>
        </div>
      )}

      {
        isEditModalOpen && (<Dialog isOpen={isEditModalOpen} onClose={handleEditClose}>.</Dialog>)
      }
    </section>
  );
};

export default Invoice;
