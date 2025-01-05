import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import LeftArrow from "../../assets/icon-arrow-left.svg";
import styles from "./EditInvoiceForm.module.css";
import { Text } from '../../components/text/Text';
import { Heading } from '../../components/heading/Heading';
import InvoiceForm from '../../components/InvoiceForm/Form';
import type { FormData } from '../../types/FormDatatype';
import type { Invoice } from '../../types/AppDataType';
import type { Item } from '../../types/AppDataType';
import { useAppDispatch, useAppSelector } from '../../Hooks/useRedux';
import { editInvoice as hideInvoiceForm, updateInvoice } from '../../Redux/invoiceReducer';
import { useParams } from 'react-router-dom';
import { findItemById } from '../InvoiceDetailsPage/utils';
import HashSymbol from '../../components/HashSymbol/HashSymbol';
import { calculateDueDate, generateRandomId } from '../NewInvoiceForm/utils';
import { format } from 'date-fns';

function calculateTotal(arr:Item[]) {
  return arr.reduce((total, currentItem) => total + currentItem.total, 0);
}

function EditInvoice() {
  const dispatch = useAppDispatch()
  const { editInvoice} = useAppSelector(state => state.invoice);
  const { invoiceId } = useParams();
  const data = useAppSelector((state) => state.invoice.invoiceList);
  const fetchedInvoice = findItemById(data, invoiceId as string);

  const defaultInvoice: FormData = {
    senderStreetAdress: fetchedInvoice?.senderAddress.street || "",
    senderCity: fetchedInvoice?.senderAddress.city || "",
    senderPostCode: fetchedInvoice?.senderAddress.postCode || "",
    senderCountry: fetchedInvoice?.senderAddress.country || "",
    clientName: fetchedInvoice?.clientName || "",
    clientEmail: fetchedInvoice?.clientEmail || "",
    clientStreetAddress: fetchedInvoice?.clientAddress.street || "",
    clientCity: fetchedInvoice?.clientAddress.city || "",
    clientPostcode: fetchedInvoice?.clientAddress.postCode || "",
    clientCountry: fetchedInvoice?.clientAddress.country || "",
    createdAt: format(fetchedInvoice?.createdAt || new Date(), "yyyy-MM-dd") || "",
    paymentTerms: String(fetchedInvoice?.paymentTerms) || "1",
    description: fetchedInvoice?.description || "",
    items: fetchedInvoice?.items || [],
  };

  const handleSubmiteAndSend = (data: FormData) => {
    const newInvoice: Invoice = {
      id: invoiceId || generateRandomId(),
      createdAt: data.createdAt,
      paymentDue: calculateDueDate(data.createdAt, Number(data.paymentTerms)),
      description: data.description,
      paymentTerms: Number(data.paymentTerms),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: fetchedInvoice?.status || "pending",
      senderAddress: {
      street: data.senderStreetAdress,
      city: data.senderCity, 
      postCode:data.senderPostCode,
      country: data.senderCountry
    },
    clientAddress:  {
      street: data.clientStreetAddress,
      city: data.clientCity, 
      postCode:data.clientPostcode,
      country: data.clientCountry
    },
      items: data.items,
    total:calculateTotal(data.items)
    }

    dispatch(updateInvoice(newInvoice))
  }

  const handleHideInvoice = () => {
    dispatch(hideInvoiceForm(false))
  }

  return (
    <>
      <span className={`${styles.container} ${editInvoice && styles.show_container}`} onClick={handleHideInvoice}> </span>
       <div className={`${styles.invoice_form_wrapper} ${editInvoice && styles.show_form}`}>
        <header className={styles.header}>
          <Button className={styles.goBackButton} onClick={handleHideInvoice}>
            <Icon src={LeftArrow} alt="Go back" />
            <Text>Go back</Text>
          </Button>

          <Heading>Edit <HashSymbol/>{invoiceId}</Heading>
        </header>

        <InvoiceForm
          onSaveAndSend={handleSubmiteAndSend}
          isANewInvoice={false}
          defaultFormData={defaultInvoice}
          onCancel={handleHideInvoice}
        />
      </div>
      
    </>
  );
}

export default EditInvoice;
