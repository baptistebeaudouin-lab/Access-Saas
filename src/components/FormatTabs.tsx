import type { KeyboardEvent as ReactKeyboardEvent } from "react";

/**
 * Figma : Onglet de format.
 * Liste d'onglets ARIA (flèches gauche/droite, Début, Fin) ; les panneaux associés ont l'id `panel-<index>`.
 */
export function FormatTabs({ tabs, selected, onSelect, label = "Formats testés" }: { tabs: { id: string; label: string }[]; selected: number; onSelect: (index: number) => void; label?: string }) {
  function onTabKey(e: ReactKeyboardEvent<HTMLButtonElement>, i: number) {
    const last = tabs.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault(); onSelect(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div role="tablist" aria-label={label} className="mt-5 flex flex-wrap gap-1.5">
      {tabs.map((t, i) => (
        <button
          key={t.id}
          role="tab"
          id={`tab-${i}`}
          aria-selected={selected === i}
          tabIndex={selected === i ? 0 : -1}
          onKeyDown={(e) => onTabKey(e, i)}
          aria-controls={`panel-${i}`}
          onClick={() => onSelect(i)}
          className="rounded-lg border px-3 py-1.5 font-mono text-[0.8125rem] font-medium transition-colors"
          style={{ borderColor: selected === i ? "var(--color-primary)" : "var(--color-border-interactive)", background: selected === i ? "var(--color-primary)" : "transparent", color: selected === i ? "var(--color-primary-foreground)" : "var(--color-foreground)" }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
