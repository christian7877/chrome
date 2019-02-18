export const isBackgroundPage = () =>
  location.protocol === 'chrome-extension:' &&
  (location.pathname === '/_generated_background_page.html' ||
    location.pathname ===
      chrome.runtime.getManifest().background.page)

export const isContentScript = () =>
  location.protocol !== 'chrome-extension:'

export const isContextPage = () =>
  location.protocol === 'chrome-extension:' && !isBackgroundPage

/**
 * Opens the options page as defined in manifest.json.
 * See
 * [Chrome API Docs](https://developer.chrome.com/extensions/runtime#method-openOptionsPage)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/openOptionsPage).
 *
 * @memberof pages
 * @function openOptionsPage
 * @returns {Promise} Resolves after the option page opens.
 *
 * @example
 * options.open().then(() => {
 *   console.log('The options page is open.')
 * })
 *
 */
export const openOptionsPage = () =>
  new Promise((resolve, reject) => {
    try {
      chrome.runtime.openOptionsPage(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve()
        }
      })
    } catch (error) {
      reject(error)
    }
  })

/**
 * Retrieves the Window object for the background page running inside the current extension.
 * If the background page is unloaded, this will load the background page before resolving.
 *
 * See
 * [Chrome API Docs](https://developer.chrome.com/extensions/runtime#method-getBackgroundPage)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getBackgroundPage).
 *
 * @memberof pages
 * @function getBackgroundPage
 * @returns {Promise<Window>} A Promise that will be fulfilled with the Window object for the background page, if there is one.
 *
 * @example
 * getBackgroundPage().then((bgWindow) => {
 *   // The background page window.
 * })
 */
export const getBackgroundPage = () =>
  new Promise((resolve, reject) => {
    try {
      chrome.runtime.getBackgroundPage(w => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(w)
        }
      })
    } catch (error) {
      reject(error)
    }
  })

/** @namespace pages */
export const pages = {
  isBackgroundPage,
  isContentScript,
  isContextPage,
  openOptionsPage,
  getBackgroundPage,
}
