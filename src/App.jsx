import { useEffect, useState } from 'react'
import { getIPs } from 'browser-ips'
import { genQRCode, getHostname } from './util'
import { mockIPs } from './chrome-extension-mock'
import Settings from './Settings.jsx'

const defaultList = ['localhost', '127.0.0.1']

export function App() {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [hostnameList, setHostnameList] = useState(defaultList)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.storage.local.get(['hostnameList'], (result) => {
        const newList = result.hostnameList || defaultList
        setHostnameList(newList)
        const url = tabs[0].url
        const isLocalhost = newList.includes(getHostname(url))
        if (isLocalhost) {
          getIPs()
            .then(mockIPs)
            .then((ips) => {
              const ip = ips[0]
              const newUrl = url.replace(getHostname(url), ip)
              setUrl(newUrl)
              genQRCode('qrcode', newUrl)
            })
        } else {
          setUrl(url)
          genQRCode('qrcode', url)
        }
      })
    })
  }, [])

  const copy = () => {
    document.oncopy = function (event) {
      event.clipboardData.setData('text', url)
      event.preventDefault()
    }
    document.execCommand('Copy', false, null)
    setCopied(true)
  }

  return (
    <div className="container">
      <canvas id="qrcode" />
      <div className="actionBar">
        <a title={url} onClick={copy}>
          {copied ? 'Copied!' : 'Copy Link'}
        </a>
        <a title={'settings'} onClick={() => setShowSettings(!showSettings)}>
          Settings
        </a>
      </div>
      {showSettings && <Settings hostnameList={hostnameList} setHostnameList={setHostnameList} />}
    </div>
  )
}
