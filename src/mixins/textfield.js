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
      type: Number | String
    },
    min: {
      type: Number | String
    },
    maxlength: {
      type: Number | String
    },
    spellcheck: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input ($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
