// url=<DS>?node-id=9-131
// source=src/components/DevReminders.tsx
// component=DevReminders
import figma from 'figma'
const instance = figma.selectedInstance

export default {
  example: figma.code`<DevReminders />`,
  imports: ['import { DevReminders } from "./components"'],
  id: 'dev-reminders',
  metadata: { nestable: true },
}
