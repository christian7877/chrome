// Must export directly
// Don't use import * ... It breaks tree-shaking

/* ============================================ */
/*               BUMBLE CHROME API              */
/* ============================================ */
export { browserAction } from './chrome.browser-action'
export { contextMenu } from './chrome.context-menu'
export { message } from './chrome.message'
export { notify } from './chrome.notify'
export { pages } from './chrome.pages'
export { proxy } from './chrome.proxy'
export { storageLocal } from './chrome.storage.local'
export { storageSync } from './chrome.storage.sync'
export { tabs } from './chrome.tabs'
export { when } from './chrome.event-promises'
