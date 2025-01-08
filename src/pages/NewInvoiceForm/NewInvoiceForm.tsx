import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import LeftArrow from "../../assets/icon-arrow-left.svg";
import styles from "./NewInvoiceForm.module.css";
import { Text } from '../../components/text/Text';
import { Heading } from '../../components/heading/Heading';
import InvoiceForm from '../../components/InvoiceForm/Form';
import type { FormData } from '../../types/FormDatatype';
import type { Invoice } from '../../types/AppDataType';
import type { Item } from '../../types/AppDataType';
import { useAppDispatch, useAppSelector } from '../../Hooks/useRedux';
import { addInvoice, addNewInvoice as hideInvoiceForm } from '../../Redux/invoiceReducer';
import { generateRandomId, calculateDueDate } from './utils';
import { format } from "date-fns";
import { toast } from "react-toastify";

function calculateTotal(arr:Item[]) {
  return arr.reduce((total, currentItem) => total + currentItem.total, 0);
}

function NewInvoiceForm() {
  const dispatch = useAppDispatch()
  const { addNewInvoice } = useAppSelector(state => state.invoice)
  const notify = () => toast.success("Success! Your new invoice has been successfully added.");
  const handleSubmiteAndSend = (data: FormData) => { 
    const newInvoice: Invoice = {
      id: generateRandomId(),
      createdAt: format(data.createdAt, "yyyy-MM-dd"),
      paymentDue: calculateDueDate(format(data.createdAt, 'yyyy-MM-dd'), Number(data.paymentTerms)),
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

    dispatch(addInvoice(newInvoice));
    notify();
  }

  const handleSaveAsDraft = (data:FormData) => {
    const newInvoice: Invoice = {
      id: generateRandomId(),
      createdAt: format(data.createdAt, "yyyy-MM-dd"),
     paymentDue: calculateDueDate(format(data.createdAt, 'yyyy-MM-dd'), Number(data.paymentTerms)),
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

    dispatch(addInvoice(newInvoice));
    notify();
  }

  const handleHideInvoice = () => {
    dispatch(hideInvoiceForm(false))
  }

  return (
    <>
      <span className={`${styles.container} ${addNewInvoice && styles.show_container}`} onClick={handleHideInvoice}> </span>
     
       <div className={`${styles.invoice_form_wrapper} ${addNewInvoice && styles.show_form}`}>
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
        />
      </div>
      
    </>
  );
}

export default NewInvoiceForm;
