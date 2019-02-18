import { BumbleStream } from '@bumble/stream'
import { isBackgroundPage } from './chrome.pages'

/**
 * Use to send messages between documents
 * (from background to content script, or vice-versa).
 *
 * @memberof message
 * @typedef {Object} Message
 * @property {string} greeting - A constant to identify the message type.
 * @property {number} [tabId] - Identifies the tab to send the message to.
 */

/**
 * Use to send message between scripts.
 * Can recognize the extension document context (background or content script).
 * Requires tabId property when sending from background page.
 *
 * @memberof message
 * @function send
 * @param {Message} message - A Message object with optional data properties.
 * @returns {Promise<Message>} Resolves if the other side responds.
 *
 * @example
 * message.send({
 *   greeting: 'hello',
 *   tabId: 1234, // Required if sending from background page.
 * })
 *   .then((response) => {
 *     console.log('They said:', response.greeting)
 *   })
 *
 */
export const send = message => {
  if (isBackgroundPage()) {
    const { tabId, ...msg } = message
    return sendToTab(tabId, msg)
  } else {
    return sendFromTab(message)
  }
}

/**
 * Send a message to the background script.
 * See [Chrome API](https://developer.chrome.com/extensions/runtime#method-sendMessage).
 * And
 * [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage).
 *
 * @memberof message
 * @function sendFromTab
 * @param {Message} message - A Message object with optional data properties.
 * @returns {Promise<Message>} Resolves if the other side responds.
 *
 * @example
 * message.sendFromTab({ greeting: 'hello' })
 *   .then((response) => {
 *     console.log('They said', response.greeting)
 *   })
 *
 */
export const sendFromTab = message =>
  new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else if (!response.success) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    } catch (err) {
      reject(err)
    }
  })

/**
 * Send a message from the background script to a tab.
 *
 * @memberof message
 * @function sendToTab
 * @param {Message} message - Must have a greeting and tabId property.
 * @returns {Promise<Message>} Resolves if the other side responds.
 *
 * @example
 * message.sendToTab({
 *   greeting: 'hello',
 *   tabId: 1234,
 * }).then((response) => {
 *   console.log('They said', response.greeting)
 * })
 */
export const sendToTab = ({ tabId, ...message }) =>
  new Promise((resolve, reject) => {
    try {
      chrome.tabs.sendMessage(tabId, message, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else if (!response.success) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    } catch (error) {
      reject(error)
    }
  })

/**
 * Listen for messages from other tabs/pages.
 *
 * The response Message object will be processed before it is sent:
 * - If there is no error, `message.success = true`.
 * - If there was an error, `message.success = false`
 *   and the error's message and stack will be assigned to the response object.
 * - If `response.greeting` is `undefined`,
 *   the original greeting will be assigned.
 *
 * @memberof message
 * @function listenForMessage
 * @param {boolean} [sendResponse = true] - If true, will send a response. Defaults to true.
 * @returns {BumbleStream} Returns the BumbleStream object.
 *   The final return value of the stream will be sent as a message response.
 *
 * @example
 * message.listenForMessage()
 *   .forEach(({greeting}) => {
 *     console.log('They said', greeting)
 *   })
 */
export const listenForMessage = (sendResponse = true) =>
  BumbleStream(callback => {
    async function asyncCallback(message, sender) {
      // Make sure the callback returns a Promise
      return callback(message, sender)
    }

    function handleMessage(message, sender, callback) {
      asyncCallback(message, sender)
        .then(result => ({
          success: true,
          ...result,
        }))
        .catch(reason => ({
          success: false,
          reason: reason.message || reason,
          stack: reason.stack || undefined,
        }))
        .then(msg => ({
          greeting: message.greeting,
          ...msg,
        }))
        .then(callback)

      return sendResponse
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    // Return a function to stop listening for the message
    return () =>
      chrome.runtime.onMessage.removeListener(handleMessage)
  })

/** @namespace */
export const message = {
  send,
  sendFromTab,
  sendToTab,
  listenForMessage,
}
