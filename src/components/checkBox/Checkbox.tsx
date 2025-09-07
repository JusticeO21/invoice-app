import { memo } from "react";
import classNames from "classnames";
import checkMark from "../../assets/icon-check.svg";
import Icon from "../icon/Icon";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  disabled?: boolean;
  className?: string;
}

function Checkbox({
  label,
  checked,
  onChange,
  value,
  disabled = false,
  className,
}: Readonly<CheckboxProps>) {
  const labelClassName = classNames(
    styles.label,
    { [styles.checked]: checked },
    className
  );

  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={value}
        name={value}
        disabled={disabled}
        data-testid="checkbox-input"
        className={styles.hiddenInput}
        aria-describedby={`${value}-label`}
      />
      <label htmlFor={value} className={labelClassName} id={`${value}-label`}>
        <span
          className={styles.checkboxCustom}
          data-testid="checkbox-span"
          aria-hidden="true"
        >
          <Icon
            src={checkMark}
            alt=""
            className={classNames({ [styles.hiddenMark]: !checked })}
          />
        </span>
        {label}
      </label>
    </div>
  );
}

export default memo(Checkbox);
