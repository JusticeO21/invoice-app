import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import styles from "./DatePicker.module.css";
import calendar from "../../assets/icon-calendar.svg"
import Icon from "../icon/Icon";
import FormGroup from "../form/FormGroup";
import FormLabel from "../form/FormLabel";
import { Text } from "../text/Text";
import { format } from "date-fns";
import TextField from "../TextField/TextField";

interface DatePickerProps {
  control: Control<any>;
  name: string;
  label: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ control, name, label }) => {
  const { field } = useController({ control, name });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date: Date) => {
    field.onChange(date);
    };
    
    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(e.target.value);

      if (!isNaN(date.getTime())) {
        handleDateChange(date)
      } else {
       handleDateChange(new Date());
      }
    };

    const toggleCalendar = () => {
      setShowCalendar((prev) => !prev);
    };

    const selectedDate = new Date(field.value);

  return (
    <FormGroup className={styles.datePickerContainer}>
      <FormLabel htmlFor={name} className={styles.label}>
        <Text> {label} </Text>
      </FormLabel>
      <div
        className={styles.inputWrapper}
        onClick={toggleCalendar}
        aria-label="Open calendar"
      >
        <TextField
          id={name}
          {...field}
          type="button"
          value={format(selectedDate, "dd MMM yyyy")}
          onChange={handleInputFieldChange}
          onClick={toggleCalendar}
          readOnly
        />
          <Icon src={calendar} alt="calendar" />
      </div>
          {showCalendar && (
            <CustomCalendar selectedDate={selectedDate} onSelectDate={handleDateChange} className={styles.calendar} />
      )}
    </FormGroup>
  );
};

export default DatePicker;
