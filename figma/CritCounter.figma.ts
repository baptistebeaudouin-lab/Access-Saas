// url=<DS>?node-id=5-101
// source=src/components/CritCounter.tsx
// component=CritCounter
import figma from 'figma'
const instance = figma.selectedInstance

const level = instance.getEnum('Niveau', { 'Bloquant': 'bloquant', 'Majeur': 'majeur', 'Mineur': 'mineur', 'À vérifier': 'warn' })
instance.getEnum('Actif', { 'Oui': true, 'Non': false })
const value = parseInt(instance.findText('Nombre').textContent, 10) || 0

export default {
  example: figma.code`<CritCounter level="${level}" value={${String(value)}} />`,
  imports: ['import { CritCounter } from "./components"'],
  id: 'crit-counter',
  metadata: { nestable: true },
}
