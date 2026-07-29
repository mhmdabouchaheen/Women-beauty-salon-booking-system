import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
  "inline-flex items-center justify-center rounded-full px-7 py-3 font-medium transition-all duration-300 active:scale-95";

  const styles = {
    primary:
  "bg-rose-700 text-white shadow-lg hover:bg-rose-800 hover:shadow-xl hover:scale-105",

    outline:
  "border border-rose-700 text-rose-700 hover:bg-rose-50 hover:scale-105",
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}