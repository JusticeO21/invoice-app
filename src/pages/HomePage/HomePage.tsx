import InvoiceGroup from "../../components/InvoiceGroup/InvoiceGroup";
import InvoiceControlBar from "../../components/InvoiceControlBar/InvoiceControlBar";
import { useAppSelector, useAppDispatch } from "../../Hooks/useRedux";
import NewInvoiceForm from "../NewInvoiceForm/NewInvoiceForm";
import { addNewInvoice as showNewInvoiceForm } from "../../Redux/invoiceReducer";

function HomePage() {
  const {
    invoiceList: data,
    FilterBy: filterByStatus,
    addNewInvoice,
  } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();

  function handleAddNewInvoice() {
    dispatch(showNewInvoiceForm(true));
    console.log(addNewInvoice);
  }

  return (
    <>
      <InvoiceControlBar onAddNewInvoice={handleAddNewInvoice} />
      <InvoiceGroup
        data={data}
        filterByStatus={filterByStatus}
        isError={false}
        isLoading={false}
      />
      <NewInvoiceForm />
    </>
  );
}

export default HomePage;
