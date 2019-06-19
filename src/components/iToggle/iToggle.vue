<template>
  <label class="i-toggle">
    <input type="checkbox" ref="target" :value="value">
    <span class="i-toggle--slider"></span>
  </label>
</template>

<script>
import toggle from '@/mixins/toggle'

export default {
  name: 'iToggle',
  mixins: [ toggle ]
}

</script>

<style lang="scss">
@import '../../common/style/common.scss';
$toggle-color-active: #34c759;
$toggle-color-deactive: #eaeaeb;

.i-toggle {
  position: relative;
  display: block;
  width: 5rem;
  height: 2.833rem;

  input[type=checkbox] {
    display: none;
    outline: none;
    width: 0;
    height: 0;

    & + span.i-toggle--slider {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 2.166rem;
      background-color: $toggle-color-deactive;
      -webkit-transition: $transition-speed;
         -moz-transition: $transition-speed;
          -ms-transition: $transition-speed;
           -o-transition: $transition-speed;
              transition: $transition-speed;

      &:before {
        content: "";
        position: absolute;
        height: 2.333rem;
        width: 2.333rem;
        left: 0.25rem;
        bottom: 0.25rem;
        border-radius: 50%;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, .4);
        background-color: #fff;
        -webkit-transition: $transition-speed;
           -moz-transition: $transition-speed;
            -ms-transition: $transition-speed;
             -o-transition: $transition-speed;
                transition: $transition-speed;
      }
    }

    &:checked {

      & + span.i-toggle--slider {
        background-color: $toggle-color-active;
      }

      & + span.i-toggle--slider:before {
        transform: translateX(2.166rem);
      }
    }
  }
}

</style>
