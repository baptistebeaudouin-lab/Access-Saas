/** Figma : Carte de choix (type de test). */
export function ChoiceCard({ eyebrow, title, desc, onClick }: { eyebrow: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start rounded-2xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-card-hover"
    >
      <span className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</span>
      <h3 className="mt-3 text-[1.375rem] font-bold leading-tight tracking-tight">{title}</h3>
      <p className="mt-2 text-[0.9063rem] leading-relaxed text-muted-foreground">{desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-accent">
        Commencer <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}
