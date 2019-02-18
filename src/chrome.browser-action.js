/**
 * Set the badge text for the browser action.
 * Omit the details object to clear text.
 * See the [Chrome API Docs](https://developer.chrome.com/extensions/browserAction#method-setBadgeText)
 * and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setBadgeText).
 *
 * @memberof browserAction
 * @function setBadgeText
 * @param {Object} details - Badge text options.
 * @param {string|false} details.text - The text to set on the browser action badge.
 * @param {number} [details.tabId] - Set the badge text only for the given tab. The text is reset when the user navigates this tab to a new page.
 * @returns {Promise} Resolves after badgetext has been set. Rejects if there was an error.
 *
 * @example
 * browserAction.setBadgeText({ text: 'something' })
 *
 */
const setBadgeText = ({ text, tabId } = { text: '' }) =>
  new Promise((resolve, reject) => {
    try {
      chrome.browserAction.setBadgeText(
        { text: text === false ? '' : text, tabId },
        () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message)
          } else {
            resolve()
          }
        },
      )
    } catch (error) {
      reject(error)
    }
  })

/**
 * Set the badge background color for the browser action.
 * See the [Chrome API Docs](https://developer.chrome.com/extensions/browserAction#method-setBadgeBackgroundColor)
 * and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setBadgeBackgroundColor).
 *
 * @memberof browserAction
 * @function setBadgeColor
 * @param {Object} details - Badge text options.
 * @param {string} details.color - The hex value of the background color for the badge.
 * @param {number} [details.tabId] - Set the badge color only for the given tab.
 * @returns {Promise} Resolves after badge background color has been set. Rejects if there was an error.
 *
 * @example
 * // Bulma Red
 * browserAction.setBadgeColor({ color: '#FF3860' })
 * // Bulma Orange
 * browserAction.setBadgeColor({ color: '#FF470F' })
 * // Default - Bulma Blue
 * browserAction.setBadgeColor()
 *
 */
const setBadgeColor = (details = { color: '#209CEE' }) =>
  new Promise((resolve, reject) => {
    try {
      chrome.browserAction.setBadgeBackgroundColor(
        details,
        () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message)
          } else {
            resolve()
          }
        },
      )
    } catch (error) {
      reject(error)
    }
  })

/**
 * Set the tooltip text for the browser action.
 * Omit the details object to use the extension name.
 * See the [Chrome API Docs](https://developer.chrome.com/extensions/browserAction#method-setTitle)
 * and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setTitle).
 *
 * @memberof browserAction
 * @function setTitle
 * @param {Object} [details] - Title text options.
 * @param {string|null} [details.title = null] - The text to set on the browser action title.
 * @param {number} [details.tabId] - Set the title text only for the given tab. The text is reset when the user navigates this tab to a new page.
 * @param {number} [details.windowId] - Set the title text only for the given window.
 * @returns {Promise} Resolves after title has been set. Rejects if there was an error.
 *
 * @example
 * browserAction.setTitle({ title: 'something' })
 *
 */
const setTitle = (details = { title: null }) =>
  new Promise((resolve, reject) => {
    try {
      chrome.browserAction.setTitle(details, () => {
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
 * Set the icon for the browser action.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/browserAction#method-setIcon)
 * and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setIcon).
 *
 * @memberof browserAction
 * @function setIcon
 * @param {Object} details - Object: {path:string, tabId(optional)}.
 * @returns {Promise} Resolves after icon has been set.
 *
 * @example
 * browserAction.setIcon({path: 'icon-16.png'})
 * */
const setIcon = details =>
  new Promise((resolve, reject) => {
    try {
      chrome.browserAction.setIcon(details, () => {
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

// /**
//  * Disable or enable the browser action for a tab or overall.
//  * See [Chrome API Docs](https://developer.chrome.com/extensions/browserAction#method-setIcon)
//  * and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setIcon).
//  *
//  * @memberof browserAction
//  * @function setIcon
//  * @param {Object} [details] - Default disables globally
//  * @param {bool|number} [details.disable] - Boolean to disable globally, or tabId to set for a single tab.
//  * @param {bool|number} [details.enable] - Boolean to enable globally, or tabId to set for a single tab.
//  * @returns {Promise} Resolves after the operation is complete. Rejects upon failure.
//  *
//  * @example
//  * browserAction.setIcon({path: 'icon-16.png'})
//  * */
// const setDisabled = ({ disable = true, enable } = {}) =>
//   new Promise((resolve, reject) => {
//     try {
//       if (disable !== undefined) {
//         chrome.browserAction.disable(() => {
//           if (chrome.runtime.lastError) {
//             reject(chrome.runtime.lastError.message)
//           } else {
//             resolve()
//           }
//         })
//       }
//     } catch (error) {
//       reject(error)
//     }
//   })

/**
 * Set multiple browser action properties at once.
 *
 * Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar.
 * In addition to its icon, a browser action can have a tooltip, a badge, and a popup.
 *
 * See the [Chrome API docs](https://developer.chrome.com/extensions/browserAction)
 * and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction).
 *
 * @function browserAction
 * @param {Object} details - Browser action properties to set.
 * @returns {Promise} Resolves after all properties are set, rejects with reason if a property was not set.
 *
 * @todo Implement badgeColor
 * @todo Implement title
 * @todo Implement popup
 *
 * @example
 * browserAction({
 *   badgeText: 'something',
 *   icon: 'icon2.png',
 *   // badgeColor: '#666',
 *   // title: 'browser action!',
 *   // popup: 'popup.html',
 * }).then(() => {
 *   console.log('All the browser action properties were set.')
 * }).catch((error) => {
 *   console.error('Could not set a browser action property.')
 * })
 *
 * @example
 * browserAction.set({
 *   superGalactic: true,
 * }).catch((error) => {
 *   console.error('Invalid argument: Unrecognized browser action property.')
 * })
 */
const setAll = details =>
  Promise.all(
    Object.entries(details).map(([key, value]) => {
      switch (key) {
        case 'icon':
          return setIcon({ path: value })
        case 'title':
          return setTitle({ title: value })
        case 'badgeText':
          return setBadgeText({ text: value })
        case 'badgeColor':
          return setBadgeColor({ color: value })
        default:
          return Promise.reject(
            new TypeError(
              'Invalid argument: Unrecognized browser action property:' +
                key,
            ),
          )
      }
    }),
  )

export const browserAction = setAll

Object.assign(browserAction, {
  set: setAll,
  setBadgeText,
  setBadgeColor,
  setIcon,
  setTitle,
})
