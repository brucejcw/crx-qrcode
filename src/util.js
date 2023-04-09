import QRCode from 'qrcode'

export const getHostname = function (url) {
  const link = document.createElement('a')
  link.href = url
  return link.hostname
}

export const genQRCode = function (id, url) {
  return QRCode.toCanvas(document.getElementById(id), url, { margin: 0, width: 200 })
}
