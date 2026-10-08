// url=<DS>?node-id=9-47
// source=src/components/HistoryRow.tsx
// component=HistoryRow
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<HistoryRow entry={entry} />`,
  imports: ['import { HistoryRow } from "./components"'],
  id: 'history-row',
  metadata: { nestable: true },
}
