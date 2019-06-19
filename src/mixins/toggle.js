/**
 * @description Toggle status mixin
 */
export default {
  props: {
    /**
     * @usage <toggle :value="false"/>
     */
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$refs.target.addEventListener('change', this.change)
  },
  beforeDestroy () {
    this.$refs.target.removeEventListener('change', this.change)
  },
  methods: {
    change (event) {
      this.$emit('onChange', event.target.checked)
    }
  }
}
