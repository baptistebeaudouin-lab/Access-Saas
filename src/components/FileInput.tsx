/** Champ fichier masqué partagé par Dropzone et CompactDropzone (pas de composant Figma dédié). */
export function FileInput({ id, name, onFile }: { id: string; name?: string; onFile: (f?: File) => void }) {
  return (
    <input id={id} type="file" accept="image/png,image/jpeg,image/webp,image/*" aria-label={name ? `Importer le visuel du format ${name}` : "Importer le visuel à tester"} className="peer sr-only" onChange={(e) => { onFile(e.target.files?.[0] ?? undefined); e.target.value = ""; }} />
  );
}
