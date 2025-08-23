import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import styles from "./DropDown.module.css";
import Icon from "../icon/Icon";
import arrowDown from "../../assets/icon-arrow-down.svg";
import { Text } from "../text/Text";

interface FilterOption {
  label: string;
  value: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

interface FilterProps {
  options: FilterOption[];
  handleSelect: (selectedName: string) => void;
  selectedTerm: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
  id?: string;
  ariaLabel?: string;
}

// Wrap DropDown with React.forwardRef
const DropDown = React.forwardRef<HTMLDivElement, FilterProps>(
  (
    {
      options,
      handleSelect,
      selectedTerm,
      placeholder,
      disabled = false,
      loading = false,
      searchable = false,
      className,
      error,
      id,
      ariaLabel,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const toggleSelect = useCallback(() => {
      if (!disabled && !loading) {
        setIsOpen((prev) => {
          if (!prev && searchable) {
            // Focus search input when opening
            setTimeout(() => searchInputRef.current?.focus(), 0);
          }
          return !prev;
        });
        setFocusedIndex(-1);
      }
    }, [disabled, loading, searchable]);

    const handleOptionClick = useCallback(
      (value: string, optionDisabled?: boolean) => {
        if (!optionDisabled && !disabled) {
          handleSelect(value);
          setIsOpen(false);
          setSearchTerm("");
          setFocusedIndex(-1);
        }
      },
      [handleSelect, disabled]
    );

    // Filter options based on search term
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    // Get selected option label with fallback
    const selectedOptionLabel = useMemo(() => {
      const selectedOption = options.find(
        (option) => option.value === selectedTerm
      );
      return selectedOption?.label || placeholder || "Select option";
    }, [options, selectedTerm, placeholder]);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
          setFocusedIndex(-1);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled || loading) return;

        switch (event.key) {
          case "Enter":
          case " ":
            event.preventDefault();
            if (!isOpen) {
              toggleSelect();
            } else if (
              focusedIndex >= 0 &&
              focusedIndex < filteredOptions.length
            ) {
              const option = filteredOptions[focusedIndex];
              handleOptionClick(option.value, option.disabled);
            }
            break;
          case "Escape":
            event.preventDefault();
            setIsOpen(false);
            setSearchTerm("");
            setFocusedIndex(-1);
            break;
          case "ArrowDown":
            event.preventDefault();
            if (!isOpen) {
              toggleSelect();
            } else {
              setFocusedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : 0
              );
            }
            break;
          case "ArrowUp":
            event.preventDefault();
            if (isOpen) {
              setFocusedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
              );
            }
            break;
        }
      },
      [
        disabled,
        loading,
        isOpen,
        focusedIndex,
        filteredOptions,
        toggleSelect,
        handleOptionClick,
      ]
    );

    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setFocusedIndex(-1);
      },
      []
    );

    const dropdownId =
      id || `dropdown-${Math.random().toString(36).substring(2, 11)}`;

    return (
      <div
        className={`${styles.selectContainer} ${className || ""} ${
          disabled ? styles.disabled : ""
        } ${error ? styles.error : ""}`}
        ref={ref || selectRef}
      >
        <button
          type="button"
          onClick={toggleSelect}
          onKeyDown={handleKeyDown}
          className={`${styles.toggleButton} ${loading ? styles.loading : ""}`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="listbox"
          aria-controls={dropdownId}
          aria-label={ariaLabel || `Select from ${options.length} options`}
          disabled={disabled || loading}
        >
          <Text>{loading ? "Loading..." : selectedOptionLabel}</Text>
          <Icon
            src={arrowDown}
            alt={isOpen ? "arrow up" : "arrow down"}
            size="sm"
            className={`${styles.arrow} ${
              isOpen ? styles.arrowUp : styles.arrowDown
            }`}
            aria-hidden="true"
          />
        </button>

        {error && (
          <div className={styles.errorText} role="alert">
            <Text>{error}</Text>
          </div>
        )}

        {isOpen && !disabled && (
          <div className={styles.dropdownContainer}>
            {searchable && (
              <div className={styles.searchContainer}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search options..."
                  className={styles.searchInput}
                  aria-label="Search options"
                />
              </div>
            )}
            <ul className={styles.dropdownMenu} role="listbox" id={dropdownId}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    className={`${styles.dropdownItem} ${
                      option.disabled ? styles.optionDisabled : ""
                    } ${index === focusedIndex ? styles.focused : ""} ${
                      option.value === selectedTerm ? styles.selected : ""
                    }`}
                    role="option"
                    onClick={() =>
                      handleOptionClick(option.value, option.disabled)
                    }
                    aria-selected={
                      option.value === selectedTerm ? "true" : "false"
                    }
                    aria-disabled={option.disabled ? "true" : "false"}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li
                  className={styles.noOptions}
                  role="option"
                  aria-disabled="true"
                >
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

DropDown.displayName = "DropDown";

export default DropDown;
