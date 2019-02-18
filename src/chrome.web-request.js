import { listenTo } from '@bumble/stream'

//  TODO: Debug and test.
/**
 * Set up a listener to handle the event webRequest.onAuthRequired.
 * Https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onAuthRequired.
 *
 * @memberof webRequest
 * @function handleOnAuthRequired
 *
 * @example
 * handleOnAuthRequired(
 *   { username, password },
 *   { urls: 'https://www.google.com/*' },
 * )
 *
 * @param {Object} credentials - Username and Password to give to server.
 * @param {Object} filter - RequestFilter object. The urls property is required: {urls: [urls]} See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/RequestFilter.
 * @param {Array<string>} extraInfoSpec - Possible values: 'blocking' or 'responseHeaders'. Https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onAuthRequired#addListener_syntax.
 */
const handleOnAuthRequired = (
  { username, password },
  filter,
  extraInfoSpec = ['blocking'],
) =>
  listenTo(chrome.webRequest.onAuthRequired, [
    filter,
    extraInfoSpec,
  ])
    // Check for error
    .map(() => {
      if (chrome.runtime.lastError) {
        new Error(chrome.runtime.lastError.message)
      }
    })
    // Return credentials
    .map(() => ({
      authCredentials: {
        username,
        password,
      },
    }))

/** @namespace */
export const webRequest = { handleOnAuthRequired }
