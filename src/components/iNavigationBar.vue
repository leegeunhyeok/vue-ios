<template>
  <div class="i-navigation-bar" ref="iNav">
    <transition>
      <div class="i-navigation-bar__default"
        v-if="!extend"
      >
        <div class="i-navigation-bar--mask"
          :style="navigationStyle"
          :class="{ blur }"
        />

        <div class="i-navigation-bar--title">
          {{ title }}
        </div>
      </div>
    </transition>
    <div class="i-navigation-bar__large"
      :style="navigationStyle"
    >
      <h2 class="i-navigation-bar__large--title">
        {{ 'Large' }}
      </h2>
    </div>
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
    }
  },
  data () {
    return {
      pixel: 12,
      navbarHeight: 40,
      extend: true
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
    this.getStyleInformation()
    this.watchScrollStatus()
    window.addEventListener('resize', this.getStyleInformation)
    window.addEventListener('scroll', this.watchScrollStatus)
  },
  beforeDestroy () {
    window.addEventListener('resize', this.getStyleInformation)
    window.removeEventListener('scroll', this.watchScrollStatus)
  },
  methods: {
    getStyleInformation () {
      this.pixel = parseFloat(
        getComputedStyle(document.body)
          .getPropertyValue('font-size')
      )
      this.navbarHeight = parseFloat(
        getComputedStyle(this.$refs.iNav)
          .getPropertyValue('height')
      )
    },
    watchScrollStatus () {
      this.extend = !(window.pageYOffset > this.navbarHeight)
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
    padding-top: 8.5rem;
  }

  @media only screen and (min-width: 768px) {
    padding-top: 9rem;
  }

  @media only screen and (min-width: 1224px) {
    padding-top: 9.5rem;
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
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #000;
      font-size: .9rem;
      font-weight: bold;
    }
  }

  .i-navigation-bar__large {
    position: absolute;
    width: 100%;
    height: 8rem;
    top: 0;
    left: 0;

    .i-navigation-bar__large--title {
      text-align: left;
      margin-top: 3rem;
      margin-left: 1rem;
      font-size: 2rem;
      font-weight: bold;
    }
  }
}
</style>
