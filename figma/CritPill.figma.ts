// url=<DS>?node-id=5-39
// source=src/components/CritPill.tsx
// component=CritPill
import figma from 'figma'
const instance = figma.selectedInstance

const level = instance.getEnum('Niveau', { 'Bloquant': 'bloquant', 'Majeur': 'majeur', 'Mineur': 'mineur' })

export default {
  example: figma.code`<CritPill level="${level}" />`,
  imports: ['import { CritPill } from "./components"'],
  id: 'crit-pill',
  metadata: { nestable: true },
}
