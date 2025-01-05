import React, { useState, HTMLProps } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import styles from "./Calandar.module.css";
import leftArrow from "../../assets/icon-arrow-left.svg";
import rightArrow from "../../assets/icon-arrow-right.svg";
import Icon from "../icon/Icon";
import Button from "../button/Button";
import { Heading } from "../heading/Heading";
import classNames from "classnames";

interface CalandarProps extends HTMLProps<HTMLDivElement> {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const Calandar: React.FC<CalandarProps> = ({
  selectedDate,
  onSelectDate,
  className
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const startOfCalendar = startOfWeek(firstDayOfMonth);
  const endOfCalendar = endOfWeek(lastDayOfMonth);

  const daysInCalendar = eachDayOfInterval({
    start: startOfCalendar,
    end: endOfCalendar,
  });

  const handleDayClick = (date: Date) => {
    if (date.getMonth() === currentMonth.getMonth()) {
      onSelectDate(date); // Update the selected date
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const calanderClassNames = classNames(styles.calendarContainer, className);

  return (
    <div className={calanderClassNames}>
      <div className={styles.header}>
        <Button 
          type="button"
          onClick={handlePreviousMonth}
          className={styles.navButton}
        >
          <Icon alt="Go back" src={leftArrow} />
        </Button>
        <Heading className={styles.monthLabel} variant="h3">
          {format(currentMonth, "MMM yyyy")}
        </Heading>
        <Button type="button" onClick={handleNextMonth} className={styles.navButton}>
          <Icon alt="Go to next month" src={rightArrow} />
        </Button>
      </div>

      <div className={styles.daysGrid}>
        {daysInCalendar.map((day) => (
          <Button type="button"
            key={day.toString()}
            className={`${styles.dayButton} ${
              isToday(day) ? styles.today : ""
            } ${
              day.getMonth() !== currentMonth.getMonth() ? styles.disabled : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            {format(day, "d")}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calandar;
