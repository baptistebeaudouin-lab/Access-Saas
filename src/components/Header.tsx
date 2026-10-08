import type { View } from "../types";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

/** Figma : En-tête. */
export function Header({ view, go }: { view: View; go: (v: View) => void }) {
  const nav: [string, View][] = [
    ["Accueil", "home"],
    ["Historique", "historique"],
    ["Référentiel", "referentiel"],
    ["Paramètres", "admin"],
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-3.5">
        <Logo onClick={() => go("home")} />
        <nav className="flex flex-wrap items-center gap-1" aria-label="Navigation principale">
          {nav.map(([label, v]) => (
            <NavLink key={v} active={view === v} onClick={() => go(v)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
