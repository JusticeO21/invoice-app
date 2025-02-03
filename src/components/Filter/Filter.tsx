import React, { useState, useEffect, useCallback } from "react";
import Checkbox from "../checkBox/Checkbox";
import styles from "./Filter.module.css";
import Icon from "../icon/Icon";
import arrowDown from "../../assets/icon-arrow-down.svg";
import { Text } from "../text/Text";
import {
  FilterInvoice,
  updateAvailableNumberOfInvoices,
} from "../../Redux/invoiceReducer";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import { useFetchAllInvoicesQuery } from "../../Redux/authApi";

interface FilterOption {
  label: string;
  name: string;
  defaultChecked?: boolean;
}

interface FilterProps {
  options: FilterOption[];
}

const mediaQuery = window.matchMedia("(max-width:600px)");

function Filter({ options }: FilterProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(mediaQuery.matches);
  const selelectedOption = useAppSelector((state) => state.invoice.FilterBy);
  const { data, isError } = useFetchAllInvoicesQuery();

  useEffect(() => {
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filteredInvoices = data.filter((invoice) => {
        if (selelectedOption) return invoice.status === selelectedOption;
        return true;
      });
      dispatch(updateAvailableNumberOfInvoices(filteredInvoices.length));
    }

    if (isError) {
      dispatch(updateAvailableNumberOfInvoices(0));
    }
  }, [data]);

  const toggleFilter = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      if (selelectedOption === name) return dispatch(FilterInvoice(""));
      dispatch(FilterInvoice(name));
      if (data) {
        const filteredInvoices = data.filter(
          (invoice) => invoice.status === name
        );
        dispatch(updateAvailableNumberOfInvoices(filteredInvoices.length));
      }
    },
    [selelectedOption, dispatch]
  );

  return (
    <div className={styles.filter}>
      <button
        onClick={toggleFilter}
        className={styles.toggleButton}
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
        aria-controls="Filter-menu"
        type="button"
      >
        <Text>{isMobile ? "Filter" : "Filter by status"}</Text>

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
            <li key={option.name} role="menuitem">
              <Checkbox
                label={option.label}
                checked={selelectedOption === option.name}
                onChange={handleCheckboxChange}
                value={option.name}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filter;
