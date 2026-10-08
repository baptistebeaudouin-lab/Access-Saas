// url=<DS>?node-id=9-124
// source=src/components/NoteBox.tsx
// component=NoteBox
import figma from 'figma'
const instance = figma.selectedInstance

const message = instance.findText('Message').textContent

export default {
  example: figma.code`<NoteBox>${message}</NoteBox>`,
  imports: ['import { NoteBox } from "./components"'],
  id: 'note-box',
  metadata: { nestable: true },
}
