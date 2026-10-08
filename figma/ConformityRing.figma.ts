// url=<DS>?node-id=8-30
// source=src/components/ConformityRing.tsx
// component=ConformityRing
import figma from 'figma'
const instance = figma.selectedInstance

const tone = instance.getEnum('Ton', { 'Non conforme': 'error', 'À vérifier': 'warn', 'Conforme': 'ok' })
const score = instance.findText('Pourcentage').textContent

export default {
  example: figma.code`<ConformityRing score={${score}} tone="${tone}" />`,
  imports: ['import { ConformityRing } from "./components"'],
  id: 'conformity-ring',
  metadata: { nestable: true },
}
