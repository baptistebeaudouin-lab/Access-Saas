import type { ReactNode } from "react";

/** Figma : Option radio. */
export function RadioCard({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border p-2.5 text-[0.875rem]" style={{ borderColor: checked ? "var(--color-accent)" : "var(--color-border-interactive)" }}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--color-accent)]" />
      {children}
    </label>
  );
}
