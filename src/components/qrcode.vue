<style lang="scss">
  .main {
    width: 200px;
    min-height: 200px;
    padding: 10px;
    .pointer {
      cursor: pointer;
    }
    .underline-hover {
      &:hover {
        text-decoration: underline;
      }
    }
    .ip-text {
      margin-top: 15px;
      a {
        color: #148cf3;
        &.copy {
          float: right;
        }
      }
    }
    .qrcode {
      img {
        display: block;
      }
    }
  }
</style>
<template>
  <div class="main">
    <div class="qrcode" id="qrcode"></div>
    <div class="ip-text" >
      <a class="pointer underline-hover" @click="open" :title="qrUrl">Open In New Tab</a>
      <a v-show="!copied" class="pointer underline-hover copy" @click="copy(qrUrl)">Copy Link</a>
      <a v-show="copied"  class="copy">Copied!</a>
    </div>
</div>
</template>

<script>
import localIp from 'chrome-localIp'
import utils, { isChromeExt } from 'libs/utils'

export default {
  data() {
    return {
      qrUrl: '',
      copied: false
    }
  },
  components: {

  },
  methods: {
    open: function() {
      isChromeExt && chrome.tabs.create({url: this.qrUrl});
    },
    copy: function(str) {
      document.oncopy = function(event) {
        event.clipboardData.setData('text', str);
        event.preventDefault();
      };
      document.execCommand("Copy", false, null);
      this.copied = true
    }
  },

  mounted() {
    if (!isChromeExt) {
      //for test
      this.qrUrl = 'test'
      utils.genQRCode("qrcode", 'test')
      return;
    }

    chrome.tabs.getSelected(null, (tab) => {
      let url = tab.url
      if (utils.isLocalhost(url)){
        localIp.getIp().then(ip => {
          url = url.replace(utils.getDomain(url), ip)
          utils.genQRCode("qrcode", url)
          //https://www.the-qrcode-generator.com/?d=http:%2F%2Flocalhost:8666%2F
          this.qrUrl = url
        })
      } else {
        utils.genQRCode("qrcode", url)
        this.qrUrl = url
      }
    });
  }

}
</script>
