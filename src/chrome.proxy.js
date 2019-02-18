/**
 * A ProxyConfig object's mode attribute determines the overall behavior of Chrome with regards to proxy usage.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#proxy_modes).
 *
 * - `direct` mode: all connections are created directly, without any proxy involved. This mode allows no further parameters in the ProxyConfig object.
 * - `auto_detect` mode: the proxy configuration is determined by a PAC script that can be downloaded at http://wpad/wpad.dat. This mode allows no further parameters in the ProxyConfig object.
 * - `pac_script` mode: the proxy configuration is determined by a PAC script that is either retrieved from the URL specified in the proxy.PacScript object or taken literally from the data element specified in the proxy.PacScript object. Besides this, this mode allows no further parameters in the ProxyConfig object.
 * - `fixed_servers` mode: the proxy configuration is codified in a proxy.ProxyRules object. Its structure is described in Proxy rules. Besides this, the fixed_servers mode allows no further parameters in the ProxyConfig object.
 * - `system` mode: the proxy configuration is taken from the operating system. This mode allows no further parameters in the ProxyConfig object. Note that the system mode is different from setting no proxy configuration. In the latter case, Chrome falls back to the system settings only if no command-line options influence the proxy configuration.
 *
 * @memberof proxy
 * @typedef {('direct'|'auto_detect'|'pac_script'|'fixed_servers'|'system')} ProxyMode
 */

/**
 * The connection to the proxy server uses the protocol defined in the scheme attribute.
 * If no scheme is specified, the proxy connection defaults to http.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#proxy_server_objects)
 *
 * - `http`.
 * - `https`.
 * - `quic`.
 * - `socks4`.
 * - `socks5`.
 *
 * @memberof proxy
 * @typedef {('http'|'https'|'quic'|'socks4'|'socks5')} ProxyScheme
 */

/**
 * The level of control available to the extension for the proxy setting.
 *
 * - `not_controllable`
 * - `controlled_by_other_extensions`
 * - `controllable_by_this_extension`
 * - `controlled_by_this_extension`
 *
 * @memberof proxy
 * @typedef {('not_controllable'|'controlled_by_other_extensions'|'controllable_by_this_extension'|'controlled_by_this_extension')} ProxyLevelOfControl
 *
 */

/**
 * Chrome distinguishes between three different scopes of browser settings.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/types#ChromeSetting-lifecycle)
 *
 * - `regular`: settings set in the regular scope apply to regular browser windows and are inherited by incognito windows if they are not overwritten. These settings are stored to disk and remain in place until they are cleared by the governing extension, or the governing extension is disabled or uninstalled.
 * - `regular_only`: settings set in the incognito_persistent scope apply only to incognito windows. For these, they override regular settings. These settings are stored to disk and remain in place until they are cleared by the governing extension, or the governing extension is disabled or uninstalled.
 * - `incognito_persistent`: settings set in the incognito_session_only scope apply only to incognito windows. For these, they override regular and incognito_persistent settings. These settings are not stored to disk and are cleared when the last incognito window is closed. They can only be set when at least one incognito window is open.
 * - `incognito_session_only`
 *
 * @memberof proxy
 * @typedef {('regular'|'regular_only'|'incognito_persistent'|'incognito_session_only')} ProxyScope
 *
 */

/**
 * A proxy server is configured in a proxy.ProxyServer object.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#type-ProxyServer)
 *
 * @memberof proxy
 * @typedef {Object} ProxyServer
 * @property {ProxyScheme} scheme The scheme (protocol) of the proxy server itself. Defaults to 'http'.
 * @property {string} host The URI of the proxy server. This must be an ASCII hostname (in Punycode format).
 * @property {string} port The port of the proxy server. Defaults to a port that depends on the scheme.
 */

/**
 * An object encapsulating the set of proxy rules for all protocols.
 * Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#type-ProxyRules)
 *
 * @memberof proxy
 * @typedef {Object} ProxyRules
 * @property {ProxyServer} singleProxy The proxy server to be used for all per-URL requests (that is http, https, and ftp).
 * @property {Mode} mode
 */

/**
 * An object encapsulating a complete proxy configuration.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#type-ProxyConfig)
 *
 * @memberof proxy
 * @typedef {Object} ProxyConfig
 * @property {ProxyRules} rules The proxy rules describing this configuration. Use this for 'fixed_servers' mode.
 * @property {Mode} mode
 */

/**
 * Create a valid ProxyServer. Params will be type coerced and trimmed.
 * The scheme will default to 'http' if none is specified.
 * The port will be derived from the scheme if it is not defined.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#type-ProxyServer).
 *
 * @memberof proxy
 * @function createProxyServer
 * @param {Object} details - Setting details
 * @param {string} details.host - The proxy server host ip. Will trim any leading or trailing whitespace.
 * @param {number} [details.port] - The proxy server port.
 * @param {ProxyScheme} [details.scheme] - The proxy server scheme.
 * @returns {ProxyServer} Valid proxy server object.
 *
 * @example
 * const server = createProxyServer({ host: '10.10.10.4' })
 *
 */
const createProxyServer = ({ host, port, scheme }) => {
  const server = {
    host: host.trim(),
  }
  if (port) {
    server.port = parseInt(port)
  }
  if (scheme) {
    server.scheme = scheme.trim()
  }
  return server
}

/**
 * Create a valid ProxyConfig.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#type-ProxyConfig.).
 *
 * @memberof proxy
 * @function createSingleProxyConfig
 * @param {Object} details - Setting details
 * @param {string} details.host - The proxy server host ip.
 * @param {number} [details.port] - The proxy server port.
 * @param {Array<string>} [details.bypassList] - List of websites to connect to without a proxy. [See the bypassList docs.](https://developer.chrome.com/extensions/proxy#bypass_list)
 * @returns {ProxyConfig} Returns an object encapsulating a complete proxy configuration.
 *
 * @example
 * const config = createSingleProxyConfig({host: '10.4.0.1'})
 *
 */
const createSingleProxyConfig = ({
  host,
  port,
  bypassList = [],
}) => ({
  mode: 'fixed_servers',
  rules: {
    singleProxy: createProxyServer({ host, port }),
    bypassList,
  },
})

/**
 * An object returned from proxy.get().
 * @memberof proxy
 * @typedef {Object} ProxySettings
 * @property {ProxyConfig} value The current ProxyConfig.
 * @property {ProxyLevelOfControl} levelOfControl The level of extension control over proxy settings.
 * @property {boolean} incognitoSpecific Whether the effective value is specific to the incognito session. This property will only be present if the incognito property in the details parameter of proxy.get() was true.
 */

/**
 * Get the current proxy settings.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#method-settings-get.).
 *
 * @memberof proxy
 * @function get
 * @param {Object} [details] - Setting details
 * @param {boolean} [details.incognito] - Whether to return the value that applies to the incognito session (default false).
 * @returns {Promise<ProxySettings>} The value of the proxy settings.
 *
 * @example
 * const proxySettingsPromise = proxy.get()
 *
 */
const get = ({ incognito = false } = {}) =>
  new Promise((resolve, reject) => {
    try {
      chrome.proxy.settings.get({ incognito }, settings => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        } else {
          resolve(settings)
        }
      })
    } catch (error) {
      reject(error)
    }
  })

/**
 * Sets the current proxy settings.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy#method-settings-set.).
 *
 * @memberof proxy
 * @function set
 * @param {Object} details - Setting details
 * @param {ProxyConfig} details.config - An object encapsulating a complete proxy configuration.
 * @param {ProxyScope} [details.scope] - One of the values from ProxyScope.
 * @returns {Promise} Resolves at the completion of the set operation. Rejects if there was an error.
 *
 * @example
 * proxy.set({ config: ProxyConfig }).then(() => {
 *   console.log('Now using your proxy settings.')
 * })
 *
 */
const set = ({ scope = 'regular', config }) =>
  new Promise((resolve, reject) => {
    try {
      chrome.proxy.settings.set({ value: config, scope }, () => {
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
 * Clears the current proxy settings and restores the default.
 *
 * @memberof proxy
 * @function clear
 * @param {Object} [details] - Setting details
 * @param {ProxyScope} [details.scope] - One of the values from ProxyScope.
 * @returns {Promise} Resolves after the default proxy settings have been restored. Rejects if there was an error.
 *
 * @example
 * proxy.clear().then(() => {
 *   console.log('Now using a direct connection.')
 * })
 *
 */
const clear = ({ scope = 'regular' } = {}) =>
  new Promise((resolve, reject) => {
    try {
      chrome.proxy.settings.clear({ scope }, () => {
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
 * Use the chrome.proxy API to manage Chrome's proxy settings.
 * See [Chrome API Docs](https://developer.chrome.com/extensions/proxy)
 *
 * @namespace
 */
export const proxy = {
  set,
  get,
  clear,
  createProxyServer,
  createSingleProxyConfig,
}
