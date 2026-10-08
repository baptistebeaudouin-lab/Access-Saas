import { useEffect, useRef, useState } from "react";
import { STATUS } from "../status";
import type { MapPin } from "../types";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Pin } from "./Pin";

/** Visionneuse zoomable avec repères, utilisée par VisualMap et ZoomModal (pas de composant Figma dédié). */
export function MapViewer({ src, pins, active, onPick, height }: { src: string; pins: MapPin[]; active: string | null; onPick: (themeKey: string, id: string) => void; height: number | string }) {
  const [zoom, setZoom] = useState(1);
  const scRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const clamp = (z: number) => Math.min(4, Math.max(1, z));

  useEffect(() => {
    if (!active) return;
    const p = pins.find((x) => x.id === active);
    const sc = scRef.current, wrap = wrapRef.current;
    if (!p || !sc || !wrap) return;
    const x = (p.loc.x / 100) * wrap.offsetWidth;
    const y = (p.loc.y / 100) * wrap.offsetHeight;
    sc.scrollTo({ left: x - sc.clientWidth / 2, top: y - sc.clientHeight / 2, behavior: "smooth" });
  }, [active, zoom, pins]);

  return (
    <div className="flex min-h-0 flex-col" style={{ height }}>
      <div className="flex items-center justify-between gap-2 border-b border-border bg-card px-3 py-2">
        <span className="font-mono text-[0.8125rem] text-muted-foreground">Zoomez / faites défiler pour explorer</span>
        <div className="flex items-center gap-1">
          <IconButton label="Dézoomer" onClick={() => setZoom((z) => clamp(z / 1.4))} disabled={zoom <= 1}>−</IconButton>
          <span className="w-12 text-center font-mono text-[0.8125rem] tabular-nums">{Math.round(zoom * 100)}%</span>
          <IconButton label="Zoomer" onClick={() => setZoom((z) => clamp(z * 1.4))} disabled={zoom >= 4}>+</IconButton>
          <Button size="sm" onClick={() => setZoom(1)} className="ml-1">Ajuster</Button>
        </div>
      </div>
      <div ref={scRef} className="flex-1 overflow-auto bg-muted/40">
        <div ref={wrapRef} className="relative mx-auto" style={{ width: `${zoom * 100}%` }}>
          <img src={src} alt="Visuel analysé avec repérage des points d'attention" className="block w-full select-none" draggable={false} />
          {pins.map((p) => (
            <button key={p.id} onClick={() => onPick(p.themeKey, p.id)} title={`${p.n}. ${STATUS[p.status].label}`} aria-label={`Point ${p.n} — ${STATUS[p.status].label}`} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-110" style={{ left: `${p.loc.x}%`, top: `${p.loc.y}%` }}>
              <Pin number={p.n} status={p.status} active={active === p.id} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
