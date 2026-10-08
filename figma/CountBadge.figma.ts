// url=<DS>?node-id=5-52
// source=src/components/CountBadge.tsx
// component=CountBadge
import figma from 'figma'
const instance = figma.selectedInstance

const status = instance.getEnum('Statut', { 'Non conforme': 'error', 'À vérifier': 'warn', 'Conforme': 'ok' })
const text = instance.findText('Libellé')
const count = parseInt(text.textContent, 10) || 0

export default {
  example: figma.code`<CountBadge status="${status}" count={${String(count)}} />`,
  imports: ['import { CountBadge } from "./components"'],
  id: 'count-badge',
  metadata: { nestable: true },
}
