<template>
  <input
    class="i-text-field"
    :spellcheck="spellcheck"
    :style="propsStyle"
    :type="type"
    :placeholder="placeholder"
    :max="max"
    :min="min"
    :maxlength="maxlength"
    :value="value"
    @input="input"
  >
</template>

<script>
import boxModel from '@/mixins/box-model'
import textfield from '@/mixins/textfield'

export default {
  name: 'iTextField',
  mixins: [ boxModel, textfield ],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/common.scss';
$placeholder-color: #8a8a8d;

.i-text-field {
  outline: none;
  padding: .4rem .8rem;
  background-color: $light-pure-color;
  border: none;
  border-radius: 6px;
  font-size: 1rem;

  &::placeholder {
    color: $placeholder-color;
  }

  &:-ms-input-placeholder {
    color: $placeholder-color;
  }

  &::-ms-input-placeholder {
    color: $placeholder-color;
  }
}
</style>
