/** Figma : Format ajouté (format personnalisé, retirable). */
export function CustomFormatChip({ w, h, onRemove }: { w: number; h: number; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-mono text-[0.8125rem]">
      {w}×{h}
      <button
        onClick={onRemove}
        aria-label={`Retirer le format personnalisé ${w}×${h}`}
        className="text-muted-foreground hover:text-foreground"
      >✕</button>
    </span>
  );
}
