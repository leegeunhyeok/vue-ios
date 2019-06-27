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
    },
    placeholder: {
      type: String
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    maxlength: {
      type: Number
    }
  },
  methods: {
    input ($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
