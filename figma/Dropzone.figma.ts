// url=<DS>?node-id=7-151
// source=src/components/Dropzone.tsx
// component=Dropzone
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('État', { 'Vide': 'empty', 'Glisser': 'empty', 'Rempli': 'filled', 'Erreur': 'empty' })

export default {
  example: figma.code`<Dropzone idBase="visuel"${state === 'filled' ? ' preview={previewUrl}' : ''} onFile={onFile} onClear={onClear} />`,
  imports: ['import { Dropzone } from "./components"'],
  id: 'dropzone',
  metadata: { nestable: true },
}
