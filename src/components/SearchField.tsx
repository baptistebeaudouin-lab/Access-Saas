import { cx } from "./cx";

/** Figma : Champ de recherche (étiquette masquée visuellement). */
export function SearchField({ id, label, value, onChange, placeholder, className }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder: string; className?: string }) {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input id={id} type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cx(className, "w-full max-w-md rounded-lg border bg-background px-3.5 py-2.5 text-[0.875rem] focus:border-accent")} style={{ borderColor: "var(--color-border-interactive)" }} />
    </>
  );
}
