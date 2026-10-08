// url=<DS>?node-id=8-139
// source=src/components/FindingRow.tsx
// component=FindingRow
import figma from 'figma'
const instance = figma.selectedInstance

instance.getEnum('Statut', { 'Non conforme': null, 'À vérifier': null })
const active = instance.getEnum('Actif', { 'Oui': true, 'Non': false })

export default {
  example: figma.code`<FindingRow item={item} id={item.id} number={numbers[item.id]} active={${active ? 'true' : 'false'}} onPick={onPick} />`,
  imports: ['import { FindingRow } from "./components"'],
  id: 'finding-row',
  metadata: { nestable: true },
}
