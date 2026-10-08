import { Checkbox } from "./Checkbox";

/** Figma : Puce de format (bouton à bascule, role="checkbox"). */
export function FormatChip({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-colors"
      style={{ borderColor: checked ? "var(--color-accent)" : "var(--color-border-interactive)", background: checked ? "color-mix(in srgb, var(--color-accent) 8%, transparent)" : "transparent" }}
    >
      <Checkbox checked={checked} />
      <span className="text-[0.8125rem] font-medium leading-tight">{label}</span>
    </button>
  );
}
