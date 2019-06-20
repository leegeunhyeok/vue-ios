<template>
  <div class="i-navigation-bar">
    <transition>
      <div class="i-navigation-bar__default"
        :style="navigationStyle"
        v-if="!extend"
      >
        <div class="i-navigation-bar--mask"
          :class="{ blur }"
        />

        <div class="i-navigation-bar--title">
          {{ title }}
        </div>
      </div>
    </transition>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'iAppbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    blur: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#f2f2f7',
      validator (value) {
        return !!value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/i)
      }
    },
    opacity: {
      type: Number,
      default: 0.5
    },
    extend: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pixel: 12
    }
  },
  computed: {
    navigationClass () {
      return {
        blur: this.blur
      }
    },
    navigationStyle () {
      return {
        backgroundColor: this.color
      }
    }
  },
  mounted () {
    this.getFontPixel()
    window.addEventListener('resize', this.getFontPixel)
    window.addEventListener('scroll', this.watchScrollStatus)
  },
  beforeDestroy () {
    window.addEventListener('resize', this.getFontPixel)
    window.removeEventListener('scroll', this.watchScrollStatus)
  },
  methods: {
    getFontPixel () {
      this.pixel = parseFloat(
        getComputedStyle(document.body)
          .getPropertyValue('font-size')
      )
    },
    watchScrollStatus () {
      // const height = this.pixel * 2
    }
  }
}
</script>

<style lang="scss">

.i-navigation-bar {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;

  @media only screen and (min-width: 320px) {
    padding-top: 2.5rem;
  }

  @media only screen and (min-width: 768px) {
    padding-top: 3rem;
  }

  @media only screen and (min-width: 1224px) {
    padding-top: 3.5rem;
  }

  .i-navigation-bar__default {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9995;

    @media only screen and (min-width: 320px) {
      height: 2.5rem;
      line-height: 2.5rem;
    }

    @media only screen and (min-width: 768px) {
      height: 3rem;
      line-height: 3rem;
    }

    @media only screen and (min-width: 1224px) {
      height: 3.5rem;
      line-height: 3.5rem;
    }

    .i-navigation-bar--mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &.blur {
        // TODO: blur effect implement
        opacity: .95;
      }
    }

    .i-navigation-bar--title {
      color: #000;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
