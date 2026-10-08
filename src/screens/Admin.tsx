import { useState } from "react";
import type { FormatDef } from "../data";
import { FormatForm, FormatTable, Kicker } from "../components";

/* ---------- Bibliothèque de formats (admin) ---------- */

const EMPTY_FORMAT: FormatDef = { id: "", name: "", label: "", w: 0, h: 0, device: "Desktop", channel: "Bannière-Display" };

export function Admin({ formats, setFormats }: { formats: FormatDef[]; setFormats: (f: FormatDef[]) => void }) {
  const [draft, setDraft] = useState<FormatDef>(EMPTY_FORMAT);
  const [editId, setEditId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  function save() {
    const missing = [!draft.name.trim() && "nom technique", !draft.label.trim() && "libellé", !draft.w && "largeur", !draft.h && "hauteur"].filter(Boolean);
    if (missing.length) { setError(`Champ${missing.length > 1 ? "s" : ""} obligatoire${missing.length > 1 ? "s" : ""} : ${missing.join(", ")}.`); return; }
    if (formats.some((f) => f.id !== editId && f.label.trim().toLowerCase() === draft.label.trim().toLowerCase())) { setError("Ce libellé existe déjà : il doit être unique."); return; }
    setError(null);
    if (editId) setFormats(formats.map((f) => (f.id === editId ? { ...draft, id: editId } : f)));
    else setFormats([...formats, { ...draft, id: `fmt-${draft.w}-${draft.h}-${Date.now()}` }]);
    setDraft(EMPTY_FORMAT); setEditId(null);
  }
  function remove(f: FormatDef) {
    if (window.confirm(`Supprimer le format « ${f.label} » ?`)) { setFormats(formats.filter((x) => x.id !== f.id)); if (editId === f.id) { setDraft(EMPTY_FORMAT); setEditId(null); } }
  }

  return (
    <div className="a11y-fade">
      <Kicker>Paramètres · Bibliothèque de formats</Kicker>
      <h1 className="text-[1.875rem] font-bold tracking-tight">Formats Display</h1>
      <p className="mt-2 max-w-xl text-[0.9063rem] text-muted-foreground">Ces formats alimentent la sélection lors de la configuration d'un test Bannière-Display.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FormatTable formats={formats} onEdit={(f) => { setDraft(f); setEditId(f.id); }} onDelete={remove} />
        <FormatForm
          draft={draft}
          onChange={setDraft}
          editing={!!editId}
          error={error}
          onSave={save}
          onCancel={() => { setDraft(EMPTY_FORMAT); setEditId(null); setError(null); }}
        />
      </div>
    </div>
  );
}
