import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Badge from "../../components/Badge/Badge";
import styles from "./InvoiceDetailsPage.module.css";
import { Text } from "../../components/text/Text";
import { Heading } from "../../components/heading/Heading";
import Table from "../../components/Table/Table";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/useRedux";
import type { Invoice } from "../../types/AppDataType";
import leftArrow from "../../assets/icon-arrow-left.svg";
import Icon from "../../components/icon/Icon";
import { formatCurrency } from "../../components/InvoiceCard/utils";
import { toggleDialog } from "../../Redux/dialogReducer";
import { updateInvoiceToBeDeleted } from "../../Redux/invoiceReducer";
import { format } from "date-fns";
import EditInvoiceForm from "../EditInvoiceForm/EditInvoiceForm";
import { editInvoice as showEditInvoiceForm } from "../../Redux/invoiceReducer";
import HashSymbol from "../../components/HashSymbol/HashSymbol";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import {
  useUpdateInvoiceByIdMutation,
  useFetchInvoiceByIdQuery,
} from "../../Redux/authApi";

const Invoice: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { invoiceId } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateInvoice, { isLoading }] = useUpdateInvoiceByIdMutation();
  const {
    data: invoice,
    isLoading: loading,
    error,
    refetch,
  } = useFetchInvoiceByIdQuery(invoiceId || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (error && `status` in error) {
      navigate("/login");
    }
  }, [error]);

  function handleDeleteDialog() {
    dispatch(toggleDialog());
    dispatch(updateInvoiceToBeDeleted(invoiceId || ""));
  }

  function handleEditClick() {
    dispatch(showEditInvoiceForm(true));
  }

  function handleEditClose() {
    setIsEditModalOpen(false);
  }

  async function handleMarkAsRead() {
    if (invoice?.status === "paid") return;
    try {
      const notifyError = () => toast.error("Ouch! Something went wrong");
      if (invoice) {
        const updatedInvoice = await updateInvoice({
          ...invoice,
          status: "paid",
        });

        if (updatedInvoice.data) {
          refetch();
          toast.success(
            `Success! Your new invoice(${updatedInvoice.data?.id}) has been successfully updated.`
          );
        }
        updatedInvoice.error && notifyError();
      }
    } catch (error) {
      toast.error("Please check your connection");
    }
  }

  if (loading) return <Loader message="Loading..." />;

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
          <Badge variant={invoice?.status}>
            {isLoading ? "..." : invoice?.status}
          </Badge>
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
          <Button
            variant="primary"
            radius="rounded-md"
            disabled={invoice?.status === "paid"}
            onClick={handleMarkAsRead}
          >
            Mark as Read
          </Button>
        </div>
      </header>

      <div className={styles.invoice_content}>
        <section className={styles.invoice_details}>
          <span className={styles.invoice_id}>
            <Heading>
              <HashSymbol />
              {invoice?.id}
            </Heading>
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
          <Table invoiceItems={invoice?.items || []} />
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
          <Button
            variant="primary"
            radius="rounded-md"
            disabled={invoice?.status === "paid"}
          >
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

      <EditInvoiceForm />
    </section>
  );
};

export default Invoice;
