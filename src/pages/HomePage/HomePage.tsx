import InvoiceGroup from "../../components/InvoiceGroup/InvoiceGroup";
import InvoiceControlBar from "../../components/InvoiceControlBar/InvoiceControlBar";
import { useAppSelector } from "../../Hooks/useRedux";
import { useState } from "react";
import Dialog from "../../components/Dialog/Dialog";

function HomePage() {
    const { invoiceList: data, FilterBy: filterByStatus } = useAppSelector(state => state.invoice);
    const [addNewInvoiceModalOpen, setAddNewInvoiceModalOpen] = useState(false);
      
       function handleNewInvoice() {
         setAddNewInvoiceModalOpen(true);
       }
    
       function handleNewInvoiceClose() {
         setAddNewInvoiceModalOpen(false);
      }
    return (
        <>
            <InvoiceControlBar onAddNewInvoice={handleNewInvoice}/>
            <InvoiceGroup data={data} filterByStatus={filterByStatus} isError={false} isLoading={false} />
            {
                addNewInvoiceModalOpen && (<Dialog isOpen={addNewInvoiceModalOpen} onClose={handleNewInvoiceClose}>
                        .
                </Dialog>)
            }
        </>
    )
}


export default HomePage
