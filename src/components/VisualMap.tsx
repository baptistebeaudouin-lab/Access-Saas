import type { MapPin } from "../types";
import { Button } from "./Button";
import { ExpandIcon } from "./icons";
import { MapViewer } from "./MapViewer";

/** Figma : Carte cartographie (aperçu du visuel + repères, ouverture plein écran). */
export function VisualMap({ src, pins, active, onPick, onExpand }: { src?: string; pins: MapPin[]; active: string | null; onPick: (themeKey: string, id: string) => void; onExpand: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <h3 className="text-[0.8125rem] font-semibold">Cartographie du visuel</h3>
        {src && (
          <Button size="sm" icon={<ExpandIcon />} onClick={onExpand}>
            Plein écran
          </Button>
        )}
      </div>
      {src ? <MapViewer src={src} pins={pins} active={active} onPick={onPick} height={300} /> : <div className="grid place-items-center p-5 text-[0.8125rem] text-muted-foreground" style={{ minHeight: 200 }}>Aperçu indisponible</div>}
      {pins.length > 0 && (
        <p className="border-t border-border px-4 py-2 text-[0.8125rem] text-muted-foreground">
          {pins.length} point{pins.length > 1 ? "s" : ""} repéré{pins.length > 1 ? "s" : ""} · cliquez une pastille. Positions indicatives.
        </p>
      )}
    </div>
  );
}
