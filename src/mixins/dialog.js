/**
 * @description Dialog mixin
 */
export default {
  props: {
    /**
     * @usage <Dialog :title="myTitle"/>
     */
    title: {
      type: String
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
