<template>
  <transition name="fade"
    @before-enter="showDialog = true"
    @before-leave="showDialog = false"
  >
    <div class="i-alert">
      <div class="i-alert__mask"
        @click="close"
      >
        <transition name="dialog"
          @after-leave="close"
        >
          <div class="i-alert__dialog"
            @click.stop
            v-if="showDialog"
          >
            <div class="i-alert__dialog__header">{{ title }}</div>
            <div class="i-alert__dialog__body" v-if="!!$slots.body">
              <slot name="body"/>
            </div>
            <div class="i-alert__dialog__footer"
              :class="{
                horizontal: isHorizontal,
                vertical: !isHorizontal
              }"
              v-if="!!$slots.footer"
            >
              <slot name="footer"/>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import dialog from '@/mixins/dialog'

export default {
  name: 'iAlert',
  mixins: [ dialog ],
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    close () {
      this.showDialog = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/transition-dialog.scss';
@import '../common/style/transition-fade.scss';
@import '../common/style/common.scss';

.i-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  &__mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
  }

  &__dialog {
    position: relative;
    top: 50%;
    left: 50%;
    padding-top: 1.2rem;
    border-radius: 1rem;
    background-color: $light-background-color;
    text-align: center;
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

    &__header {
      font-weight: bold;
      font-size: 1.2rem;
    }

    &__body {
      padding: .8rem;
      font-size: 1rem;
    }

    &__footer {
      border-top: 1px solid $light-border-color;
      width: 100%;

      &.horizontal > * {
        display: flex;

        .i-button {
          padding: .8rem 0;
          flex: 1 1 0;
          border-right: 1px solid $light-border-color;

          &:nth-last-child(1) {
            border: none;
          }
        }
      }

      &.vertical > * {
        padding: .4rem 0;

        .i-button {
          display: block;
          width: 100%;
          border-bottom: 1px solid $light-border-color;

          &:nth-last-child(1) {
            border: none;
          }
        }
      }
    }
  }
}

</style>
