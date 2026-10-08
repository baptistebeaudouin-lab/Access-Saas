import type { FormatDef } from "../data";
import { Button } from "./Button";

/** Figma : Ligne de tableau — tableau de la bibliothèque de formats. */
export function FormatTable({ formats, onEdit, onDelete }: { formats: FormatDef[]; onEdit: (f: FormatDef) => void; onDelete: (f: FormatDef) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-[0.875rem]">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            <th className="px-3 py-2 font-semibold">Libellé</th>
            <th className="px-3 py-2 font-semibold">Dimensions</th>
            <th className="px-3 py-2 font-semibold">Device</th>
            <th className="px-3 py-2 font-semibold"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {formats.map((f) => (
            <tr key={f.id} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2">
                <div className="font-medium">{f.label}</div>
                <div className="font-mono text-[0.8125rem] text-muted-foreground">{f.name}</div>
              </td>
              <td className="px-3 py-2 font-mono text-[0.8125rem]">{f.w}×{f.h}</td>
              <td className="px-3 py-2">{f.device}</td>
              <td className="px-3 py-2 text-right">
                <Button size="sm" onClick={() => onEdit(f)} className="mr-1">Modifier</Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(f)} aria-label={`Supprimer ${f.label}`}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
