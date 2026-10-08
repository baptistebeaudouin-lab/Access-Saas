/** Figma : Puce de canal (bouton à bascule, role="checkbox"). */
export function ChannelChip({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="rounded-full border px-3.5 py-1.5 text-[0.8438rem] font-medium transition-colors"
      style={{
        borderColor: checked ? "var(--color-primary)" : "var(--color-border-interactive)",
        background: checked ? "var(--color-primary)" : "transparent",
        color: checked ? "var(--color-primary-foreground)" : "var(--color-foreground)",
      }}
    >
      {label}
    </button>
  );
}
