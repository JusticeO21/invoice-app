import { Heading } from "../heading/Heading";
import { Text } from '../text/Text';
import styles from "./InvoiceControlBar.module.css";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import plus from "../../assets/icon-plus.svg";
import Filter from "../Filter/Filter";
import { useAppSelector } from "../../Hooks/useRedux";

interface FilterOption {
  label: string;
  name: string;
  defaultChecked?: boolean;
}

const mediaQuery = window.matchMedia(`(max-width:600px)`);

const options: Array<FilterOption> = [
  {
    label: "draft",
    name: "draft",
  },
  {
    label: "pending",
    name: "pending",
  },
  {
    label: "paid",
    name: "paid",
  },
];

interface InvoiceControlBarProps {
    onAddNewInvoice:()=>void
}

function InvoiceControlBar({ onAddNewInvoice }: InvoiceControlBarProps) {
  const totalInvices = useAppSelector(state => state.invoice.availableInvoices)
  
  function handleAddNewInvoice(event: React.MouseEvent) {
    event.stopPropagation();
    onAddNewInvoice();
  }
  return (
    <header className={styles.header_container}>
      <span className={styles.title}>
        <Heading>Invoice</Heading>
        <Text>
          {mediaQuery.matches
            ? `${totalInvices} invoices`
            : `There are ${totalInvices} invoices`}
        </Text>
      </span>

      <span className={styles.controls}>
        <Filter options={options} />
        <Button
          className={styles.button}
          radius="rounded-md"
          onClick={handleAddNewInvoice}
        >
          <Icon src={plus} alt="add invoice" className={styles.icon} />
          <Text>{mediaQuery.matches ? "new" : "new invoice"}</Text>
        </Button>
      </span>
    </header>
  );
}

export default InvoiceControlBar
