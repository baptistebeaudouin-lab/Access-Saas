import { useState } from "react";
import { CHANNELS, groupByDevice, type Channel, type FormatDef } from "../data";
import type { Dims, ImportMode, Session } from "../types";
import {
  Alert,
  Button,
  ChannelChip,
  CompactDropzone,
  CtaButton,
  CustomFormatChip,
  Dropzone,
  FormatChip,
  FormatGroup,
  Kicker,
  NoteBox,
  NumberInput,
  RadioCard,
  TextLink,
} from "../components";

/* ---------- 2 & 3. Config ---------- */

function scaleLabel(file: Dims | undefined, w: number, h: number): string | null {
  if (!file) return null;
  if (file.w === w && file.h === h) return null;
  const rx = file.w / w;
  const ry = file.h / h;
  const ratio = Math.abs(rx - ry) < 0.05 ? `×${(+rx.toFixed(2)).toString().replace(/\.?0+$/, "")}` : "non proportionnel";
  return `Fichier ${file.w}×${file.h} → format ${w}×${h} · échelle ${ratio}`;
}

export function Config({
  session,
  formats,
  onCancel,
  onLaunch,
}: {
  session: Session;
  formats: FormatDef[];
  onCancel: () => void;
  onLaunch: (s: Session) => void;
}) {
  const [channels, setChannels] = useState<Channel[]>(session.channels);
  const [selected, setSelected] = useState<string[]>(session.formats);
  const [customs, setCustoms] = useState<FormatDef[]>([]);
  const [importMode, setImportMode] = useState<ImportMode>(session.importMode);
  const [previews, setPreviews] = useState<Record<string, string>>(session.previews);
  const [fileDims, setFileDims] = useState<Record<string, Dims>>(session.fileDims);
  const [customW, setCustomW] = useState("");
  const [customH, setCustomH] = useState("");

  const isCrea = session.kind === "crea";
  const showFormats = isCrea && channels.includes("Bannière-Display");
  const allFormats = [...formats, ...customs];
  const perFormat = showFormats && selected.length > 0 && importMode === "per-format";

  function toggleChannel(c: Channel) {
    setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }
  function deselectFormat(id: string) {
    setSelected((prev) => prev.filter((x) => x !== id));
    clearPreview(id);
  }
  function toggleFormat(id: string) {
    if (selected.includes(id)) deselectFormat(id);
    else setSelected((prev) => [...prev, id]);
  }
  const [fileError, setFileError] = useState<string | null>(null);
  function setPreview(key: string, f?: File) {
    if (!f) return;
    if (!f.type.startsWith("image/")) { setFileError(`« ${f.name} » n'est pas une image. Formats acceptés : PNG, JPG, WebP.`); return; }
    setFileError(null);
    const url = URL.createObjectURL(f);
    setPreviews((prev) => { if (prev[key]) URL.revokeObjectURL(prev[key]); return { ...prev, [key]: url }; });
    const img = new Image();
    img.onload = () => setFileDims((d) => ({ ...d, [key]: { w: img.naturalWidth, h: img.naturalHeight } }));
    img.src = url;
  }
  function clearPreview(key: string) {
    const url = previews[key];
    if (url) URL.revokeObjectURL(url);
    setPreviews((prev) => { const n = { ...prev }; delete n[key]; return n; });
    setFileDims((d) => { const n = { ...d }; delete n[key]; return n; });
  }
  function addCustomFormat() {
    const w = +customW, h = +customH;
    const id = `custom-${w}x${h}`;
    const def: FormatDef = { id, name: `custom_${w}x${h}`, label: `Personnalisé ${w}×${h}`, w, h, device: "Desktop", channel: "Bannière-Display" };
    setCustoms((prev) => (prev.some((c) => c.id === id) ? prev : [...prev, def]));
    setSelected((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setCustomW(""); setCustomH("");
  }

  const uploadedCount = perFormat ? selected.filter((f) => previews[f]).length : previews.main ? 1 : 0;
  const canLaunch = uploadedCount > 0 && (!isCrea || channels.length > 0);

  function launch() {
    const defs: Record<string, { label: string; w: number; h: number }> = {};
    allFormats.forEach((f) => { defs[f.id] = { label: f.label, w: f.w, h: f.h }; });
    onLaunch({ ...session, channels, formats: selected, formatDefs: defs, importMode, previews, fileDims });
  }

  return (
    <div className="a11y-fade">
      <TextLink onClick={onCancel} tone="muted" className="mb-5">← Retour</TextLink>
      <Kicker>{isCrea ? "Test créa digitale" : "Test maquette de page web"}</Kicker>
      <h1 className="text-[1.875rem] font-bold tracking-tight">
        {isCrea ? "Configurer l'analyse de la créa" : "Importer la maquette à analyser"}
      </h1>
      {!isCrea && (
        <p className="mt-2 max-w-xl text-[0.9063rem] leading-relaxed text-muted-foreground">
          Analyse de surface, sans code. A11Y Check évalue ce qui est visible sur le visuel :
          contrastes, contenus, images et repères de structure.
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Import */}
        <section aria-labelledby="import-title">
          <h2 id="import-title" className="mb-2.5 text-[0.8438rem] font-semibold">
            {perFormat ? "Visuels par format" : "Visuel à tester"}
            {perFormat && (
              <span className="ml-2 font-mono text-[0.8125rem] font-normal text-muted-foreground">
                {uploadedCount}/{selected.length} importé{uploadedCount > 1 ? "s" : ""}
              </span>
            )}
          </h2>
          <div aria-live="polite">
            {fileError && (
              <Alert status="error" size="sm" className="mb-2.5">{fileError}</Alert>
            )}
          </div>

          {perFormat ? (
            <div className="space-y-2.5">
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                Chaque format déclinant un visuel différent, importez la création correspondant à chaque taille.
              </p>
              {selected.map((id) => {
                const def = allFormats.find((f) => f.id === id);
                return (
                  <CompactDropzone
                    key={id}
                    idBase={id}
                    label={def?.label ?? id}
                    preview={previews[id]}
                    onFile={(f) => setPreview(id, f)}
                    onClear={() => clearPreview(id)}
                    scale={def ? scaleLabel(fileDims[id], def.w, def.h) : null}
                  />
                );
              })}
            </div>
          ) : (
            <Dropzone
              idBase="main"
              preview={previews.main}
              onFile={(f) => setPreview("main", f)}
              onClear={() => clearPreview("main")}
            />
          )}
        </section>

        {/* Paramètres */}
        <section aria-labelledby="params-title">
          <h2 id="params-title" className="sr-only">Paramètres du test</h2>
          {isCrea ? (
            <>
              <fieldset>
                <legend className="mb-2.5 text-[0.8438rem] font-semibold">Canal de diffusion</legend>
                <div className="flex flex-wrap gap-2">
                  {CHANNELS.map((c) => (
                    <ChannelChip key={c} label={c} checked={channels.includes(c)} onToggle={() => toggleChannel(c)} />
                  ))}
                </div>
                <p className="mt-2 text-[0.8125rem] text-muted-foreground">Sélection multiple possible.</p>
              </fieldset>
            </>
          ) : (
            <NoteBox>
              Certains critères (structure du code, navigation clavier) ne sont pas observables sur un visuel.
              Ils ne sont pas notés comme résultats de test, mais listés dans les
              <span className="font-semibold text-foreground"> rappels pour le développement</span>.
            </NoteBox>
          )}

          {showFormats && (
            <div className="mt-6 a11y-fade">
              <fieldset>
                <legend className="mb-2.5 text-[0.8438rem] font-semibold">Formats à tester</legend>
                <div className="space-y-4 rounded-xl border border-border p-4">
                  {groupByDevice(allFormats).map((g) => (
                    <FormatGroup key={g.device} title={g.device}>
                      <div className="flex flex-wrap gap-2">
                        {g.formats.map((f) => (
                          <FormatChip key={f.id} label={f.label} checked={selected.includes(f.id)} onToggle={() => toggleFormat(f.id)} />
                        ))}
                      </div>
                    </FormatGroup>
                  ))}
                  <FormatGroup title="Format personnalisé">
                    <div className="flex items-center gap-2">
                      <label className="sr-only" htmlFor="cw">Largeur</label>
                      <NumberInput id="cw" value={customW} onChange={setCustomW} placeholder="L" />
                      <span className="text-muted-foreground" aria-hidden="true">×</span>
                      <label className="sr-only" htmlFor="ch">Hauteur</label>
                      <NumberInput id="ch" value={customH} onChange={setCustomH} placeholder="H" />
                      <span className="text-[0.8125rem] text-muted-foreground">px</span>
                      <Button size="sm" disabled={!(+customW > 0 && +customH > 0)} onClick={addCustomFormat}>
                        Ajouter
                      </Button>
                    </div>
                    {customs.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {customs.map((c) => (
                          <CustomFormatChip key={c.id} w={c.w} h={c.h} onRemove={() => { setCustoms((prev) => prev.filter((x) => x.id !== c.id)); deselectFormat(c.id); }} />
                        ))}
                      </div>
                    )}
                  </FormatGroup>
                </div>
              </fieldset>

              {selected.length > 0 && (
                <fieldset className="mt-4">
                  <legend className="mb-2 text-[0.8438rem] font-semibold">Mode d'import</legend>
                  <div className="space-y-1.5">
                    {([["single", "Un visuel unique décliné sur plusieurs formats"], ["per-format", "Un visuel différent par format"]] as [ImportMode, string][]).map(([m, label]) => (
                      <RadioCard key={m} name="importmode" checked={importMode === m} onChange={() => setImportMode(m)}>
                        {label}
                      </RadioCard>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          )}

          <CtaButton disabled={!canLaunch} onClick={launch} className="mt-7">
            Lancer l'analyse
          </CtaButton>
          {!canLaunch && (
            <p aria-live="polite" className="mt-2 text-center text-[0.8125rem] text-muted-foreground">
              {uploadedCount === 0 ? (perFormat ? "Importez au moins un visuel de format." : "Importez un visuel pour continuer.") : "Sélectionnez au moins un canal."}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
