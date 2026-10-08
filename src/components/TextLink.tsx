import type { ReactNode } from "react";
import { cx } from "./cx";

type TextLinkProps = {
  tone?: "accent" | "muted";
  size?: "md" | "sm";
  /** Rend un <label> associé à ce champ (ex. champ fichier) au lieu d'un bouton. */
  htmlFor?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

/** Figma : Lien texte. */
export function TextLink({ tone = "accent", size = "md", htmlFor, onClick, className, children }: TextLinkProps) {
  const classes = cx(
    className,
    htmlFor ? "cursor-pointer" : null,
    size === "md" ? "text-[0.8438rem]" : "text-[0.8125rem]",
    "font-medium",
    tone === "accent" ? "text-accent hover:underline" : "text-muted-foreground hover:text-foreground hover:underline"
  );
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={classes}>
        {children}
      </label>
    );
  }
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
