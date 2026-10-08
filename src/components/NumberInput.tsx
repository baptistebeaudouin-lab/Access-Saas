/** Figma : Champ numérique (chiffres uniquement). */
export function NumberInput({ id, value, onChange, placeholder }: { id?: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      placeholder={placeholder}
      inputMode="numeric"
      className="w-16 rounded-lg border bg-background px-2.5 py-1.5 text-center font-mono text-[0.8125rem] focus:border-accent"
      style={{ borderColor: "var(--color-border-interactive)" }}
    />
  );
}
