// checkbox.tsx
import checkMark from "../../assets/icon-check.svg";
import Icon from "../icon/Icon";

import React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

function Checkbox({ label, checked, onChange, value }: CheckboxProps) {
  const labelClassName = `${styles.label} ${checked ? styles.checked : ""}`;

  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={value}
        name={value}
        data-testid="checkbox-input"
        className={styles.hiddenInput}
      />
      <label htmlFor={value} className={labelClassName}>
        <span
          className={styles.checkboxCustom}
          role="checkbox"
          data-testid="checkbox-span"
        >
          <Icon
            src={checkMark}
            alt="checkMark"
            className={!checked ? styles.hiddenMark : ""}
          />
        </span>
        {label}
      </label>
    </>
  );
}

export default Checkbox;
