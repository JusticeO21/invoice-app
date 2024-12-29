// checkbox.tsx
import checkMark from "../../assets/icon-check.svg"
import Icon from "../icon/Icon";

import React from "react";
import styles from "./Checkbox.module.css"; // Import the CSS module styles

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}

function Checkbox ({
  label,
  checked,
  onChange,
  name,
}:CheckboxProps)  {
  const labelClassName = `${styles.label} ${checked ? styles.checked : ""}`;

  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={name}
        name={name}
        className={styles.hiddenInput} // Hide input using CSS module
      />
      <label htmlFor={name} className={labelClassName}>
        <span className={styles.checkboxCustom} role="checkbox">
          <Icon src={checkMark} alt="checkMark" className={ !checked? styles.hiddenMark: ""} />
        </span>
        {label}
      </label>
    </>
  );
};

export default Checkbox;
