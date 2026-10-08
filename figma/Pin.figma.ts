// url=<DS>?node-id=5-135
// source=src/components/Pin.tsx
// component=Pin
import figma from 'figma'
const instance = figma.selectedInstance

const status = instance.getEnum('Statut', { 'Non conforme': 'error', 'À vérifier': 'warn', 'Conforme': 'ok' })
const active = instance.getEnum('Actif', { 'Oui': true, 'Non': false })
const number = instance.findText('Numéro').textContent

export default {
  example: figma.code`<Pin status="${status}" number={${number}}${active ? ' active' : ''} />`,
  imports: ['import { Pin } from "./components"'],
  id: 'pin',
  metadata: { nestable: true },
}
