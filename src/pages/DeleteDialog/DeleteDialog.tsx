import { useNavigate } from "react-router-dom";
import DeleteCard from "../../components/DeleteCard/DeleteCard";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import { updateInvoiceToBeDeleted } from "../../Redux/invoiceReducer";
import { toggleDialog } from "../../Redux/dialogReducer";
import Dialog from "../../components/Dialog/Dialog";
import { toast } from "react-toastify";
import { useDeleteInvoiceMutation } from "../../Redux/authApi";

function DeleteInvoice() {
  const { openDialog: isDialogOpen } = useAppSelector((state) => state.dialog);
  const invoiceId = useAppSelector(
    (state) => state.invoice.deleteInvoiceWithId
  );
  const [deleteInvoice, { isLoading }] = useDeleteInvoiceMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleConfirmDelete() {
    try {
      const notifyError = () => toast.error("Ouch! Something went wrong");
      if (invoiceId) {
        const deletedInvoice = await deleteInvoice(invoiceId);
        if (!deletedInvoice.error) {
          dispatch(updateInvoiceToBeDeleted(""));
          dispatch(toggleDialog());
          navigate("/");
          toast.success(
            `Success! Invoice ${invoiceId} has been successfully deleted.`
          );
        }

        deletedInvoice.error && notifyError();
      }
    } catch (error) {
      toast.error("Please check your connection");
    }
  }

  function handleCanceDelete() {
    dispatch(toggleDialog());
  }

  function handleDialogClose() {
    dispatch(toggleDialog());
  }

  return (
    <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
      <DeleteCard
        invoiceId={invoiceId || ""}
        onDelete={handleConfirmDelete}
        onCancel={handleCanceDelete}
        isLoading={isLoading}
      />
    </Dialog>
  );
}

export default DeleteInvoice;
