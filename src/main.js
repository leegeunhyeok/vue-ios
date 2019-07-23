import Vue from 'vue'
import App from './App.vue'

import init from './global'

Vue.config.productionTip = false
init(Vue)

new Vue({
  render: h => h(App)
}).$mount('#app')
