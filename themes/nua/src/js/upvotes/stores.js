import { writable, derived } from 'svelte/store'

export const records = writable([])

export const record = derived(records, $records => {
  return $records.find((rec) => rec.url === document.location.pathname)
})
