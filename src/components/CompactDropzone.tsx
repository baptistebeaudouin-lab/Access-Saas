import { useState } from "react";
import { FileInput } from "./FileInput";
import { UploadIcon } from "./icons";
import { StatusPill } from "./StatusPill";
import { TextLink } from "./TextLink";

/** Figma : Zone de dépôt compacte (un visuel par format). */
export function CompactDropzone({ idBase, label, preview, onFile, onClear, scale }: { idBase: string; label: string; preview?: string; onFile: (f?: File) => void; onClear: () => void; scale?: string | null }) {
  const [drag, setDrag] = useState(false);
  const inputId = `file-${idBase}`;

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files?.[0]); }}
        className="flex items-center gap-3 rounded-xl border-2 border-dashed p-2.5 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--color-focus)]"
        style={{ borderColor: drag ? "var(--color-accent)" : "var(--color-border-interactive)", background: drag ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "var(--color-muted)" }}
      >
        <label htmlFor={inputId} className="grid h-14 w-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg border bg-muted" style={{ borderColor: "var(--color-border-interactive)" }} aria-hidden="true">
          {preview ? <img src={preview} alt="" className="h-full w-full object-cover" /> : <span className="text-muted-foreground"><UploadIcon size={18} /></span>}
        </label>
        <div className="min-w-0 flex-1">
          <p className="truncate"><span className="font-mono text-[0.8125rem] font-medium">{label}</span></p>
          <div className="mt-0.5">
            {preview ? <StatusPill status="ok" label="Visuel importé" /> : <span className="text-[0.8125rem] text-muted-foreground">Glisser-déposer ou parcourir</span>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <TextLink htmlFor={inputId} size="sm" className="rounded-md px-2 py-1">{preview ? "Remplacer" : "Parcourir"}</TextLink>
          {preview && <button onClick={onClear} aria-label={`Retirer le visuel du format ${label}`} className="rounded-md px-1.5 py-1 text-muted-foreground hover:text-foreground">✕</button>}
        </div>
        <FileInput id={inputId} name={label} onFile={onFile} />
      </div>
      {scale && <p className="mt-1 font-mono text-[0.8125rem] text-muted-foreground">{scale}</p>}
    </div>
  );
}
