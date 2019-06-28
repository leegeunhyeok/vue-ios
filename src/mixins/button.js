/**
 * @description Button status mixin
 */
export default {
  props: {
    /**
     * @usage <Button @click="myFunc"/>
     */
    color: {
      type: String
    },
    backgroundColor: {
      type: String
    }
  },
  methods: {
    click ($event) {
      this.$emit('click', $event)
    }
  }
}
