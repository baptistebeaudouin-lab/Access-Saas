// url=<DS>?node-id=7-97
// source=src/components/NumberInput.tsx
// component=NumberInput
import figma from 'figma'
const instance = figma.selectedInstance

const value = instance.findText('Valeur').textContent

export default {
  example: figma.code`<NumberInput value="${value}" onChange={setValue} placeholder="L" />`,
  imports: ['import { NumberInput } from "./components"'],
  id: 'number-input',
  metadata: { nestable: true },
}
