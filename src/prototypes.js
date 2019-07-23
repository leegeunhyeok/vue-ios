export default Vue => {
  Vue.prototype.$bus = new Vue()
  Vue.prototype.$splited = false
  Vue.prototype.$iWidth = false
}
