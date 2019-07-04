<template>
  <label class="i-switch">
    <input type="checkbox"
      :value="value"
      :checked="value"
      @change="change"
    >
    <span class="i-switch__slider"></span>
  </label>
</template>

<script>
import toggle from '@/mixins/toggle'

export default {
  name: 'iSwitch',
  mixins: [ toggle ]
}

</script>

<style lang="scss">
@import '../common/style/common.scss';
@import '../common/style/mixin.scss';
$toggle-color-active: #34c759;
$toggle-color-deactive: #eaeaeb;

.i-switch {
  @include tap-highlight-disable;
  position: relative;
  display: block;
  width: 3.5rem;
  height: 2.166rem;

  input[type=checkbox] {
    display: none;
    outline: none;
    width: 0;
    height: 0;

    &:checked {

      & + span.i-switch__slider {
        background-color: $toggle-color-active;
      }

      & + span.i-switch__slider:before {
        transform: translateX(1.333rem);
      }
    }
  }

  &__slider {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1.083rem;
    background-color: $toggle-color-deactive;
    -webkit-transition: $transition-speed;
       -moz-transition: $transition-speed;
        -ms-transition: $transition-speed;
         -o-transition: $transition-speed;
            transition: $transition-speed;

    &:before {
      content: "";
      position: absolute;
      height: 1.833rem;
      width: 1.833rem;
      left: 0.163rem;
      bottom: 0.166rem;
      border-radius: 50%;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);
      background-color: #fff;
      -webkit-transition: $transition-speed;
         -moz-transition: $transition-speed;
          -ms-transition: $transition-speed;
           -o-transition: $transition-speed;
              transition: $transition-speed;
    }
  }
}

</style>
