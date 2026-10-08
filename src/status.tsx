import type { ReactNode } from "react";
import type { Crit } from "./data";
import { StatusErrorIcon, StatusNeutralIcon, StatusOkIcon, StatusWarnIcon } from "./components/icons";

export type Status = "ok" | "warn" | "error" | "neutral";

type StatusMeta = {
  label: string;
  color: string;
  surface: string;
  icon: ReactNode;
};

// Icônes distinctes par statut — jamais la couleur seule.
export const STATUS: Record<Status, StatusMeta> = {
  ok: { label: "Conforme", color: "var(--color-ok)", surface: "var(--color-ok-surface)", icon: <StatusOkIcon /> },
  warn: { label: "À vérifier", color: "var(--color-warn)", surface: "var(--color-warn-surface)", icon: <StatusWarnIcon /> },
  error: { label: "Non conforme", color: "var(--color-error)", surface: "var(--color-error-surface)", icon: <StatusErrorIcon /> },
  neutral: { label: "Non vérifiable", color: "var(--color-neutral)", surface: "var(--color-neutral-surface)", icon: <StatusNeutralIcon /> },
};

// Criticité — système distinct des statuts, uniquement sur les items warn / error.
export const CRIT: Record<Crit, { label: string; color: string; surface: string }> = {
  bloquant: { label: "Bloquant", color: "var(--color-crit-bloquant)", surface: "var(--color-crit-bloquant-surface)" },
  majeur: { label: "Majeur", color: "var(--color-crit-majeur)", surface: "var(--color-crit-majeur-surface)" },
  mineur: { label: "Mineur", color: "var(--color-crit-mineur)", surface: "var(--color-crit-mineur-surface)" },
};
