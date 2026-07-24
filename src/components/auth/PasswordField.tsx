"use client";

import { useState } from "react";
import Icon from "./Icon";

type PasswordFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  leftIcon?: string;
  inputClassName?: string;
  labelExtra?: React.ReactNode;
};

export default function PasswordField({
  id,
  label,
  placeholder = "••••••••",
  required,
  value,
  onChange,
  leftIcon,
  inputClassName = "",
  labelExtra,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label
          className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider"
          htmlFor={id}
        >
          {label}
        </label>
        {labelExtra}
      </div>
      <div className="relative group">
        {leftIcon && (
          <Icon
            name={leftIcon}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
          />
        )}
        <input
          id={id}
          name={id}
          required={required}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            inputClassName ||
            `w-full h-14 ${leftIcon ? "pl-12" : "px-5"} pr-12 bg-white/60 border border-outline-variant rounded-xl focus:border-primary transition-all duration-300 font-body-md text-body-md`
          }
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
        >
          <Icon name={visible ? "visibility_off" : "visibility"} />
        </button>
      </div>
    </div>
  );
}
