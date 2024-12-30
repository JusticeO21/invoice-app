// InvoiceForm.tsx
import React, { FormEvent } from "react";
import FormInput from "./FormInput";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
import type { Invoice } from "../../types/AppDataType";
import { Text } from "../text/Text";
import { Heading } from "../heading/Heading";
import styles from "./Form.module.css";

interface FormErrors {
    [key:string] : string
}

type InvoiceFormProps = {
  onSubmit: (data:Invoice) => void;
  validateForm: () => boolean;
  handleChange: () => void;
  formData: Invoice;
  formErrors: FormErrors;
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  onSubmit,
  validateForm,
  handleChange,
  formData,
  formErrors,
}) => {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <section className={styles.bill_to_container}>
        <Heading variant="h3">Bill From</Heading>
        <FormGroup>
          <FormLabel htmlFor="street address">
            <Text>Street Address</Text>
          </FormLabel>
          <FormInput
            id="street_address"
            name="street_address"
            type="text"
            value={formData.senderAddress.street}
            onChange={handleChange}
            required
            error={formErrors.streetAddress}
          />
        </FormGroup>

        <div className={styles.adress_add_ons}>
          <FormGroup>
            <FormLabel htmlFor="city">
              <Text>city</Text>
            </FormLabel>
            <FormInput
              id="city"
              name="city"
              type="text"
              value={formData.senderAddress.city}
              onChange={handleChange}
              required
              error={formErrors.city}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="Post Code">
              <Text>Post Code</Text>
            </FormLabel>
            <FormInput
              id="postcode"
              name="postcode"
              type="text"
              value={formData.senderAddress.postCode}
              onChange={handleChange}
              required
              error={formErrors.postcode}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="Country">
              <Text>Country</Text>
            </FormLabel>
            <FormInput
              id="country"
              name="country"
              type="text"
              value={formData.senderAddress.country}
              onChange={handleChange}
              required
              error={formErrors.country}
            />
          </FormGroup>
        </div>
      </section>

      <section className={styles.bill_to_container}>
        <Heading variant="h3">Bill To</Heading>
        <FormGroup>
          <FormLabel htmlFor="Client name">
            <Text>Client Name</Text>
          </FormLabel>
          <FormInput
            id="client_name"
            name="client_name"
            type="text"
            value={formData.clientAddress.street}
            onChange={handleChange}
            required
            error={formErrors.streetAddress}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="Client email">
            <Text>Client Email</Text>
          </FormLabel>
          <FormInput
            id="client_email"
            name="client_email"
            type="text"
            value={formData.clientEmail}
            onChange={handleChange}
            required
            error={formErrors.clientEmail}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="clientStreetAddress">
            <Text>Street Address</Text>
          </FormLabel>
          <FormInput
            id="clientStreetAddress"
            name="clientStreetAddress"
            type="text"
            value={formData.clientAddress.street}
            onChange={handleChange}
            required
            error={formErrors.clientStreetAddress}
          />
        </FormGroup>

        <div className={styles.adress_add_ons}>
          <FormGroup>
            <FormLabel htmlFor="client_city">
              <Text>city</Text>
            </FormLabel>
            <FormInput
              id="client_city"
              name="client_city"
              type="text"
              value={formData.clientAddress.city}
              onChange={handleChange}
              required
              error={formErrors.city}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="client_postcode">
              <Text>Post Code</Text>
            </FormLabel>
            <FormInput
              id="client_postcode"
              name="client_postcode"
              type="text"
              value={formData.clientAddress.postCode}
              onChange={handleChange}
              required
              error={formErrors.postcode}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="client_country">
              <Text>Country</Text>
            </FormLabel>
            <FormInput
              id="client_country"
              name="client_country"
              type="text"
              value={formData.clientAddress.country}
              onChange={handleChange}
              required
              error={formErrors.client_country}
            />
          </FormGroup>
        </div>
      </section>

      <section className={styles.bill_to_container}>
        <div className={styles.adress_add_ons}>
          <FormGroup>
            <FormLabel htmlFor="invoiceDate">
              <Text>Invoice Date</Text>
            </FormLabel>
            <FormInput
              id="invoiceDate"
              name="invoiceDate"
              type="date"
              value={formData.createdAt}
              onChange={handleChange}
              required
              error={formErrors.createdAt}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="client_postcode">
              <Text>Payment Terms</Text>
            </FormLabel>
            <FormSelect
              options={[
                { label: "Net 1 Day", name: "1" },
                { label: "Net 7 Day", name: "7" },
                { label: "Net 12 Day", name: "12" },
                { label: "Net 30 Day", name: "30" },
              ]}
              handleSelect={handleChange}
              selectedTerm="Net 1 Day"
            />
          </FormGroup>
        </div>

        <FormGroup>
          <FormLabel htmlFor="projectDescription">
            <Text>project Description</Text>
          </FormLabel>
          <FormInput
            id="projectDescription"
            name="projectDescription"
            type="text"
            value={formData.createdAt}
            onChange={handleChange}
            required
            error={formErrors.createdAt}
          />
        </FormGroup>
      </section>
    </form>
  );
};

export default InvoiceForm;
