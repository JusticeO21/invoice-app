import InvoiceGroup from "../../components/InvoiceGroup/InvoiceGroup";
import InvoiceControlBar from "../../components/InvoiceControlBar/InvoiceControlBar";
import { useAppSelector, useAppDispatch } from "../../Hooks/useRedux";
import NewInvoiceForm from "../NewInvoiceForm/NewInvoiceForm";
import { addNewInvoice as showNewInvoiceForm } from "../../Redux/invoiceReducer";
import { useFetchAllInvoicesQuery } from "../../Redux/authApi";
import { useEffect } from "react";
import { logout } from "../../Redux/authSlice";

function HomePage() {
  const { data, isLoading, isError, error } = useFetchAllInvoicesQuery();
  const { FilterBy: filterByStatus } = useAppSelector((state) => state.invoice);
  const dispatch = useAppDispatch();

  function handleAddNewInvoice() {
    dispatch(showNewInvoiceForm(true));
  }

  useEffect(() => {
    if (error && `status` in error) {
      dispatch(logout());
    }
  }, [error]);

  return (
    <>
      <InvoiceControlBar onAddNewInvoice={handleAddNewInvoice} />
      <InvoiceGroup
        data={data}
        filterByStatus={filterByStatus}
        isError={isError}
        isLoading={isLoading}
      />
      <NewInvoiceForm />
    </>
  );
}

export default HomePage;
