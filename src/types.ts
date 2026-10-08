import type { Channel } from "./data";
import type { Status } from "./status";

export type View = "home" | "config" | "analyzing" | "report" | "referentiel" | "historique" | "admin";
export type Kind = "crea" | "maquette";
export type ImportMode = "single" | "per-format";
export type Dims = { w: number; h: number };

export type Session = {
  kind: Kind;
  channels: Channel[];
  formats: string[]; // ids sélectionnés
  formatDefs: Record<string, { label: string; w: number; h: number }>;
  importMode: ImportMode;
  previews: Record<string, string>; // "main" ou id de format → objectURL
  fileDims: Record<string, Dims>; // dimensions réelles du fichier importé
};

export type MapPin = { id: string; themeKey: string; status: Status; loc: { x: number; y: number }; n: number };
