import type { HTMLAttributes } from "react";

/** Figma : Champ texte (étiquette visible englobant le champ). */
export function TextField({ label, value, onChange, inputMode }: { label: string; value: string | number; onChange: (v: string) => void; inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.8125rem] font-medium text-muted-foreground">{label}</span>
      <input inputMode={inputMode} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-[0.875rem]" style={{ borderColor: "var(--color-border-interactive)" }} />
    </label>
  );
}
