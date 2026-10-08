// url=<DS>?node-id=5-120
// source=src/components/Alert.tsx
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const status = instance.getEnum('Ton', { 'Avertissement': 'warn', 'Erreur': 'error', 'Succès': 'ok' })
const message = instance.findText('Message').textContent

export default {
  example: figma.code`<Alert status="${status}">${message}</Alert>`,
  imports: ['import { Alert } from "./components"'],
  id: 'alert',
  metadata: { nestable: true },
}
