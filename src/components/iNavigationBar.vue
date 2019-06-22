<template>
  <div class="i-navigation-bar" ref="iNav"
    :class="{ 'not-extended': !extended }"
  >
    <div class="i-navigation-bar__default"
      :class="{ 'navbar-border': defaultNavbarBorder }"
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
      <h2 class="i-navigation-bar__large--title"
        :style="largeTitleStyle"
      >
        {{ largeTitle }}
      </h2>
    </div>
    <div class="i-navigation-bar__large-area">
      <!-- Content -->
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
      showTitle: true,
      defaultNavbarBorder: false,
      largeTitlePosition: 0
    }
  },
  computed: {
    extended () {
      return !!this.largeTitle
    },
    navigationClass () {
      return {
        blur: this.blur
      }
    },
    largeTitleStyle () {
      return {
        top: this.navbarHeight / 3 + this.largeTitlePosition + 'px'
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
      this.defaultNavbarHeight = parseFloat(
        getComputedStyle(this.$refs.iNavDefault)
          .getPropertyValue('height')
      )
    },
    watchScrollStatus () {
      const pageYOffset = window.pageYOffset
      this.defaultNavbarBorder = pageYOffset > this.navbarHeight / 3 || !this.extended
      this.showTitle = pageYOffset + 84 > this.navbarHeight || !this.extended
      if (pageYOffset <= this.defaultNavbarHeight) {
        this.largeTitlePosition = pageYOffset
      } else {
        this.largeTitlePosition = this.defaultNavbarHeight < 0 ?
          0 : this.defaultNavbarHeight
      }
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

.i-navigation-bar {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;

  @media only screen and (min-width: 320px) {
    height: 8.5rem;
  }

  @media only screen and (min-width: 768px) {
    height: 9rem;
  }

  @media only screen and (min-width: 1224px) {
    height: 9.5rem;
  }

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
    -webkit-transition: border-color $transition-speed;
       -moz-transition: border-color $transition-speed;
        -ms-transition: border-color $transition-speed;
         -o-transition: border-color $transition-speed;
            transition: border-color $transition-speed;

    &.navbar-border {
      border-color: $light-border-color;
    }

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

    .i-navigation-bar__large--title {
      position: absolute;
      text-align: left;
      margin: 0;
      padding-left: 1rem;
      font-size: 2rem;
      font-weight: bold;
    }
    
    .i-navigation-bar__large-area {
      position: absolute;
      top: 6rem;
      left: 0;
      width: 100%;
      height: 2rem;
      background-color: $light-background-color;
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
