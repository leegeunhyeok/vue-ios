import Vue from 'vue'
import App from './App.vue'

import init from './prototypes'

Vue.config.productionTip = false
init(Vue)

new Vue({
  render: h => h(App)
}).$mount('#app')
