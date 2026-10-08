// url=<DS>?node-id=9-116
// source=src/components/EmptyState.tsx
// component=EmptyState
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.findText('Titre').textContent
const desc = instance.findText('Description').textContent

export default {
  example: figma.code`<EmptyState title="${title}" desc="${desc}" />`,
  imports: ['import { EmptyState } from "./components"'],
  id: 'empty-state',
  metadata: { nestable: true },
}
