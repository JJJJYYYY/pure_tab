import Vue from 'vue'
import App from './App.vue'

import VRadio from '@/components/Base/VRadio'

Vue.component(VRadio.name, VRadio)

new Vue({
  el: '#app',
  methods: {
    // 国际化
    i18n (key) {
      return chrome.i18n.getMessage(key)
    }
  },
  render: h => h(App)
})
