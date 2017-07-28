<template>
  <div id="app">
    <qrcode></qrcode>
  </div>
</template>

<script>
import qrcode from './components/qrcode'

export default {
  name: 'app',
  components: {
    qrcode
  }
}
</script>
