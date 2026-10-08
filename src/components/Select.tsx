/** Figma : Liste déroulante (étiquette visible associée par id). */
export function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  const id = `sel-${label.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.8125rem] font-medium text-muted-foreground">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-[0.875rem]" style={{ borderColor: "var(--color-border-interactive)" }}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}
