import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import FormInput from "../TextField/TextField";
import { Text } from "../text/Text";
import styles from "./ItemFieled.module.css"
import Button from "../button/Button";
import Icon from '../icon/Icon';
import deleteIcon from "../../assets/icon-delete.svg"

interface ItemFieldProps {
    control: any;
    index: number;
    watch: any;
    setValue: any;
  remove: (index: number) => void;
}

const ItemField: React.FC<ItemFieldProps> = ({ control, index, remove, watch, setValue }) => {
  const item = watch(`items[${index}]`);
  useEffect(() => {
    if (item?.quantity && item?.price) {
      const total = item.quantity * item.price;
      setValue(`items[${index}].total`, total);
    }
  }, [item?.quantity, item?.price, index, setValue]);

  return (
    <article key={index} className={styles.container}>
      <Controller
        control={control}
        name={`items[${index}].name`}
        rules={{ required: "Item name is required" }}
        render={({ field, fieldState }) => (
          <FormGroup
            className={`${styles.item_name} ${
              fieldState?.invalid && styles.invalid
            }`}
          >
            <FormLabel htmlFor="Item Name">
              <Text className={index > 0 ? styles.hideLabelOnDesktop : ""}>
                Name
              </Text>
            </FormLabel>
            <FormInput type="text" {...field} />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name={`items[${index}].quantity`}
        rules={{ required: "Item name is required", min: 1 }}
        render={({ field, fieldState }) => (
          <FormGroup
            className={`${styles.item_quantity} ${
              fieldState?.invalid && styles.invalid
            }`}
          >
            <FormLabel htmlFor="Item Quantity">
              <Text className={index > 0 ? styles.hideLabelOnDesktop : ""}>
                QTY
              </Text>
            </FormLabel>
            <FormInput type="number" {...field} />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name={`items[${index}].price`}
        rules={{ required: "Item name is required", min: 1 }}
        render={({ field, fieldState }) => (
          <FormGroup
            className={`${styles.item_price} ${
              fieldState?.invalid && styles.invalid
            }`}
          >
            <FormLabel htmlFor="Item Price">
              <Text className={index > 0 ? styles.hideLabelOnDesktop : ""}>
                Price
              </Text>
            </FormLabel>
            <FormInput type="number" {...field} />
          </FormGroup>
        )}
      />

      <Controller
        control={control}
        name={`items[${index}].total`}
        rules={{ required: "Item name is required", min: 1 }}
        render={({ field }) => (
          <FormGroup className={styles.item_total}>
            <FormLabel htmlFor="Item Total">
              <Text className={index > 0 ? styles.hideLabelOnDesktop : ""}>
                Total
              </Text>
            </FormLabel>
            <FormInput type="number" {...field} disabled />
          </FormGroup>
        )}
      />

      <Button
        type="button"
        onClick={() => remove(index)}
        variant="danger"
        className={styles.remove_button}
      >
        <Icon src={deleteIcon} alt="delete item" className={styles.icon} />
      </Button>
    </article>
  );
};

export default ItemField;
