import { CheckmarkIcon } from "./icons";

/** Figma : Case à cocher (visuel seul, aria-hidden : l'état est porté par le contrôle parent). */
export function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className="grid h-4 w-4 shrink-0 place-items-center rounded-checkbox border transition-colors"
      style={{ borderColor: checked ? "var(--color-accent)" : "var(--color-border-interactive)", background: checked ? "var(--color-accent)" : "transparent" }}
      aria-hidden="true"
    >
      {checked && <CheckmarkIcon />}
    </span>
  );
}
