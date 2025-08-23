import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import CustomCalendar from "../CustomCalendar/CustomCalendar";
import styles from "./DatePicker.module.css";
import calendar from "../../assets/icon-calendar.svg";
import Icon from "../icon/Icon";
import FormGroup from "../InvoiceForm/FormGroup";
import FormLabel from "../InvoiceForm/FormLabel";
import { Text } from "../text/Text";
import { format, isValid, parseISO } from "date-fns";
import TextField from "../TextField/TextField";

interface DatePickerProps<T extends FieldValues = FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  value?: string | Date;
  onChange?: (value: Date) => void;
  onBlur?: () => void;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      control,
      name,
      label,
      placeholder,
      disabled = false,
      error,
      value,
      onChange,
      onBlur,
    },
    ref
  ) => {
    // Use useController only if control is provided (standalone usage)
    const controllerField = control ? useController({ control, name }) : null;

    // Use either controller field or direct props (when used with Controller)
    const field = controllerField?.field || { value, onChange, onBlur, name };

    const [showCalendar, setShowCalendar] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDateChange = useCallback(
      (date: Date) => {
        if (isValid(date) && field.onChange) {
          field.onChange(date);
          setShowCalendar(false);
        }
      },
      [field]
    );

    const toggleCalendar = useCallback(() => {
      if (!disabled) {
        setShowCalendar((prev) => !prev);
      }
    }, [disabled]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setShowCalendar(false);
        }
      };

      if (showCalendar) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [showCalendar]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowCalendar(false);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCalendar();
        }
      },
      [toggleCalendar]
    );

    const selectedDate = useMemo(() => {
      if (!field.value) return new Date();

      const date =
        typeof field.value === "string"
          ? parseISO(field.value)
          : new Date(field.value);
      return isValid(date) ? date : new Date();
    }, [field.value]);

    const formattedDate = useMemo(() => {
      try {
        return format(selectedDate, "dd MMM yyyy");
      } catch {
        return format(new Date(), "dd MMM yyyy");
      }
    }, [selectedDate]);

    return (
      <FormGroup className={styles.datePickerContainer} ref={containerRef}>
        <FormLabel htmlFor={name} className={styles.label}>
          <Text>{label}</Text>
        </FormLabel>
        <div
          className={`${styles.inputWrapper} ${
            disabled ? styles.disabled : ""
          } ${error ? styles.error : ""}`}
          onClick={toggleCalendar}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Open calendar for ${label}`}
          aria-expanded={showCalendar}
          aria-haspopup="dialog"
          aria-disabled={disabled}
          ref={ref}
        >
          <TextField
            id={name}
            name={field.name}
            type="button"
            value={formattedDate}
            placeholder={placeholder || "Select date"}
            onClick={toggleCalendar}
            disabled={disabled}
            readOnly
            aria-label={`Selected date: ${formattedDate}`}
          />
          <Icon src={calendar} alt="Calendar icon" aria-hidden="true" />
        </div>
        {error && (
          <div className={styles.errorText} role="alert">
            <Text>{error}</Text>
          </div>
        )}
        {showCalendar && !disabled && (
          <CustomCalendar
            selectedDate={selectedDate}
            onSelectDate={handleDateChange}
            className={styles.calendar}
            aria-label="Date picker calendar"
          />
        )}
      </FormGroup>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
