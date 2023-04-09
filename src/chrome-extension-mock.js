const polyfill = () => {
  const storage = {}
  if (!(window.chrome && chrome.tabs)) {
    window.chrome = window.chrome || {}
    window.chrome.tabs = window.chrome.tabs || {
      query: (config, callback) => {
        callback([{ url: location.href }])
      },
    }
  }

  if (!(window.chrome && chrome.storage)) {
    window.chrome = window.chrome || {}
    window.chrome.storage = window.chrome.storage || {}
    window.chrome.storage.local = window.chrome.local || {
      get: (keyList, callback) => {
        callback(storage)
      },
      set: (obj) => {
        for(let key in obj) {
          storage[key] = obj[key]
        }
      },
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  console.log('mock chrome extension api.')
  polyfill()
}

export const mockIPs = (ips) => {
  if (process.env.NODE_ENV === 'development') {
    ips = ['any-ip.youlike']
    console.log('mock ips response', ips)
  }

  return ips
}
