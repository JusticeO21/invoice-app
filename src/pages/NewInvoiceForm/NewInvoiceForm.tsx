import Button from "../../components/button/Button";
import Icon from "../../components/icon/Icon";
import LeftArrow from "../../assets/icon-arrow-left.svg";
import styles from "./NewInvoiceForm.module.css";
import { Text } from "../../components/text/Text";
import { Heading } from "../../components/heading/Heading";
import InvoiceForm from "../../components/InvoiceForm/Form";
import type { FormData } from "../../types/FormDatatype";
import type { FormInvoice } from "../../types/AppDataType";
import type { Item } from "../../types/AppDataType";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import { addNewInvoice as hideInvoiceForm } from "../../Redux/invoiceReducer";
import { calculateDueDate } from "./utils";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useAddInvoiceMutation } from "../../Redux/authApi";
import { logout } from "../../Redux/authSlice";

function calculateTotal(arr: Item[]) {
  return arr.reduce((total, currentItem) => total + currentItem.total, 0);
}

function NewInvoiceForm() {
  const dispatch = useAppDispatch();
  const { addNewInvoice } = useAppSelector((state) => state.invoice);
  const [addInvoice, { isLoading }] = useAddInvoiceMutation();

  const loadNewInvoice = async (invoice: FormInvoice) => {
    try {
      const notifyError = () => toast.error("Ouch! Something went wrong");
      const addedInvoice = await addInvoice(invoice);
      addedInvoice.data &&
        toast.success(
          `Success! Your new invoice(${addedInvoice.data?.id}) has been successfully added.`
        );
      addedInvoice.error && notifyError();
      if (addedInvoice.error && `status` in addedInvoice.error) {
        if (addedInvoice.error.status === 403) {
          dispatch(logout());
        }
      }
    } catch (error) {
      toast.error("Please check your connection");
    }
  };

  const handleSubmiteAndSend = async (data: FormData) => {
    const newInvoice: FormInvoice = {
      createdAt: format(data.createdAt, "yyyy-MM-dd"),
      paymentDue: calculateDueDate(
        format(data.createdAt, "yyyy-MM-dd"),
        Number(data.paymentTerms)
      ),
      description: data.description,
      paymentTerms: Number(data.paymentTerms),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: "pending",
      senderAddress: {
        street: data.senderStreetAdress,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
      clientAddress: {
        street: data.clientStreetAddress,
        city: data.clientCity,
        postCode: data.clientPostcode,
        country: data.clientCountry,
      },
      items: data.items,
      total: calculateTotal(data.items),
    };

    await loadNewInvoice(newInvoice);
  };

  const handleSaveAsDraft = async (data: FormData) => {
    const newInvoice: FormInvoice = {
      createdAt: format(data.createdAt, "yyyy-MM-dd"),
      paymentDue: calculateDueDate(
        format(data.createdAt, "yyyy-MM-dd"),
        Number(data.paymentTerms)
      ),
      description: data.description,
      paymentTerms: Number(data.paymentTerms),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: "draft",
      senderAddress: {
        street: data.senderStreetAdress,
        city: data.senderCity,
        postCode: data.senderPostCode,
        country: data.senderCountry,
      },
      clientAddress: {
        street: data.clientStreetAddress,
        city: data.clientCity,
        postCode: data.clientPostcode,
        country: data.clientCountry,
      },
      items: data.items,
      total: calculateTotal(data.items),
    };

    await loadNewInvoice(newInvoice);
  };

  const handleHideInvoice = () => {
    dispatch(hideInvoiceForm(false));
  };

  return (
    <>
      <span
        className={`${styles.container} ${
          addNewInvoice && styles.show_container
        }`}
        onClick={handleHideInvoice}
      >
        {" "}
      </span>

      <div
        className={`${styles.invoice_form_wrapper} ${
          addNewInvoice && styles.show_form
        }`}
      >
        <header className={styles.header}>
          <Button className={styles.goBackButton} onClick={handleHideInvoice}>
            <Icon src={LeftArrow} alt="Go back" />
            <Text>Go back</Text>
          </Button>

          <Heading>New Invoice</Heading>
        </header>

        <InvoiceForm
          onSaveAndSend={handleSubmiteAndSend}
          onSaveAsDraft={handleSaveAsDraft}
          onCancel={handleHideInvoice}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default NewInvoiceForm;
