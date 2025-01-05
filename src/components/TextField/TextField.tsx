import { forwardRef, HTMLProps } from "react";

interface TextFieldProps extends HTMLProps<HTMLInputElement> {
  placeholder?: string;
  disabled?: boolean;
  type: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ placeholder, disabled, type, ...props }, ref) => {
    return (
      <input ref={ref} type={type} placeholder={placeholder} {...props} disabled={disabled } />
    );
  }
);


export default TextField;
