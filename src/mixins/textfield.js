/**
 * @description Textfield status mixin
 */
export default {
  props: {
    /**
     * @usage <Textfield v-model="myValue"/>
     */
    value: {
      default: ''
    }
  },
  methods: {
    change ($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
