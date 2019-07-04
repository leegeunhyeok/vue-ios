/**
 * @description Dialog mixin
 */
export default {
  props: {
    /**
     * @usage <Dialog :title="myTitle" v-if="show"/>
     */
    title: {
      type: String
    },
    orientation: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    isHorizontal () {
      return this.orientation === 'horizontal'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
