import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.css";
import Icon from "../icon/Icon";
import arrowDown from "../../assets/icon-arrow-down.svg";
import { Text } from "../text/Text";

interface FilterOption {
  label: string;
  value: string;
  defaultChecked?: boolean;
}

interface FilterProps {
  options: FilterOption[];
  handleSelect: (selectedName: string) => void;
  selectedTerm: string;
}

const DropDown: React.FC<FilterProps> = ({
  options,
  handleSelect,
  selectedTerm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (name: string) => {
    handleSelect(name);
    setIsOpen(false);
  };

   const selectedOptionLabel =
     options.find((option) => option.value === selectedTerm)?.label || "Net 1 Day"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <button
        type="button"
        onClick={toggleSelect}
        className={styles.toggleButton}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="listbox"
        aria-controls="filter-menu"
      >
        <Text>{selectedOptionLabel}</Text>
        <Icon
          src={arrowDown}
          alt={isOpen ? "arrow up" : "arrow down"}
          size="sm"
          className={`${styles.arrow} ${
            isOpen ? styles.arrowUp : styles.arrowDown
          }`}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu} role="listbox" id="filter-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.dropdownItem}
              role="option"
              onClick={() => handleOptionClick(option.value)}
              aria-selected={option.value === selectedTerm ? "true" : "false"}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
