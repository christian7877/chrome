<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## Chrome API with Promises

Make Chrome extensions easier with Promise based API options.


## browserAction

Set multiple browser action properties at once.

Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar.
In addition to its icon, a browser action can have a tooltip, a badge, and a popup.

See the [Chrome API docs][1]
and [MDN][2].

### Parameters

-   `details` **[Object][3]** Browser action properties to set.

### Examples

```javascript
browserAction({
  badgeText: 'something',
  icon: 'icon2.png',
  // badgeColor: '#666',
  // title: 'browser action!',
  // popup: 'popup.html',
}).then(() => {
  console.log('All the browser action properties were set.')
}).catch((error) => {
  console.error('Could not set a browser action property.')
})
```

```javascript
browserAction.set({
  superGalactic: true,
}).catch((error) => {
  console.error('Invalid argument: Unrecognized browser action property.')
})
```

Returns **[Promise][4]** Resolves after all properties are set, rejects with reason if a property was not set.

### setBadgeText

Set the badge text for the browser action.
Omit the details object to clear text.
See the [Chrome API Docs][5]
and [MDN][6].

#### Parameters

-   `details` **[Object][3]** Badge text options.
    -   `details.text` **([string][7] \| `false`)** The text to set on the browser action badge.
    -   `details.tabId` **[number][8]?** Set the badge text only for the given tab. The text is reset when the user navigates this tab to a new page.

#### Examples

```javascript
browserAction.setBadgeText({ text: 'something' })
```

Returns **[Promise][4]** Resolves after badgetext has been set. Rejects if there was an error.

### setBadgeColor

Set the badge background color for the browser action.
See the [Chrome API Docs][9]
and [MDN][10].

#### Parameters

-   `details` **[Object][3]** Badge text options.
    -   `details.color` **[string][7]** The hex value of the background color for the badge.
    -   `details.tabId` **[number][8]?** Set the badge color only for the given tab.

#### Examples

```javascript
// Bulma Red
browserAction.setBadgeColor({ color: '#FF3860' })
// Bulma Orange
browserAction.setBadgeColor({ color: '#FF470F' })
// Default - Bulma Blue
browserAction.setBadgeColor()
```

Returns **[Promise][4]** Resolves after badge background color has been set. Rejects if there was an error.

### setTitle

Set the tooltip text for the browser action.
Omit the details object to use the extension name.
See the [Chrome API Docs][11]
and [MDN][12].

#### Parameters

-   `details` **[Object][3]?** Title text options.
    -   `details.title` **([string][7] | null)** The text to set on the browser action title. (optional, default `null`)
    -   `details.tabId` **[number][8]?** Set the title text only for the given tab. The text is reset when the user navigates this tab to a new page.
    -   `details.windowId` **[number][8]?** Set the title text only for the given window.

#### Examples

```javascript
browserAction.setTitle({ title: 'something' })
```

Returns **[Promise][4]** Resolves after title has been set. Rejects if there was an error.

### setIcon

Set the icon for the browser action.
See [Chrome API Docs][13]
and [MDN][14].

#### Parameters

-   `details` **[Object][3]** Object: {path:string, tabId(optional)}.

#### Examples

```javascript
browserAction.setIcon({path: 'icon-16.png'})
```

Returns **[Promise][4]** Resolves after icon has been set.

## message

### Message

Use to send messages between documents
(from background to content script, or vice-versa).

Type: [Object][3]

#### Properties

-   `greeting` **[string][7]** A constant to identify the message type.
-   `tabId` **[number][8]?** Identifies the tab to send the message to.

### send

Use to send message between scripts.
Can recognize the extension document context (background or content script).
Requires tabId property when sending from background page.

#### Parameters

-   `message` **Message** A Message object with optional data properties.

#### Examples

```javascript
message.send({
  greeting: 'hello',
  tabId: 1234, // Required if sending from background page.
})
  .then((response) => {
    console.log('They said:', response.greeting)
  })
```

Returns **[Promise][4]&lt;Message>** Resolves if the other side responds.

### sendFromTab

Send a message to the background script.
See [Chrome API][15].
And
[MDN][16].

#### Parameters

-   `message` **Message** A Message object with optional data properties.

#### Examples

```javascript
message.sendFromTab({ greeting: 'hello' })
  .then((response) => {
    console.log('They said', response.greeting)
  })
```

Returns **[Promise][4]&lt;Message>** Resolves if the other side responds.

### sendToTab

Send a message from the background script to a tab.

#### Parameters

-   `message` **Message** Must have a greeting and tabId property.

#### Examples

```javascript
message.sendToTab({
  greeting: 'hello',
  tabId: 1234,
}).then((response) => {
  console.log('They said', response.greeting)
})
```

Returns **[Promise][4]&lt;Message>** Resolves if the other side responds.

### listenForMessage

Listen for messages from other tabs/pages.

The response Message object will be processed before it is sent:

-   If there is no error, `message.success = true`.
-   If there was an error, `message.success = false`
    and the error's message and stack will be assigned to the response object.
-   If `response.greeting` is `undefined`,
    the original greeting will be assigned.

#### Parameters

-   `sendResponse` **[boolean][17]** If true, will send a response. Defaults to true. (optional, default `true`)

#### Examples

```javascript
message.listenForMessage()
  .forEach(({greeting}) => {
    console.log('They said', greeting)
  })
```

Returns **BumbleStream** Returns the BumbleStream object.
  The final return value of the stream will be sent as a message response.

## notify

Wrapper for the chrome.notifications API. Use to create rich notifications using templates and show these notifications to users in the system tray.

See the
[Chrome API Docs][18]
and
[MDN][19].

### NoteType

Referred to as "TemplateType" on Chrome API Docs.

-   `basic`: icon, title, message, expandedMessage, up to two buttons.
-   `image`: icon, title, message, expandedMessage, image, up to two buttons.
-   `list`: icon, title, message, items, up to two buttons. Users on Mac OS X only see the first items.
-   `progress`: icon, title, message, progress, up to two buttons.

See the [Chrome API Docs][20].

Type: (`"basic"` \| `"image"` \| `"list"` \| `"progress"`)

### NoteButton

Defines the notification action button.

Type: [Object][3]

#### Properties

-   `title` **[string][7]** Button title
-   `iconUrl` **[string][7]** Button icon url

### NoteItem

Items for list notifications. Users on Mac OS X only see the first item.

Type: [Object][3]

#### Properties

-   `title` **[string][7]** Title of one item of a list notification.
-   `message` **[string][7]** Additional details about this item.

### NoteOptions

[Rich Notifications - Chrome Extensions API Docs][21]

See the [Chrome API Docs][22]

Type: [Object][3]

#### Properties

-   `type` **NoteType?** 
-   `iconUrl` **[string][7]?** A URL pointing to an icon to display in the notification. The URL can be: a data URL, a blob URL, a http or https URL, or the relative URL of a file within the extension.
-   `title` **[string][7]?** Title of the notification
-   `message` **[string][7]?** Main notification content
-   `contextMessage` **[string][7]?** Alternate notification content with a lower-weight font.
-   `priority` **[number][8]?** Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default.
-   `eventTime` **[number][8]?** A timestamp for the notification in milliseconds
-   `buttons` **[Array][23]&lt;NoteButton>?** Text and icons for up to two notification action buttons.
-   `items` **[Array][23]&lt;NoteItem>?** Items for multi-item notifications. Users on Mac OS X only see the first item.
-   `progress` **integer?** An integer between 0 and 100, used to represent the current progress in a progress indicator.
-   `requireInteraction` **[boolean][17]?** Indicates that the notification should remain visible on screen until the user activates or dismisses the notification.
-   `silent` **[boolean][17]?** Indicates that no sounds or vibrations should be made when the notification is being shown. This defaults to false.

### create

Creates a desktop notification.
See the [Chrome API Docs][24].

#### Parameters

-   `details` **[Object][3]** Details of the notification to create.
    -   `details.id` **[string][7]?** Identifier of the notification. If not set or empty an ID will automatically be generated.
    -   `details.options` **...NoteOptions?** Contents of the notification.
        -   `details.options.type` **NoteType** Which type of notification to display.
        -   `details.options.iconUrl` **[string][7]** Which type of notification to display.
        -   `details.options.title` **[string][7]** Title of the notification (e.g. Sender name for email).
        -   `details.options.message` **[string][7]** Main notification content.

#### Examples

```javascript
notify
  .create({
    type: NoteType.basic,
    message: 'Something to say',
    buttons: [{ title: 'Click here!' }],
    iconUrl: 'icon.png',
    id: item.asin,
  })
```

Returns **[Promise][4]&lt;{id: {string: [string][7]?}}>** Resolves to an object with the notification id, as well as the original NotificationOptions properties.

## pages

### openOptionsPage

Opens the options page as defined in manifest.json.
See
[Chrome API Docs][25]
and
[MDN][26].

#### Examples

```javascript
options.open().then(() => {
  console.log('The options page is open.')
})
```

Returns **[Promise][4]** Resolves after the option page opens.

### getBackgroundPage

Retrieves the Window object for the background page running inside the current extension.
If the background page is unloaded, this will load the background page before resolving.

See
[Chrome API Docs][27]
and
[MDN][28].

#### Examples

```javascript
getBackgroundPage().then((bgWindow) => {
  // The background page window.
})
```

Returns **[Promise][4]&lt;[Window][29]>** A Promise that will be fulfilled with the Window object for the background page, if there is one.

## proxy

Use the chrome.proxy API to manage Chrome's proxy settings.
See [Chrome API Docs][30]

### ProxyMode

A ProxyConfig object's mode attribute determines the overall behavior of Chrome with regards to proxy usage.
See [Chrome API Docs][31].

-   `direct` mode: all connections are created directly, without any proxy involved. This mode allows no further parameters in the ProxyConfig object.
-   `auto_detect` mode: the proxy configuration is determined by a PAC script that can be downloaded at [http://wpad/wpad.dat][32]. This mode allows no further parameters in the ProxyConfig object.
-   `pac_script` mode: the proxy configuration is determined by a PAC script that is either retrieved from the URL specified in the proxy.PacScript object or taken literally from the data element specified in the proxy.PacScript object. Besides this, this mode allows no further parameters in the ProxyConfig object.
-   `fixed_servers` mode: the proxy configuration is codified in a proxy.ProxyRules object. Its structure is described in Proxy rules. Besides this, the fixed_servers mode allows no further parameters in the ProxyConfig object.
-   `system` mode: the proxy configuration is taken from the operating system. This mode allows no further parameters in the ProxyConfig object. Note that the system mode is different from setting no proxy configuration. In the latter case, Chrome falls back to the system settings only if no command-line options influence the proxy configuration.

Type: (`"direct"` \| `"auto_detect"` \| `"pac_script"` \| `"fixed_servers"` \| `"system"`)

### ProxyScheme

The connection to the proxy server uses the protocol defined in the scheme attribute.
If no scheme is specified, the proxy connection defaults to http.
See [Chrome API Docs][33]

-   `http`.
-   `https`.
-   `quic`.
-   `socks4`.
-   `socks5`.

Type: (`"http"` \| `"https"` \| `"quic"` \| `"socks4"` \| `"socks5"`)

### ProxyLevelOfControl

The level of control available to the extension for the proxy setting.

-   `not_controllable`
-   `controlled_by_other_extensions`
-   `controllable_by_this_extension`
-   `controlled_by_this_extension`

Type: (`"not_controllable"` \| `"controlled_by_other_extensions"` \| `"controllable_by_this_extension"` \| `"controlled_by_this_extension"`)

### ProxyScope

Chrome distinguishes between three different scopes of browser settings.
See [Chrome API Docs][34]

-   `regular`: settings set in the regular scope apply to regular browser windows and are inherited by incognito windows if they are not overwritten. These settings are stored to disk and remain in place until they are cleared by the governing extension, or the governing extension is disabled or uninstalled.
-   `regular_only`: settings set in the incognito_persistent scope apply only to incognito windows. For these, they override regular settings. These settings are stored to disk and remain in place until they are cleared by the governing extension, or the governing extension is disabled or uninstalled.
-   `incognito_persistent`: settings set in the incognito_session_only scope apply only to incognito windows. For these, they override regular and incognito_persistent settings. These settings are not stored to disk and are cleared when the last incognito window is closed. They can only be set when at least one incognito window is open.
-   `incognito_session_only`

Type: (`"regular"` \| `"regular_only"` \| `"incognito_persistent"` \| `"incognito_session_only"`)

### ProxyServer

A proxy server is configured in a proxy.ProxyServer object.
See [Chrome API Docs][35]

Type: [Object][3]

#### Properties

-   `scheme` **ProxyScheme** The scheme (protocol) of the proxy server itself. Defaults to 'http'.
-   `host` **[string][7]** The URI of the proxy server. This must be an ASCII hostname (in Punycode format).
-   `port` **[string][7]** The port of the proxy server. Defaults to a port that depends on the scheme.

### ProxyRules

An object encapsulating the set of proxy rules for all protocols.
Use either 'singleProxy' or (a subset of) 'proxyForHttp', 'proxyForHttps', 'proxyForFtp' and 'fallbackProxy'.
See [Chrome API Docs][36]

Type: [Object][3]

#### Properties

-   `singleProxy` **ProxyServer** The proxy server to be used for all per-URL requests (that is http, https, and ftp).
-   `mode` **Mode** 

### ProxyConfig

An object encapsulating a complete proxy configuration.
See [Chrome API Docs][37]

Type: [Object][3]

#### Properties

-   `rules` **ProxyRules** The proxy rules describing this configuration. Use this for 'fixed_servers' mode.
-   `mode` **Mode** 

### createProxyServer

Create a valid ProxyServer. Params will be type coerced and trimmed.
The scheme will default to 'http' if none is specified.
The port will be derived from the scheme if it is not defined.
See [Chrome API Docs][35].

#### Parameters

-   `details` **[Object][3]** Setting details
    -   `details.host` **[string][7]** The proxy server host ip. Will trim any leading or trailing whitespace.
    -   `details.port` **[number][8]?** The proxy server port.
    -   `details.scheme` **ProxyScheme?** The proxy server scheme.

#### Examples

```javascript
const server = createProxyServer({ host: '10.10.10.4' })
```

Returns **ProxyServer** Valid proxy server object.

### createSingleProxyConfig

Create a valid ProxyConfig.
See [Chrome API Docs][38].

#### Parameters

-   `details` **[Object][3]** Setting details
    -   `details.host` **[string][7]** The proxy server host ip.
    -   `details.port` **[number][8]?** The proxy server port.
    -   `details.bypassList` **[Array][23]&lt;[string][7]>?** List of websites to connect to without a proxy. [See the bypassList docs.][39]

#### Examples

```javascript
const config = createSingleProxyConfig({host: '10.4.0.1'})
```

Returns **ProxyConfig** Returns an object encapsulating a complete proxy configuration.

### ProxySettings

An object returned from proxy.get().

Type: [Object][3]

#### Properties

-   `value` **ProxyConfig** The current ProxyConfig.
-   `levelOfControl` **ProxyLevelOfControl** The level of extension control over proxy settings.
-   `incognitoSpecific` **[boolean][17]** Whether the effective value is specific to the incognito session. This property will only be present if the incognito property in the details parameter of proxy.get() was true.

### get

Get the current proxy settings.
See [Chrome API Docs][40].

#### Parameters

-   `details` **[Object][3]?** Setting details
    -   `details.incognito` **[boolean][17]?** Whether to return the value that applies to the incognito session (default false).

#### Examples

```javascript
const proxySettingsPromise = proxy.get()
```

Returns **[Promise][4]&lt;ProxySettings>** The value of the proxy settings.

### set

Sets the current proxy settings.
See [Chrome API Docs][41].

#### Parameters

-   `details` **[Object][3]** Setting details
    -   `details.config` **ProxyConfig** An object encapsulating a complete proxy configuration.
    -   `details.scope` **ProxyScope?** One of the values from ProxyScope.

#### Examples

```javascript
proxy.set({ config: ProxyConfig }).then(() => {
  console.log('Now using your proxy settings.')
})
```

Returns **[Promise][4]** Resolves at the completion of the set operation. Rejects if there was an error.

### clear

Clears the current proxy settings and restores the default.

#### Parameters

-   `details` **[Object][3]?** Setting details
    -   `details.scope` **ProxyScope?** One of the values from ProxyScope.

#### Examples

```javascript
proxy.clear().then(() => {
  console.log('Now using a direct connection.')
})
```

Returns **[Promise][4]** Resolves after the default proxy settings have been restored. Rejects if there was an error.

## storageLocal

This is a wrapper for the local Chrome extension storage API.
Enables extensions to store and retrieve data, and listen for changes to stored items.

See the [Chrome API Docs][42],
and [MDN storage][43].

### set

Store one or more items in the storage area, or update existing items.
When you store or update a value using this API, the onChanged event will fire.

See the
[Chrome API Docs][44]
and
[MDN][45].

#### Parameters

-   `values` **[Object][3]** An object containing one or more key/value pairs to be stored in storage. If an item already exists, its value will be updated.

#### Examples

```javascript
// Save primitive values or Arrays to storage.
local.set({ email: 'sample@gmail.com' })
  .then(() => {
    console.log('The item "email" was set.')
  })
```

```javascript
// Storage cannot save other types,
// such as Function, Date, RegExp, Set, Map, ArrayBuffer and so on.
local.set({ dogs: new Set(['Fluffy', 'Duke', 'Baby']) })
  .catch((error) => {
    console.log('There was a problem!')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure.

### get

Retrieves one or more items from the storage area.

See the
[Chrome API Docs][46]
and
[MDN][47].

#### Parameters

-   `keys` **([string][7] \| [Array][23]&lt;[string][7]>)** A string or array of key names to retrieve from storage. If keys is undefined, returns all items in storage.

#### Examples

```javascript
local.get('cats')
  .then(({cats}) => {
    console.log('Cats!', cats)
  })
```

```javascript
local.get()
  .then((allItems) => {
    console.log('Every item in storage:', allItems)
  })
```

```javascript
local.get(['cats', 'dogs'])
  .then(({cats, dogs}) => {
    console.log('Cats!', cats)
    console.log('Dogs!', dogs)
  })
```

Returns **[Promise][4]&lt;[Object][3]>** Resolves with an object representing the values of the items or rejects on failure.

### clear

Removes all items from the storage area.

See
[Chrome API Docs][48]
and
[MDN][49].

#### Examples

```javascript
local.clear()
  .then(() => {
    console.log('Storage was cleared.')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure.

### remove

Removes one or more items from the storage area.

See the
[Chrome API Docs][50]
and
[MDN][51].

#### Parameters

-   `keys` **([string][7] \| [Array][23]&lt;[string][7]>)** A string, or array of strings, representing the key(s) of the item(s) to be removed.

#### Examples

```javascript
local.remove('key')
  .then(() => {
    console.log('The property "key" was removed.')
  })
```

```javascript
local.remove(['key', 'lock'])
  .then(() => {
    console.log('The property "key" was removed.')
    console.log('The property "lock" was removed.')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure.

## storageSync

This is a wrapper for the local Chrome extension storage API.
Enables extensions to store and retrieve data, and listen for changes to stored items.

See the [Chrome API Docs][42],
and [MDN storage][43].

### set

Store one or more items in the storage area, or update existing items.
When you store or update a value using this API, the onChanged event will fire.

See the
[Chrome API Docs][44]
and
[MDN][45].

#### Parameters

-   `values` **[Object][3]** An object containing one or more key/value pairs to be stored in storage. If an item already exists, its value will be updated.

#### Examples

```javascript
// Save primitive values or Arrays to storage.
sync.set({ email: 'sample@gmail.com' })
  .then(() => {
    console.log('The item "email" was set.')
  })
```

```javascript
// Storage cannot save other types,
// such as Function, Date, RegExp, Set, Map, ArrayBuffer and so on.
sync.set({ dogs: new Set(['Fluffy', 'Duke', 'Baby']) })
  .catch((error) => {
    console.log('There was a problem!')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure.

### get

Retrieves one or more items from the storage area.

See the
[Chrome API Docs][46]
and
[MDN][47].

#### Parameters

-   `keys` **([string][7] \| [Array][23]&lt;[string][7]>)** A string or array of key names to retrieve from storage.

#### Examples

```javascript
sync.get('cats')
  .then(({cats}) => {
    console.log('Cats!', cats)
  })
```

```javascript
sync.get(['cats', 'dogs'])
  .then(({cats, dogs}) => {
    console.log('Cats!', cats)
    console.log('Dogs!', dogs)
  })
```

Returns **[Promise][4]&lt;[Object][3]>** Resolves with an object representing the values of the items or rejects on failure.

### clear

Removes all items from the storage area.

See
[Chrome API Docs][48]
and
[MDN][49].

#### Examples

```javascript
sync.clear()
  .then(() => {
    console.log('Storage was cleared.')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure.

### remove

Removes one or more items from the storage area.

See the
[Chrome API Docs][50]
and
[MDN][51].

#### Parameters

-   `keys` **([string][7] \| [Array][23]&lt;[string][7]>)** A string, or array of strings, representing the key(s) of the item(s) to be removed.

#### Examples

```javascript
sync.remove('key')
  .then(() => {
    console.log('The property "key" was removed.')
  })
```

```javascript
sync.remove(['key', 'lock'])
  .then(() => {
    console.log('The property "key" was removed.')
    console.log('The property "lock" was removed.')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure.

## tabs

Wrapper for the chrome.tabs API. Use to interact with the browser's tab system.
You can use this API to create, modify, and rearrange tabs in the browser.

See the
[Chrome API Docs][52]
and
[MDN][53].

### Tab

See the Tab type in the [Chrome API Docs][54].

The type tabs.Tab contains information about a tab. This provides access to information about what content is in the tab, how large the content is, what special states or restrictions are in effect, and so forth.

Type: [Object][3]

#### Properties

-   `id` **integer?** 
-   `index` **integer** The zero-based index of the tab within its window.
-   `windowId` **integer** The ID of the window that contains the tab.
-   `openerTabId` **integer?** The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
-   `highlighted` **[boolean][17]** Whether the tab is highlighted.
-   `active` **[boolean][17]** Whether the tab is active in its window. Does not necessarily mean the window is focused.
-   `pinned` **[boolean][17]** Whether the tab is pinned.
-   `audible` **[boolean][17]?** Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the 'speaker audio' indicator is showing.
-   `discarded` **[boolean][17]** Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content is reloaded the next time it is activated.
-   `autoDiscardable` **[boolean][17]** Whether the tab can be discarded automatically by the browser when resources are low.
-   `url` **[string][7]?** The URL the tab is displaying.
-   `title` **[string][7]?** The title of the tab.
-   `favIconUrl` **[string][7]?** The URL of the tab's favicon. It may also be an empty string if the tab is loading.
-   `status` **[string][7]?** Either loading or complete
-   `incognito` **[boolean][17]** Whether the tab is in an incognito window.
-   `width` **integer?** The width of the tab in pixels.
-   `height` **integer?** The height of the tab in pixels.
-   `sessionId` **[string][7]?** The session ID used to uniquely identify a Tab obtained from the sessions API.

### CreateProperties

See the [Chrome API Docs][55]

Type: [Object][3]

#### Properties

-   `windowId` **integer?** The window in which to create the new tab. Defaults to the current window.
-   `index` **integer?** The position the tab should take in the window. The provided value is clamped to between zero and the number of tabs in the window.
-   `url` **[string][7]?** The URL to initially navigate the tab to. Fully-qualified URLs must include a scheme (i.e., '[http://www.google.com'][56], not 'www.google.com'). Relative URLs are relative to the current page within the extension. Defaults to the New Tab Page.
-   `active` **[boolean][17]?** Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true.
-   `pinned` **[boolean][17]?** Whether the tab should be pinned. Defaults to false
-   `openerTabId` **integer?** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.

### create

Creates a new tab.
See [Chrome API Docs][55] and [MDN][57].

#### Parameters

-   `details` **CreateProperties?** An object with optional properties for the new tab.

#### Examples

```javascript
tabs.create({
  url: 'http://www.google.com',
}).then((tab) => {
  console.log('The new tab id is:', tab.id)
})
```

```javascript
tabs.create().then((tab) => {
  console.log('It is just a new active tab.')
})
```

Returns **Tab** The created tab.

### get

Given a tab ID, get the tab's details as a tabs.Tab object.
Without the "tabs" permission, will omit `url`, `title`, and `favIconUrl`.

See [Chrome API Docs][58] and [MDN][59].

#### Parameters

-   `details` **[Object][3]?** The details of a tab.
    -   `details.tabId` **[number][8]?** ID of the tab to get.

#### Examples

```javascript
tabs.get({ tabId: 12345 })
  .then((tab) => {
    console.log(tab.status)
  })
```

```javascript
tabs.get({ tabId: 12345 })
  .then((tab) => {
    // Requires "tabs" permission
    console.log(tab.title)
  })
```

Returns **[Promise][4]&lt;Tab>** A Promise that will be fulfilled with a tabs.Tab object containing information about the tab.

### query

Gets all tabs that have the specified properties, or all tabs if no properties are specified.
Some queryInfo properties are ignored without the "tabs" permission.

See [Chrome API Docs][60] and [MDN][61].

#### Parameters

-   `queryInfo` **[Object][3]?** Specified properties of tabs. See [Chrome queryInfo][62].

#### Examples

```javascript
tabs.query({
  active: true,
}).then((tabs) => {
  console.log('All the active:', tabs)
})
```

```javascript
tabs.query({
  // The url property requires the 'tabs' permission.
  url: 'https://*.google.com/*',
}).then((tabs) => {
  console.log('All the Google tabs:', tabs)
})
```

Returns **[Promise][4]&lt;[Array][23]&lt;Tab>>** A Promise that will be fulfilled with an array of the queried tabs.Tab objects.

### update

Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
See [Chrome API Docs][63]
and
[MDN][64].

#### Parameters

-   `details` **[Object][3]?** The details of a tab.
    -   `details.tabId` **[number][8]?** Defaults to the selected tab of the current window.
    -   `details.updateProps` **[Object][3]?** Specified properties of tabs. See [Chrome updateProperties][65].

#### Examples

```javascript
tabs.update({
  tabId: 12345,
  url: 'http://www.google.com',
}).then((tab) => {
  console.log('The tab was updated.')
})
```

Returns **[Promise][4]&lt;Tab>** A Promise that will be fulfilled with a tabs.Tab object containing details about the updated tab.

### close

Closes one or more tabs.

See the
[Chrome API Docs][66]
and
[MDN][67].

#### Parameters

-   `details` **[Object][3]** The details of a tab.
    -   `details.tabId` **([string][7] \| [Array][23]&lt;[string][7]>)** The tab ID or list of tab IDs to close.

#### Examples

```javascript
tabs.close({ tabId: 12345 })
  .then(() => {
    console.log('The tab was closed.')
  })
```

```javascript
tabs.close({ tabId: [12345, 67890] })
  .then(() => {
    console.log('Two tabs were closed.')
  })
```

Returns **[Promise][4]** Resolves on success or rejects on failure with the reason.

### execute

Inject JavaScript code into a page. The script will execute in its own environment, but will share the DOM of the page.
This requires either a
[host permission][68]
or the
[activeTab permission][69].
Either the `code` or `file` property must be set in the `details` param.

See [programmatic injection in the Chrome API Docs][70].

#### Parameters

-   `details` **[Object][3]?** The details of a tab.
    -   `details.tabId` **[number][8]?** The id of the tab to inject. Defaults to the active tab.
    -   `details.code` **[string][7]?** JavaScript or CSS code to inject.
    -   `details.file` **[string][7]?** The path to the JavaScript or CSS file to inject.
    -   `details.details` **[string][7]?** [Other optional details of the script to run.][71].

#### Examples

```javascript
tabs.execute({
  tabId: 12345,
  file: 'content-script.js',
}).then((tab) => {
  console.log('')
})
```

Returns **[Promise][4]&lt;[Array][23]>** Resolves with an array of the results of the script in every injected frame.

[1]: https://developer.chrome.com/extensions/browserAction

[2]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[5]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText

[6]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setBadgeText

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[9]: https://developer.chrome.com/extensions/browserAction#method-setBadgeBackgroundColor

[10]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setBadgeBackgroundColor

[11]: https://developer.chrome.com/extensions/browserAction#method-setTitle

[12]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setTitle

[13]: https://developer.chrome.com/extensions/browserAction#method-setIcon

[14]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setIcon

[15]: https://developer.chrome.com/extensions/runtime#method-sendMessage

[16]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[18]: https://developer.chrome.com/apps/notifications

[19]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications

[20]: https://developer.chrome.com/apps/notifications#type-TemplateType

[21]: https://developer.chrome.com/extensions/richNotifications

[22]: https://developer.chrome.com/apps/notifications#type-NotificationOptions

[23]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[24]: https://developer.chrome.com/apps/notifications#method-create

[25]: https://developer.chrome.com/extensions/runtime#method-openOptionsPage

[26]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/openOptionsPage

[27]: https://developer.chrome.com/extensions/runtime#method-getBackgroundPage

[28]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/getBackgroundPage

[29]: https://developer.mozilla.org/docs/Web/API/Window

[30]: https://developer.chrome.com/extensions/proxy

[31]: https://developer.chrome.com/extensions/proxy#proxy_modes

[32]: http://wpad/wpad.dat

[33]: https://developer.chrome.com/extensions/proxy#proxy_server_objects

[34]: https://developer.chrome.com/extensions/types#ChromeSetting-lifecycle

[35]: https://developer.chrome.com/extensions/proxy#type-ProxyServer

[36]: https://developer.chrome.com/extensions/proxy#type-ProxyRules

[37]: https://developer.chrome.com/extensions/proxy#type-ProxyConfig

[38]: https://developer.chrome.com/extensions/proxy#type-ProxyConfig.

[39]: https://developer.chrome.com/extensions/proxy#bypass_list

[40]: https://developer.chrome.com/extensions/proxy#method-settings-get.

[41]: https://developer.chrome.com/extensions/proxy#method-settings-set.

[42]: https://developer.chrome.com/extensions/storage

[43]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage#Properties

[44]: https://developer.chrome.com/extensions/storage#method-StorageArea-set

[45]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/set

[46]: https://developer.chrome.com/extensions/storage#method-StorageArea-get

[47]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/get

[48]: https://developer.chrome.com/extensions/storage#method-StorageArea-clear

[49]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/clear

[50]: https://developer.chrome.com/extensions/storage#method-StorageArea-remove

[51]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/remove

[52]: https://developer.chrome.com/extensions/tabs

[53]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs

[54]: https://developer.chrome.com/extensions/tabs#type-Tab

[55]: https://developer.chrome.com/extensions/tabs#method-create

[56]: http://www.google.com'

[57]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create

[58]: https://developer.chrome.com/extensions/tabs#method-get

[59]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/get

[60]: https://developer.chrome.com/extensions/tabs#method-query

[61]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query

[62]: https://developer.chrome.com/extensions/tabs#property-query-queryInfo

[63]: https://developer.chrome.com/extensions/tabs#method-update

[64]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update

[65]: https://developer.chrome.com/extensions/tabs#property-update-updateProperties

[66]: https://developer.chrome.com/extensions/tabs#method-remove

[67]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/remove

[68]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/permissions#Host_permissions

[69]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/permissions#activeTab_permission

[70]: https://developer.chrome.com/extensions/content_scripts#pi

[71]: https://developer.chrome.com/extensions/tabs#property-executeScript-details
