import type { ComponentProps, ReactNode } from "react";
import { cx } from "./cx";

type ButtonProps = Omit<ComponentProps<"button">, "children"> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "md" | "sm";
  icon?: ReactNode;
  children: ReactNode;
};

const SIZE = {
  md: "rounded-lg px-4 py-2 text-[0.8438rem] font-semibold",
  sm: "rounded-md px-2 py-1 text-[0.8125rem] font-medium",
};

const VARIANT = {
  primary: "bg-primary text-primary-foreground",
  secondary: "border border-border-interactive hover:bg-muted",
  danger: "border border-border-interactive text-error hover:bg-muted",
};

/** Figma : Bouton. */
export function Button({ variant = "secondary", size = "md", icon, className, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        SIZE[size],
        VARIANT[variant],
        icon ? "inline-flex items-center gap-1.5" : null,
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}
