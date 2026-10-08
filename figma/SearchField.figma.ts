// url=<DS>?node-id=7-94
// source=src/components/SearchField.tsx
// component=SearchField
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.findText('Valeur').textContent
instance.getEnum('État', { 'Défaut': null, 'Focus': null })

export default {
  example: figma.code`<SearchField id="recherche" label="Rechercher un critère" value={query} onChange={setQuery} placeholder="${placeholder}" />`,
  imports: ['import { SearchField } from "./components"'],
  id: 'search-field',
  metadata: { nestable: true },
}
