/**
 * Referred to as "TemplateType" on Chrome API Docs.
 * - `basic`: icon, title, message, expandedMessage, up to two buttons.
 * - `image`: icon, title, message, expandedMessage, image, up to two buttons.
 * - `list`: icon, title, message, items, up to two buttons. Users on Mac OS X only see the first items.
 * - `progress`: icon, title, message, progress, up to two buttons.
 *
 * See the [Chrome API Docs](https://developer.chrome.com/apps/notifications#type-TemplateType).
 *
 * @memberof notify
 * @typedef {('basic'|'image'|'list'|'progress')} NoteType -
 */

/**
 * Defines the notification action button.
 *
 * @memberof notify
 * @typedef {Object} NoteButton
 * @property {string} title Button title
 * @property {string} iconUrl Button icon url
 */

/**
 * Items for list notifications. Users on Mac OS X only see the first item.
 *
 * @memberof notify
 * @typedef {Object} NoteItem
 * @property {string} title Title of one item of a list notification.
 * @property {string} message Additional details about this item.
 */

/**
 * [Rich Notifications - Chrome Extensions API Docs](https://developer.chrome.com/extensions/richNotifications)
 *
 * See the [Chrome API Docs](https://developer.chrome.com/apps/notifications#type-NotificationOptions)
 *
 * @memberof notify
 * @typedef {Object} NoteOptions
 * @property {NoteType} [type]
 * @property {string} [iconUrl] A URL pointing to an icon to display in the notification. The URL can be: a data URL, a blob URL, a http or https URL, or the relative URL of a file within the extension.
 * @property {string} [title] Title of the notification
 * @property {string} [message] Main notification content
 * @property {string} [contextMessage] Alternate notification content with a lower-weight font.
 * @property {number} [priority] Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default.
 * @property {number} [eventTime]  A timestamp for the notification in milliseconds
 * @property {Array<NoteButton>} [buttons] Text and icons for up to two notification action buttons.
 * @property {Array<NoteItem>} [items] Items for multi-item notifications. Users on Mac OS X only see the first item.
 * @property {integer} [progress] An integer between 0 and 100, used to represent the current progress in a progress indicator.
 * @property {boolean} [requireInteraction] Indicates that the notification should remain visible on screen until the user activates or dismisses the notification.
 * @property {boolean} [silent] Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.
 */

/**
 * Creates a desktop notification.
 * See the [Chrome API Docs](https://developer.chrome.com/apps/notifications#method-create).
 *
 * @memberof notify
 * @function create
 *
 * @param {Object} details - Details of the notification to create.
 * @param {string} [details.id] - Identifier of the notification. If not set or empty an ID will automatically be generated.
 * @param {...NoteOptions} [details.options] - Contents of the notification.
 * @param {NoteType} details.options.type - Which type of notification to display.
 * @param {string} details.options.iconUrl - Which type of notification to display.
 * @param {string} details.options.title - Title of the notification (e.g. Sender name for email).
 * @param {string} details.options.message - Main notification content.
 * @returns {Promise<{id: {string:?string}}>} Resolves to an object with the notification id, as well as the original NotificationOptions properties.
 *
 * @example
 * notify
 *   .create({
 *     type: NoteType.basic,
 *     message: 'Something to say',
 *     buttons: [{ title: 'Click here!' }],
 *     iconUrl: 'icon.png',
 *     id: item.asin,
 *   })
 */
export const create = ({ id, ...options }) =>
  new Promise((resolve, reject) => {
    try {
      chrome.notifications.create(id, options, noteId => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve({ id: noteId, ...options })
        }
      })
    } catch (error) {
      reject(error)
    }
  })

/**
 * Wrapper for the chrome.notifications API. Use to create rich notifications using templates and show these notifications to users in the system tray.
 *
 * See the
 * [Chrome API Docs](https://developer.chrome.com/apps/notifications)
 * and
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications).
 *
 * @namespace notify
 */
export const notify = { create }
