import { EventPromise } from '@bumble/stream'

export const when = {
  onInstalled: () => EventPromise(chrome.runtime.onInstalled),
}
