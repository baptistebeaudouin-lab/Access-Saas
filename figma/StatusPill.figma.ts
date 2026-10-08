// url=<DS>?node-id=5-27
// source=src/components/StatusPill.tsx
// component=StatusPill
import figma from 'figma'
const instance = figma.selectedInstance

const status = instance.getEnum('Statut', { 'Conforme': 'ok', 'À vérifier': 'warn', 'Non conforme': 'error', 'Non vérifiable': 'neutral' })
const text = instance.findText('Libellé')
const defaults = ['Conforme', 'À vérifier', 'Non conforme', 'Non vérifiable']
const label = text && text.textContent && !defaults.includes(text.textContent) ? text.textContent : null

export default {
  example: figma.code`<StatusPill status="${status}"${label ? figma.code` label="${label}"` : ''} />`,
  imports: ['import { StatusPill } from "./components"'],
  id: 'status-pill',
  metadata: { nestable: true },
}
