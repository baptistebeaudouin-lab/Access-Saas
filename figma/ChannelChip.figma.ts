// url=<DS>?node-id=7-36
// source=src/components/ChannelChip.tsx
// component=ChannelChip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Libellé')
const checked = instance.getEnum('Sélectionné', { 'Oui': true, 'Non': false })
instance.getEnum('État', { 'Défaut': null, 'Focus': null })

export default {
  example: figma.code`<ChannelChip label="${label}" checked={${checked ? 'true' : 'false'}} onToggle={onToggle} />`,
  imports: ['import { ChannelChip } from "./components"'],
  id: 'channel-chip',
  metadata: { nestable: true },
}
