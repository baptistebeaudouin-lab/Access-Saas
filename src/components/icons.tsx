type SizeProps = { size?: number };

/* ---------- Statuts (taille 1em, couleur héritée) ---------- */

export function StatusOkIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatusWarnIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden="true">
      <path d="M10 2.5l7.5 13.2H2.5L10 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 7.6v3.4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="10" cy="13.4" r="0.95" fill="currentColor" />
    </svg>
  );
}

export function StatusErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function StatusNeutralIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Interface ---------- */

export function LogoMarkIcon() {
  return (
    <svg viewBox="0 0 20 20" width="17" height="17" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.4 10.3l2.4 2.4 4.8-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UploadIcon({ size = 22 }: SizeProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M12 16V6m0 0l-3.5 3.5M12 6l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 15v2.5A1.5 1.5 0 006.5 19h11a1.5 1.5 0 001.5-1.5V15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function WrenchIcon({ size = 18 }: SizeProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path d="M14.5 6.2a3.6 3.6 0 00-4.8 4.3l-5 5a1.6 1.6 0 002.3 2.3l5-5a3.6 3.6 0 004.3-4.8l-2 2-2-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function ExpandIcon() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M4 8V4h4M16 12v4h-4M4 12v4h4M16 8V4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Chevron d'accordéon — le conteneur parent porte aria-hidden. */
export function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Coche de la case à cocher — le conteneur parent porte aria-hidden. */
export function CheckmarkIcon() {
  return (
    <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
      <path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="var(--color-primary-foreground)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
