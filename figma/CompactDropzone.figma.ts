// url=<DS>?node-id=7-183
// source=src/components/CompactDropzone.tsx
// component=CompactDropzone
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Format')
const imported = instance.getEnum('État', { 'Vide': false, 'Importé': true })

export default {
  example: figma.code`<CompactDropzone idBase="${label}" label="${label}"${imported ? ' preview={previewUrl} scale={scale}' : ''} onFile={onFile} onClear={onClear} />`,
  imports: ['import { CompactDropzone } from "./components"'],
  id: 'compact-dropzone',
  metadata: { nestable: true },
}
