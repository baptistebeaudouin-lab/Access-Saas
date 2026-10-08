// url=<DS>?node-id=6-139
// source=src/components/FormatTabs.tsx
// component=FormatTabs
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const active = instance.getEnum('État', { 'Actif': true, 'Inactif': false, 'Focus': false })

export default {
  example: figma.code`{/* Onglet « ${label} »${active ? ' (actif)' : ''} : FormatTabs rend le groupe d'onglets complet */}
<FormatTabs tabs={tabs} selected={selected} onSelect={setSelected} />`,
  imports: ['import { FormatTabs } from "./components"'],
  id: 'format-tabs',
  metadata: { nestable: true },
}
