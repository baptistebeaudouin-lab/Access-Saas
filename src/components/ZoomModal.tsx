import { useEffect, useRef } from "react";
import { STATUS } from "../status";
import type { MapPin } from "../types";
import { Button } from "./Button";
import { MapViewer } from "./MapViewer";
import { Pin } from "./Pin";

/** Figma : Modale cartographie (dialogue modal : focus initial, piège Tab, Échap, retour du focus). */
export function ZoomModal({ src, pins, active, onPick, onClose, title }: { src: string; pins: MapPin[]; active: string | null; onPick: (t: string, id: string) => void; onClose: () => void; title: string }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (f.length === 0) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus(); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70 p-4 sm:p-8" onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="zoom-title" className="mx-auto flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <h2 id="zoom-title" className="text-[0.9375rem] font-semibold">Cartographie du visuel</h2>
            <p className="font-mono text-[0.8125rem] text-muted-foreground">{title} · {pins.length} point{pins.length > 1 ? "s" : ""} repéré{pins.length > 1 ? "s" : ""}</p>
          </div>
          <Button ref={closeRef} onClick={onClose}>Fermer ✕</Button>
        </div>
        <div className="min-h-0 flex-1"><MapViewer src={src} pins={pins} active={active} onPick={onPick} height="100%" /></div>
        {pins.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 border-t border-border px-4 py-2.5">
            <span className="mr-1 text-[0.8125rem] text-muted-foreground">Aller à :</span>
            {pins.map((p) => (
              <button key={p.id} onClick={() => onPick(p.themeKey, p.id)} className="rounded-full transition-transform hover:scale-110" aria-label={`Point ${p.n} — ${STATUS[p.status].label}`}>
                <Pin number={p.n} status={p.status} active={active === p.id} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
