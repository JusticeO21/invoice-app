import {useNavigate } from 'react-router-dom';
import DeleteCard from '../../components/DeleteCard/DeleteCard'
import { useAppDispatch, useAppSelector } from '../../Hooks/useRedux';
import { deleteInvoice, updateInvoiceToBeDeleted } from '../../Redux/invoiceReducer';
import { toggleDialog } from '../../Redux/dialogReducer';
import Dialog from '../../components/Dialog/Dialog';

function DeleteInvoice() {
    const { openDialog: isDialogOpen } = useAppSelector((state) => state.dialog);
    const invoiceId  = useAppSelector(state => state.invoice.deleteInvoiceWithId)
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    function handleConfirmDelete() {
        dispatch(deleteInvoice(invoiceId || ""));
        dispatch(updateInvoiceToBeDeleted(""));
        dispatch(toggleDialog());
        navigate("/");
    }

    function handleCanceDelete() {
        dispatch(toggleDialog());
    }

    function handleDialogClose() {
        dispatch(toggleDialog());
    }

    return (
      
        <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
            <DeleteCard invoiceId={invoiceId || ""} onDelete={handleConfirmDelete} onCancel={handleCanceDelete}/>
        </Dialog>
  )
}

export default DeleteInvoice
