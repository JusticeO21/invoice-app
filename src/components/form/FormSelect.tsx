import React, { useState } from "react";
import styles from "./FormSelect.module.css";
import Icon from "../icon/Icon";
import arrowDown from "../../assets/icon-arrow-down.svg";
import { Text } from "../text/Text";

interface FilterOption {
  label: string;
  name: string;
  defaultChecked?: boolean;
}

interface FilterProps {
    options: FilterOption[];
    handleSelect: () => void;
    selectedTerm: string;
}

const FormSelect: React.FC<FilterProps> = ({ options, handleSelect, selectedTerm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => setIsOpen((prev) => !prev);

 const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    handleSelect()
};

  return (
    <div className={styles.selectContainer}>
      <button
        onClick={toggleSelect}
        className={styles.toggleButton}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
        aria-controls="Filter-menu"
      >
              <Text>{selectedTerm}</Text>

        <Icon
          src={arrowDown}
          alt={!isOpen ? "arrow down" : "arrow up"}
          size="sm"
          className={`${styles.arrow} ${
            !isOpen ? styles.arrowDown : styles.arrowUp
          }`}
        />
      </button>

      {isOpen && (
        <ul
          className={styles.menu}
          role="menu"
          id="Filter-menu"
          aria-labelledby="Filter-toggle"
        >
          {options.map((option) => (
            <option >
              <li key={option.name} role="paymentTermsItem" onClick={handleClick}>
                      {
                          option.label
                }
              </li>
            </option>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormSelect;
