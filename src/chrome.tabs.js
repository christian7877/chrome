/**
 * See the Tab type in the [Chrome API Docs](https://developer.chrome.com/extensions/tabs#type-Tab).
 *
 * The type tabs.Tab contains information about a tab. This provides access to information about what content is in the tab, how large the content is, what special states or restrictions are in effect, and so forth.
 *
 * @memberof tabs
 * @typedef {Object} Tab
 * @property {integer} [id]
 * @property {integer} index The zero-based index of the tab within its window.
 * @property {integer} windowId The ID of the window that contains the tab.
 * @property {integer} [openerTabId] The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
 * @property {boolean} highlighted Whether the tab is highlighted.
 * @property {boolean} active Whether the tab is active in its window. Does not necessarily mean the window is focused.
 * @property {boolean} pinned Whether the tab is pinned.
 * @property {boolean} [audible] Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
 * @property {boolean} discarded Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
 * @property {boolean} autoDiscardable Whether the tab can be discarded automatically by the browser when resources are low.
 * @property {string} [url] The URL the tab is displaying.
 * @property {string} [title] The title of the tab.
 * @property {string} [favIconUrl] The URL of the tab's favicon. It may also be an empty string if the tab is loading.
 * @property {string} [status] Either loading or complete
 * @property {boolean} incognito Whether the tab is in an incognito window.
 * @property {integer} [width] The width of the tab in pixels.
 * @property {integer} [height] The height of the tab in pixels.
 * @property {string} [sessionId] The session ID used to uniquely identify a Tab obtained from the sessions API.
 *
 */

/**
 * See the [Chrome API Docs](https://developer.chrome.com/extensions/tabs#method-create)
 *
 * @memberof tabs
 * @typedef {Object} CreateProperties
 * @property {integer} [windowId] The window in which to create the new tab. Defaults to the current window.
 * @property {integer} [index] The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
 * @property {string} [url] The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., 'http://www.google.com', not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
 * @property {boolean} [active = true] Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true.
 * @property {boolean} [pinned] Whether the tab should be pinned. Defaults to false
 * @property {integer} [openerTabId] The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
 */

/**
 * Creates a new tab.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/tabs#method-create) and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create).
 *
 * @memberof tabs
 * @function create
 * @param {CreateProperties} [details] - An object with optional properties for the new tab.
 * @returns {Tab} The created tab.
 *
 * @example
 * tabs.create({
 *   url: 'http://www.google.com',
 * }).then((tab) => {
 *   console.log('The new tab id is:', tab.id)
 * })
 *
 * @example
 * tabs.create().then((tab) => {
 *   console.log('It is just a new active tab.')
 * })
 *
 */
export const create = details => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.create(details, tab => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(tab)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Given a tab ID, get the tab's details as a tabs.Tab object.
 * Without the "tabs" permission, will omit `url`, `title`, and `favIconUrl`.
 *
 * See [Chrome API Docs](https://developer.chrome.com/extensions/tabs#method-get) and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/get).
 *
 * @memberof tabs
 * @function get
 * @param {number} [$0.tabId] - ID of the tab to get.
 * @returns {Promise<Tab>} A Promise that will be fulfilled with a tabs.Tab object containing information about the tab.
 *
 * @example
 * tabs.get({ tabId: 12345 })
 *   .then((tab) => {
 *     console.log(tab.status)
 *   })
 *
 * @example
 * tabs.get({ tabId: 12345 })
 *   .then((tab) => {
 *     // Requires "tabs" permission
 *     console.log(tab.title)
 *   })
 *
 */
export const get = ({ tabId }) => {
  return new Promise((resolve, reject) => {
    try {
      if (!tabId) {
        reject('Invalid argument: tabId not specified')
      }

      chrome.tabs.get(tabId, tab => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(tab)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
 * Some queryInfo properties are ignored without the "tabs" permission.
 *
 * See [Chrome API Docs](https://developer.chrome.com/extensions/tabs#method-query) and [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query).
 *
 * @memberof tabs
 * @function query
 * @param {Object} [queryInfo] - Specified properties of tabs. See [Chrome queryInfo](https://developer.chrome.com/extensions/tabs#property-query-queryInfo).
 * @returns {Promise<Array<Tab>>} A Promise that will be fulfilled with an array of the queried tabs.Tab objects.
 *
 * @example
 * tabs.query({
 *   active: true,
 * }).then((tabs) => {
 *   console.log('All the active:', tabs)
 * })
 *
 * @example
 * tabs.query({
 *   // The url property requires the 'tabs' permission.
 *   url: 'https://*.google.com/*',
 * }).then((tabs) => {
 *   console.log('All the Google tabs:', tabs)
 * })
 *
 */
export const query = query => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(query, tabs => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(tabs)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/tabs#method-update)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update).
 *
 * @memberof tabs
 * @function update
 * @param {number} [$0.tabId] - Defaults to the selected tab of the current window.
 * @param {Object} ...[$0.updateProps] - Specified properties of tabs. See [Chrome updateProperties](https://developer.chrome.com/extensions/tabs#property-update-updateProperties).
 * @returns {Promise<Tab>} A Promise that will be fulfilled with a tabs.Tab object containing details about the updated tab.
 *
 * @example
 * tabs.update({
 *   tabId: 12345,
 *   url: 'http://www.google.com',
 * }).then((tab) => {
 *   console.log('The tab was updated.')
 * })
 *
 */
export const update = ({ tabId, ...updateProps }) => {
  return new Promise((resolve, reject) => {
    try {
      if (tabId) {
        chrome.tabs.update(tabId, updateProps, tab => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message)
          } else {
            resolve(tab)
          }
        })
      } else {
        reject('Tab not specified')
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Closes one or more tabs.
 *
 * See the
 * [Chrome API Docs](https://developer.chrome.com/extensions/tabs#method-remove)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/remove).
 *
 * @memberof tabs
 * @function close
 * @param {string|Array<string>} $0.tabId - The tab ID or list of tab IDs to close.
 * @returns {Promise} Resolves on success or rejects on failure with the reason.
 *
 * @example
 * tabs.close({ tabId: 12345 })
 *   .then(() => {
 *     console.log('The tab was closed.')
 *   })
 *
 * @example
 * tabs.close({ tabId: [12345, 67890] })
 *   .then(() => {
 *     console.log('Two tabs were closed.')
 *   })
 *
 */
export const close = ({ tabId }) => {
  return new Promise((resolve, reject) => {
    try {
      if (tabId) {
        chrome.tabs.remove(tabId, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message)
          } else {
            resolve()
          }
        })
      } else {
        reject('Tab not specified')
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Inject JavaScript code into a page. The script will execute in its own environment, but will share the DOM of the page.
 * This requires either a
 * [host permission](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/permissions#Host_permissions)
 * or the
 * [activeTab permission](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/permissions#activeTab_permission).
 * Either the `code` or `file` property must be set in the `details` param.
 *
 * See [programmatic injection in the Chrome API Docs](https://developer.chrome.com/extensions/content_scripts#pi).
 *
 * @memberof tabs
 * @function execute
 * @param {number} [$0.tabId] - The id of the tab to inject. Defaults to the active tab.
 * @param {string} [$0.code] - JavaScript or CSS code to inject.
 * @param {string} [$0.file] - The path to the JavaScript or CSS file to inject.
 * @param {string} ...[$0.details] - [Other optional details of the script to run.](https://developer.chrome.com/extensions/tabs#property-executeScript-details).
 * @returns {Promise<Array>} Resolves with an array of the results of the script in every injected frame.
 *
 * @example
 * tabs.execute({
 *   tabId: 12345,
 *   file: 'content-script.js',
 * }).then((tab) => {
 *   console.log('')
 * })
 */
export const execute = ({ tabId, ...details }) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.executeScript(tabId, details, results => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(results)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Wrapper for the chrome.tabs API. Use to interact with the browser's tab system.
 * You can use this API to create, modify, and rearrange tabs in the browser.
 *
 * See the
 * [Chrome API Docs](https://developer.chrome.com/extensions/tabs)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs).
 *
 * @namespace
 */
export const tabs = {
  create,
  get,
  query,
  update,
  close,
  execute,
}
