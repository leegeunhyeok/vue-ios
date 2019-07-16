<template>
  <input
    class="i-text-search-field"
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
  name: 'iSearchField',
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
$placeholder-color: #8e8e93;

.i-text-search-field {
  outline: none;
  padding: .4rem .8rem;
  background-color: #e3e3e8;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  -webkit-transition: $transition-speed;
     -moz-transition: $transition-speed;
      -ms-transition: $transition-speed;
       -o-transition: $transition-speed;
          transition: $transition-speed;

  &::placeholder {
    color: $placeholder-color;
  }

  &:-ms-input-placeholder {
    color: $placeholder-color;
  }

  &::-ms-input-placeholder {
    color: $placeholder-color;
  }

  &:hover {
    background-color: #dedee4;
  }
}
</style>
