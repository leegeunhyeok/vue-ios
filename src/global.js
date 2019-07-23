export default Vue => {
  Vue.prototype.$bus = new Vue()

  const globalData = new Vue({
    data: {
      $splited: false,
      $iWidth: 0
    }
  })

  Vue.mixin({
    computed: {
      $splited: {
        get () {
          return globalData.$data.$splited
        },
        set (newVal) {
          globalData.$data.$splited = newVal
        }
      },
      $iWidth: {
        get () {
          return globalData.$data.$iWidth
        },
        set (newVal) {
          globalData.$data.$iWidth = newVal
        }
      }
    }
  })
}
