/** Figma : Étiquette de référence (référence RGAA ou bonne pratique). Ne rend rien sans libellé. */
export function TagChip({ label }: { label?: string }) {
  if (!label) return null;
  return <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[0.8125rem] font-medium text-muted-foreground">{label}</span>;
}
