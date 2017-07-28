import QRCode from 'qrcodejs2'

export const isChromeExt = !!(window.chrome && chrome.tabs)

export default {
  isLocalhost: function(url) {
    var domain = this.getDomain(url)
    return ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(domain) > -1
  },
  getDomain: function(url) {
    return this.getOrigin(url).split(':')[0]
  },
  getPort: function(url) {
    return this.getOrigin(url).split(':')[1]
  },
  getOrigin: function(url) {
    return url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];
  },
  genQRCode: function(id, url) {
    return new QRCode(document.getElementById(id), {
      text: url,
      width: 200,
      height: 200,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  }
}
