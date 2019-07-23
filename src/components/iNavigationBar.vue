<template>
  <div class="i-navigation-bar" ref="iNav"
    :class="{ 'not-extended': !extended }"
  >
    <div class="i-navigation-bar__default"
      :style="defaultNavbarStyle"
      ref="iNavDefault"
    >
      <div class="i-navigation-bar__mask">
        <transition name="i-navigation-bar" mode="out-in">
          <div class="i-navigation-bar__title-area"
            v-if="showDefaultNavbar"
          >
            <div class="i-navigation-bar__left-area">
              <slot name="titleLeft"/>
            </div>
            <div class="i-navigation-bar__title">
              {{ title }}
            </div>
            <div class="i-navigation-bar__right-area">
              <slot name="titleRight"/>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="i-navigation-bar__large"
      v-if="extended"
    >
      <div class="i-navigation-bar__large__title"
        :style="largeTitleStyle"
      >
        {{ largeTitle }}
      </div>
      <div class="i-navigation-bar__large__area">
        <slot name="largeArea"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'iNavigationBar',
  props: {
    static: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    largeTitle: {
      type: String,
      default: ''
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
      scrollYPos: 0,
      largeTitlePosition: 0,
      event: false
    }
  },
  computed: {
    extended () {
      return !!this.largeTitle
    },
    showDefaultNavbar () {
      return this.showTitle || this.static
    },
    defaultNavbarStyle () {
      return {
        borderColor: `rgba(197, 197, 200, ${this.extended ? this.borderOpacity : 1})`,
        top: `${this.scrollYPos}px`
      }
    },
    largeTitleStyle () {
      return {
        top: Math.floor(this.navbarHeight / 3 + this.largeTitlePosition) + 'px'
      }
    }
  },
  mounted () {
    if (this.$parent.$refs.main && !this.static) {
      this.event = true
      this.getStyleInformation()
      this.watchScrollStatus()
      this.$parent.$refs.main.addEventListener('resize', this.getStyleInformation)
      this.$parent.$refs.main.addEventListener('scroll', this.watchScrollStatus)
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      this.$nextTick(() => this.$parent.$refs.main.scroll(0, this.defaultNavbarHeight))
    }
  },
  beforeDestroy () {
    if (this.event) {
      this.$parent.$refs.main.addEventListener('resize', this.getStyleInformation)
      this.$parent.$refs.main.removeEventListener('scroll', this.watchScrollStatus)
    }
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
      const scrollYPos = this.$parent.$refs.main.scrollTop
      this.scrollYPos = scrollYPos
      this.defaultNavbarBorder = scrollYPos > this.navbarHeight / 3 || !this.extended
      this.showTitle = scrollYPos + 86 > this.navbarHeight + 8 || !this.extended

      if (scrollYPos <= this.defaultNavbarHeight) {
        this.largeTitlePosition = scrollYPos
      } else {
        this.largeTitlePosition = this.defaultNavbarHeight < 0
          ? 0 : this.defaultNavbarHeight
      }
      this.borderOpacity = -(1 - 1 / this.defaultNavbarHeight * scrollYPos) - 0.1
    }
  }
}

</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-navigation-bar {
  width: 100%;
  height: 8rem;
  vertical-align: top;

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

  &__default {
    position: absolute;
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
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $light-background-color;
  }

  &__title-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  &__title {
    display: inline-block;
    color: #000;
    font-size: .9rem;
    font-weight: bold;
  }

  &__left-area {
    float: left;
  }

  &__right-area {
    float: right;
  }

  &__large {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8rem;
    background-color: $light-background-color;
    border-bottom: 1px solid;
    border-color: $light-border-color;

    &__title {
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

    &__area {
      position: absolute;
      top: 5.5rem;
      left: 0;
      width: 100%;
      padding: 0 1rem;
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
