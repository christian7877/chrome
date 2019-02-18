const create = details =>
  new Promise((resolve, reject) => {
    try {
      chrome.contextMenus.create(details, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message)
        }

        resolve()
      })
    } catch (error) {
      reject(error)
    }
  })

export const contextMenu = { create }
