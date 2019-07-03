<template>
  <div class="i-alert">
    <div class="i-alert--mask">
      <div class="i-alert--dialog">
        <div class="i-alert--dialog--header">{{ title }}</div>
        <div class="i-alert--dialog--body" v-if="!!$slots.body">
          <slot name="body"/>
        </div>
        <div class="i-alert--dialog--footer" v-if="!!$slots.footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialog from '@/mixins/dialog'

export default {
  name: 'iAlert',
  mixins: [ dialog ]
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  .i-alert--mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);

    .i-alert--dialog {
      position: relative;
      top: 50%;
      left: 50%;
      padding-top: 1.2rem;
      border-radius: 1rem;
      background-color: $light-background-color;
      -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
           -o-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);

      @media only screen and (min-width: 320px) {
        width: 70%;
      }

      @media only screen and (min-width: 768px) {
        width: 35%;
      }

      @media only screen and (min-width: 1224px) {
        width: 20%;
      }
      
      .i-alert--dialog--header {
        font-weight: bold;
        font-size: 1.2rem;
      }

      .i-alert--dialog--body {
        padding: .8rem;
        font-size: 1rem;
      }

      .i-alert--dialog--footer {
        padding: .5rem 0;

        &::before {
          content: "";
          position: absolute;
          bottom: 3rem;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: $light-border-color;
        }
      }
    }
  }
}
</style>
