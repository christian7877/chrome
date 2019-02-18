/**
 * Store one or more items in the storage area, or update existing items.
 * When you store or update a value using this API, the onChanged event will fire.
 *
 * See the
 * [Chrome API Docs](https://developer.chrome.com/extensions/storage#method-StorageArea-set)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set).
 *
 * @memberof storageLocal
 * @function set
 * @param {Object} values - An object containing one or more key/value pairs to be stored in storage. If an item already exists, its value will be updated.
 * @returns {Promise} Resolves on success or rejects on failure.
 *
 * @example
 * // Save primitive values or Arrays to storage.
 * local.set({ email: 'sample@gmail.com' })
 *   .then(() => {
 *     console.log('The item "email" was set.')
 *   })
 *
 * @example
 * // Storage cannot save other types,
 * // such as Function, Date, RegExp, Set, Map, ArrayBuffer and so on.
 * local.set({ dogs: new Set(['Fluffy', 'Duke', 'Baby']) })
 *   .catch((error) => {
 *     console.log('There was a problem!')
 *   })
 *
 */
export const set = values => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(values, () => {
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
}

/**
 * Retrieves one or more items from the storage area.
 *
 * See the
 * [Chrome API Docs](https://developer.chrome.com/extensions/storage#method-StorageArea-get)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get).
 *
 * @memberof storageLocal
 * @function get
 * @param {string|Array<string>} keys - A string or array of key names to retrieve from storage. If keys is undefined, returns all items in storage.
 * @returns {Promise<Object>} Resolves with an object representing the values of the items or rejects on failure.
 *
 * @example
 * local.get('cats')
 *   .then(({cats}) => {
 *     console.log('Cats!', cats)
 *   })
 *
 * @example
 * local.get()
 *   .then((allItems) => {
 *     console.log('Every item in storage:', allItems)
 *   })
 *
 * @example
 * local.get(['cats', 'dogs'])
 *   .then(({cats, dogs}) => {
 *     console.log('Cats!', cats)
 *     console.log('Dogs!', dogs)
 *   })
 *
 */
export const get = keys => {
  return new Promise((resolve, reject) => {
    try {
      if (!keys || !keys.length) {
        chrome.storage.local.get(null, keyValueObj => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message)
          } else {
            resolve(keyValueObj)
          }
        })
      } else {
        chrome.storage.local.get(keys, keyValueObj => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message)
          } else {
            resolve(keyValueObj)
          }
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Removes all items from the storage area.
 *
 * See
 * [Chrome API Docs](https://developer.chrome.com/extensions/storage#method-StorageArea-clear)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/clear).
 *
 * @memberof storageLocal
 * @function clear
 * @returns {Promise} Resolves on success or rejects on failure.
 *
 * @example
 * local.clear()
 *   .then(() => {
 *     console.log('Storage was cleared.')
 *   })
 */
export const clear = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.clear(() => {
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
}

/**
 * Removes one or more items from the storage area.
 *
 * See the
 * [Chrome API Docs](https://developer.chrome.com/extensions/storage#method-StorageArea-remove)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/remove).
 *
 * @memberof storageLocal
 * @function remove
 * @param {string|Array<string>} keys - A string, or array of strings, representing the key(s) of the item(s) to be removed.
 * @returns {Promise} Resolves on success or rejects on failure.
 *
 * @example
 * local.remove('key')
 *   .then(() => {
 *     console.log('The property "key" was removed.')
 *   })
 *
 * @example
 * local.remove(['key', 'lock'])
 *   .then(() => {
 *     console.log('The property "key" was removed.')
 *     console.log('The property "lock" was removed.')
 *   })
 *
 *
 */
export const remove = keys => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(keys, () => {
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
}

/**
 * This is a wrapper for the local Chrome extension storage API.
 * Enables extensions to store and retrieve data, and listen for changes to stored items.
 *
 * See the [Chrome API Docs](https://developer.chrome.com/extensions/storage),
 * and [MDN storage](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage#Properties).
 *
 * @namespace
 */
export const storageLocal = {
  set,
  get,
  clear,
  remove,
}
