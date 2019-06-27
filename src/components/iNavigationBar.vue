<template>
  <div class="i-navigation-bar" ref="iNav"
    :class="{ 'not-extended': !extended }"
  >
    <div class="i-navigation-bar__default"
      :style="{ borderColor: `rgba(197, 197, 200, ${ extended ? borderOpacity : 1 })` }"
      ref="iNavDefault"
    >
      <div class="i-navigation-bar--mask"
        :class="{ blur }"
      />
      <transition name="i-navigation-bar" mode="out-in">
        <div class="i-navigation-bar--title"
          v-if="showTitle"
        >
          {{ title }}
        </div>
      </transition>
    </div>
    <div class="i-navigation-bar__large"
      v-if="extended"
    >
      <div class="i-navigation-bar__large--title"
        :style="largeTitleStyle"
      >
        {{ largeTitle }}
      </div>
      <div class="i-navigation-bar__large-area">
        <slot name="largeArea"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'iNavigationBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    largeTitle: {
      type: String,
      default: ''
    },
    blur: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pixel: 12,
      navbarHeight: 120,
      defaultNavbarHeight: 40,
      showTitle: false,
      defaultNavbarBorder: false,
      borderOpacity: 0,
      largeTitlePosition: 0
    }
  },
  computed: {
    extended () {
      return !!this.largeTitle
    },
    largeTitleStyle () {
      return {
        top: Math.floor(this.navbarHeight / 3 + this.largeTitlePosition) + 'px'
      }
    }
  },
  mounted () {
    this.getStyleInformation()
    this.watchScrollStatus()
    window.addEventListener('resize', this.getStyleInformation)
    window.addEventListener('scroll', this.watchScrollStatus)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    this.$nextTick(() => window.scroll(0, this.defaultNavbarHeight - 8))
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
      this.defaultNavbarHeight = parseFloat(
        getComputedStyle(this.$refs.iNavDefault)
          .getPropertyValue('height')
      )
    },
    watchScrollStatus () {
      const pageYOffset = window.pageYOffset
      this.defaultNavbarBorder = pageYOffset > this.navbarHeight / 3 || !this.extended
      this.showTitle = pageYOffset + 84 > this.navbarHeight + 8 || !this.extended
      
      if (pageYOffset <= this.defaultNavbarHeight) {
        this.largeTitlePosition = pageYOffset
      } else {
        this.largeTitlePosition = this.defaultNavbarHeight < 0 ?
          0 : this.defaultNavbarHeight
      }
      this.borderOpacity = -(1 - 1 / this.defaultNavbarHeight * pageYOffset) - 0.1
    }
  }
}

</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-navigation-bar {
  display: block;
  width: 100%;
  height: 8rem;

  &.not-extended {
    @media only screen and (min-width: 320px) {
      height: 2rem;
    }

    @media only screen and (min-width: 768px) {
      height: 2.5rem;
    }

    @media only screen and (min-width: 1224px) {
      height: 3rem;
    }
  }

  .i-navigation-bar__default {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9995;
    border-bottom: 1px solid;
    border-color: $light-background-color;

    @media only screen and (min-width: 320px) {
      height: 2.5rem;
      line-height: 2.5rem;
    }

    @media only screen and (min-width: 768px), (min-width: 1224px) {
      height: 3rem;
      line-height: 3rem;
    }

    .i-navigation-bar--mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $light-background-color;

      &.blur {
        // TODO: blur effect implement
        opacity: 1;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 8rem;
    background-color: $light-background-color;
    border-bottom: 1px solid;
    border-color: $light-border-color;

    .i-navigation-bar__large--title {
      position: absolute;
      width: 100%;
      background-color: $light-background-color;
      margin: 0;
      padding-left: 1rem;
      text-align: left;
      font-size: 2rem;
      font-weight: bold;
      z-index: 9994;
    }
    
    .i-navigation-bar__large-area {
      position: absolute;
      top: 5.5rem;
      left: 0;
      width: 100%;
      background-color: $light-background-color;
      overflow: hidden;
    }
  }
}

.i-navigation-bar-enter-active, .i-navigation-bar-leave-active {
  transition: opacity $transition-speed;
}
.i-navigation-bar-enter, .i-navigation-bar-leave-to {
  opacity: 0;
}
</style>
