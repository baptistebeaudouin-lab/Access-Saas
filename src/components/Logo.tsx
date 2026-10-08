import { LogoMarkIcon } from "./icons";

/** Figma : Logo (bouton de retour à l'accueil). */
export function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label="A11Y Check — retour à l'accueil" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <LogoMarkIcon />
      </span>
      <span className="text-[1.0625rem] font-bold tracking-tight">A11Y&nbsp;Check</span>
      <span className="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] font-medium text-muted-foreground">
        RGAA · interne
      </span>
    </button>
  );
}
