/**
 * @description Toggle status mixin
 */
export default {
  props: {
    /**
     * @usage <toggle v-model="myValue"/>
     */
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change ($event) {
      this.$emit('input', $event.target.checked)
    }
  }
}
