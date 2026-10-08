import { useState } from "react";
import { FileInput } from "./FileInput";
import { UploadIcon } from "./icons";
import { TextLink } from "./TextLink";

/** Figma : Zone de dépôt (visuel unique). */
export function Dropzone({ idBase, name, preview, onFile, onClear }: { idBase: string; name?: string; preview?: string; onFile: (f?: File) => void; onClear: () => void }) {
  const [drag, setDrag] = useState(false);
  const inputId = `file-${idBase}`;

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files?.[0]); }}
      className="rounded-2xl border-2 border-dashed p-8 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-focus)]"
      style={{ borderColor: drag ? "var(--color-accent)" : "var(--color-border-interactive)", background: drag ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "var(--color-muted)", minHeight: 280 }}
    >
      {preview ? (
        <div className="w-full">
          <img src={preview} alt="Aperçu du visuel importé" className="mx-auto max-h-56 rounded-lg border border-border object-contain" />
          <div className="mt-3 flex justify-center gap-4">
            <TextLink htmlFor={inputId} size="sm">Remplacer le visuel</TextLink>
            <TextLink onClick={onClear} tone="muted" size="sm">Retirer</TextLink>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center gap-3" style={{ minHeight: 220 }}>
          <div className="grid h-11 w-11 place-items-center rounded-full bg-background text-muted-foreground"><UploadIcon /></div>
          <p className="text-[0.9375rem] font-semibold">Glissez-déposez votre visuel</p>
          <label htmlFor={inputId} className="cursor-pointer rounded-lg border px-3.5 py-2 text-[0.875rem] font-medium hover:bg-muted" style={{ borderColor: "var(--color-border-interactive)" }}>Parcourir les fichiers</label>
          <p className="text-[0.8125rem] text-muted-foreground">PNG, JPG, WebP</p>
        </div>
      )}
      <FileInput id={inputId} name={name} onFile={onFile} />
    </div>
  );
}
