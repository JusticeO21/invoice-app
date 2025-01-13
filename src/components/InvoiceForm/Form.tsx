import React, { useState } from "react";
import { useForm, SubmitHandler, FieldError, useFieldArray, Controller } from "react-hook-form";
import FormInput from "../TextField/TextField";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import FormSelect from "../DropDown/DropDown";
import { Text } from "../text/Text";
import { Heading } from "../heading/Heading";
import styles from "./Form.module.css";
import Button from "../button/Button";
import ItemField from "./ItemField";
import DatePicker from "../DatePicker/DatePicker";
import type { FormData } from "../../types/FormDatatype";
import { format } from "date-fns"

type InvoiceFormProps = {
  onSaveAndSend?: (data: FormData) => void;
  onSaveAsDraft?: (data: FormData) => void;
  onCancel: () => void;
  defaultFormData?: FormData;
  isANewInvoice?: boolean;
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({onSaveAndSend, onSaveAsDraft, defaultFormData,onCancel, isANewInvoice = true}) => {
  const { handleSubmit, register, formState: { errors }, reset, control, watch, setValue } = useForm<FormData>({
    defaultValues: defaultFormData || {
      paymentTerms: "1"
      , createdAt: format(new Date(), "dd MMM yyyy")
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const [itemListIsEmpty, setItemListIsEmpty] = useState<boolean>(false);
  const [saveAndSendInvoice, setSaveAndSendInvoice] = useState<boolean>(true);

  const onSubmit: SubmitHandler<FormData> = (data) => {
     
    if (data.items.length === 0) return setItemListIsEmpty(true);
    if (saveAndSendInvoice) {
      onSaveAndSend && onSaveAndSend(data); 
    } else {
      onSaveAsDraft && onSaveAsDraft(data);
    }

    setSaveAndSendInvoice(true);
    isANewInvoice && reset();
  };

  const handleDiscard = () => {
    reset();
    onCancel()
  }

  // Helper function to extract error messages
  const getErrorMessage = (
    error: FieldError| undefined
  ): string => {
    return error?.message || "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <section className={styles.bill_to_container}>
        <Heading variant="h3">Bill From</Heading>
        <FormGroup error={getErrorMessage(errors?.senderStreetAdress)}>
          <FormLabel
            htmlFor="senderStreetAdress"
            error={getErrorMessage(errors?.senderStreetAdress)}
          >
            <Text>Street Address</Text>
          </FormLabel>
          <FormInput
            type="text"
            {...register("senderStreetAdress", { required: "Can't be empty" })}
          />
        </FormGroup>

        <div className={styles.adress_add_ons}>
          <FormGroup error={getErrorMessage(errors?.senderCity)}>
            <FormLabel
              htmlFor="senderCity"
              error={getErrorMessage(errors?.senderCity)}
            >
              <Text>City</Text>
            </FormLabel>
            <FormInput
              type="text"
              {...register("senderCity", { required: "Can't be empty" })}
            />
          </FormGroup>

          <FormGroup error={getErrorMessage(errors?.senderPostCode)}>
            <FormLabel
              htmlFor="senderPostCode"
              error={getErrorMessage(errors?.senderPostCode)}
            >
              <Text>Post Code</Text>
            </FormLabel>
            <FormInput
              type="text"
              {...register("senderPostCode", { required: "Fill this" })}
            />
          </FormGroup>

          <FormGroup
            error={getErrorMessage(errors?.senderCountry)}
            className={styles.country}
          >
            <FormLabel
              htmlFor="senderCountry"
              error={getErrorMessage(errors?.senderCountry)}
            >
              <Text>Country</Text>
            </FormLabel>
            <FormInput
              type="text"
              {...register("senderCountry", { required: "Can't be empty" })}
            />
          </FormGroup>
        </div>
      </section>

      <section className={styles.bill_to_container}>
        <Heading variant="h3">Bill To</Heading>
        <FormGroup error={getErrorMessage(errors?.clientName)}>
          <FormLabel
            htmlFor="clientName"
            error={getErrorMessage(errors?.clientName)}
          >
            <Text>Client Name</Text>
          </FormLabel>
          <FormInput
            type="text"
            {...register("clientName", { required: "Can't be empty" })}
          />
        </FormGroup>

        <FormGroup error={getErrorMessage(errors?.clientEmail)}>
          <FormLabel
            htmlFor="clientEmail"
            error={getErrorMessage(errors?.clientEmail)}
          >
            <Text>Client Email</Text>
          </FormLabel>
          <FormInput
            type="text"
            {...register("clientEmail", {
              required: "Can't be empty",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format"
              },
            })}
          />
        </FormGroup>

        <FormGroup error={getErrorMessage(errors?.clientStreetAddress)}>
          <FormLabel
            htmlFor="clientStreetAddress"
            error={getErrorMessage(errors?.clientStreetAddress)}
          >
            <Text>Street Address</Text>
          </FormLabel>
          <FormInput
            type="text"
            {...register("clientStreetAddress", { required: "Can't be empty" })}
          />
        </FormGroup>

        <div className={styles.adress_add_ons}>
          <FormGroup error={getErrorMessage(errors?.clientCity)}>
            <FormLabel
              htmlFor="clientCity"
              error={getErrorMessage(errors?.clientCity)}
            >
              <Text>City</Text>
            </FormLabel>
            <FormInput
              type="text"
              {...register("clientCity", { required: "Can't be empty" })}
            />
          </FormGroup>

          <FormGroup error={getErrorMessage(errors?.clientPostcode)}>
            <FormLabel
              htmlFor="clientPostcode"
              error={getErrorMessage(errors?.clientPostcode)}
            >
              <Text>Post Code</Text>
            </FormLabel>
            <FormInput
              type="text"
              {...register("clientPostcode", { required: "Fill this" })}
            />
          </FormGroup>

          <FormGroup
            error={getErrorMessage(errors?.clientCountry)}
            className={styles.country}
          >
            <FormLabel
              htmlFor="clientCountry"
              error={getErrorMessage(errors?.clientCountry)}
            >
              <Text>Country</Text>
            </FormLabel>
            <FormInput
              type="text"
              {...register("clientCountry", { required: "Can't be empty" })}
            />
          </FormGroup>
        </div>
      </section>

      <section className={styles.setting_container}>
        <div className={styles.invoice_settings}>
          <Controller
            name="createdAt"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                control={control}
                name="createdAt"
                label="date"
              />
            )}
          />

          <FormGroup>
            <FormLabel htmlFor="paymentTerms">
              <Text>Payment Terms</Text>
            </FormLabel>
            <Controller
              name="paymentTerms"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <FormSelect
                  {...field}
                  options={[
                    { label: "Net 1 Day", value: "1" },
                    { label: "Net 7 Day", value: "7" },
                    { label: "Net 12 Day", value: "12" },
                    { label: "Net 30 Day", value: "30" },
                  ]}
                  selectedTerm={(field.value as string) || "Net 1 Day"}
                  handleSelect={field.onChange} // Pass onChange to handle selection
                />
              )}
            />
          </FormGroup>
        </div>

        <FormGroup error={getErrorMessage(errors?.description)}>
          <FormLabel
            htmlFor="description"
            error={getErrorMessage(errors?.description)}
          >
            <Text>Project Description</Text>
          </FormLabel>
          <FormInput
            type="text"
            {...register("description", { required: "Can't be empty" })}
          />
        </FormGroup>
      </section>

      <section className={styles.itemsContainer}>
        <Heading variant="h3">Item List</Heading>
        <div>
          {fields.map((item, index) => (
            <ItemField
              key={item.id}
              control={control}
              index={index}
              remove={remove}
              watch={watch}
              setValue={setValue}
            />
          ))}
        </div>
        <Button
          variant="secondary"
          radius="rounded-md"
          type="button"
          onClick={() => append({ name: "", quantity: 1, price: 0, total: 0 })}
          className={styles.add_item_button}
        >
          <Text>+ Add New Item</Text>
        </Button>
      </section>

      <aside className={styles.warning}>
        <Text>- All fields must be added</Text>
        {itemListIsEmpty && <Text>- An item must be added</Text>}
      </aside>

      <footer>
        {isANewInvoice && (
          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              radius="rounded-md"
              className={styles.discard_button}
              onClick={handleDiscard}
            >
              <Text>Discard</Text>
            </Button>
            <Button
              type="submit"
              radius="rounded-md"
              className={styles.draft_button}
              onClick={() => {
                setSaveAndSendInvoice(false);
              }}
            >
              Save As Draft
            </Button>
            <Button
              type="submit"
              radius="rounded-md"
              className={styles.save_button}
            >
              Save & Send
            </Button>
          </div>
        )}

        {!isANewInvoice && (
          <div className={styles.edit_form_actions}>
            <Button
              variant="secondary"
              radius="rounded-md"
              className={styles.discard_button}
              type="button"
              onClick={handleDiscard}
            >
              <Text>Cancel</Text>
            </Button>

            <Button
              type="submit"
              radius="rounded-md"
              className={styles.save_edit_button}
            >
              <Text>Save Changes</Text>
            </Button>
          </div>
        )}
      </footer>
    </form>
  );
};

export default InvoiceForm;
