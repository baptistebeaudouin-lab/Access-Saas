import { CHANNELS, type Device, type FormatDef } from "../data";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { Select } from "./Select";
import { TextField } from "./TextField";

/** Figma : Formulaire de format (ajout / modification). */
export function FormatForm({ draft, onChange, editing, error, onSave, onCancel }: { draft: FormatDef; onChange: (d: FormatDef) => void; editing: boolean; error: string | null; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <h2 className="text-[0.9375rem] font-semibold">{editing ? "Modifier le format" : "Ajouter un format"}</h2>
      <div className="mt-3 space-y-3">
        <TextField label="Nom technique" value={draft.name} onChange={(v) => onChange({ ...draft, name: v })} />
        <TextField label="Libellé" value={draft.label} onChange={(v) => onChange({ ...draft, label: v })} />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Largeur" inputMode="numeric" value={draft.w || ""} onChange={(v) => onChange({ ...draft, w: +v.replace(/\D/g, "") })} />
          <TextField label="Hauteur" inputMode="numeric" value={draft.h || ""} onChange={(v) => onChange({ ...draft, h: +v.replace(/\D/g, "") })} />
        </div>
        <Select label="Device" value={draft.device} onChange={(v) => onChange({ ...draft, device: v as Device })} options={["Desktop", "Mobile", "Tablette", "Habillage"].map((d) => [d, d] as [string, string])} />
        <Select label="Canal associé" value={draft.channel} onChange={(v) => onChange({ ...draft, channel: v })} options={CHANNELS.map((c) => [c, c] as [string, string])} />
        <div aria-live="polite">
          {error && <Alert status="error" size="sm">{error}</Alert>}
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="primary" onClick={onSave}>{editing ? "Enregistrer" : "Ajouter"}</Button>
          {editing && <Button onClick={onCancel}>Annuler</Button>}
        </div>
      </div>
    </div>
  );
}
