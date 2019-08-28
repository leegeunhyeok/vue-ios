<template>
  <div class="i-app">
    <transition-group
      :name="mainViewTransition"
    >
      <div class="i-main" :key="'main'"
        :style="mainStyle"
        v-show="activedViewName === 'main' || isSplited"
      >
        <div class="i-header"
          :style="headerStyle"
        >
          <div class="i-header__left">
            <slot name="headerLeft"/>
          </div>
          <div class="i-header__title"
            :style="headerTitleOpacity"
          >
            {{ title }}
          </div>
          <div class="i-header__right">
            <slot name="headerRight"/>
          </div>
        </div>
        <div class="i-main__content" ref="main">
          <div class="i-main__large-header"
            v-if="largeHeader"
          >
            <div class="i-main__large-header__title"
              :style="largeHeaderPosition"
            >
              {{ largeTitle }}
            </div>
            <div class="i-main__large-header__area">
              <slot name="largeHeader"/>
            </div>
          </div>
          <iMainView ref="main">
            <slot name="main"
              :pushView="pushView"
              :isActive="isActive"
            />
          </iMainView>
        </div>
      </div>
      <div class="i-sub" :key="'sub'"
        v-show="activedViewName !== 'main' || isSplited"
      >
        <div class="i-header">
          <div class="i-header__left">
            <slot name="subHeaderLeft"/>
          </div>
          <div class="i-header__title">
            {{ subTitle }}
          </div>
          <div class="i-header__right">
            <slot name="subHeaderRight"/>
          </div>
        </div>
        <div class="i-sub__content" ref="sub">
          <iSubView>
            <transition-group :name="subViewTransition">
              <slot name="sub"
                :pushView="pushView"
                :isActive="isActive"
              />
            </transition-group>
          </iSubView>
        </div>
      </div>
    </transition-group>
    <div class="i-alert-area">
      <slot name="alert"/>
    </div>
  </div>
</template>

<script>
import iMainView from './_iMainView.vue'
import iSubView from './_iSubView.vue'

export default {
  name: 'iApp',
  props: {
    defaultSubView: {
      type: String
    },
    header: {
      type: Boolean
    },
    largeHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Header'
    },
    largeTitle: {
      type: String,
      default: 'Header'
    },
    subTitle: {
      type: String,
      default: 'Header'
    }
  },
  data () {
    return {
      appWidth: 0,
      rootEmPx: 12,
      isSplited: true,
      transitionBlocked: true,
      transitionUnlockTimer: null,
      largeHeaderPositionPx: 0,
      opacity: 1,
      activedViewName: 'main',
      prevActivedViewName: 'main',
      toggle: true
    }
  },
  watch: {
    isSplited () {
      clearTimeout(this.transitionUnlockTimer)
      this.transitionBlocked = true
      this.transitionUnlockTimer = setTimeout(() => {
        this.transitionBlocked = false
      }, 400)
    }
  },
  computed: {
    mainViewTransition () {
      if (this.transitionBlocked) {
        return ''
      }
      return 'view-forward'
    },
    subViewTransition () {
      if (this.transitionBlocked) {
        return ''
      }
      return 'view-forward'
    },
    mainStyle () {
      return {
        'z-index': this.activedViewName === 'main' ? 1 : 0
      }
    },
    headerStyle () {
      return {
        'border-color': `rgba(197, 197, 200, ${this.opacity})`
      }
    },
    headerTitleOpacity () {
      return {
        'opacity': this.opacity
      }
    },
    largeHeaderPosition () {
      return {
        'top': this.largeHeaderPositionPx + 'px'
      }
    }
  },
  components: {
    iMainView,
    iSubView
  },
  created () {
    this.opacity = this.largeHeader ? 0 : 1
  },
  mounted () {
    this.updateAppUI()
    window.addEventListener('resize', this.updateAppUI)
    this.$refs.main.addEventListener('scroll', this.updateScrollUI)
    this.$refs.sub.addEventListener('scroll', this.updateScrollUI)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getRem)
    this.$refs.main.removeEventListener('scroll', this.updateScrollUI)
    this.$refs.sub.removeEventListener('scroll', this.updateScrollUI)
  },
  methods: {
    updateAppUI (ev) {
      this.appWidth = window.innerWidth
      this.updateSplitState()
      this.getRem()
    },
    updateSplitState () {
      if (this.appWidth >= 700) {
        this.isSplited = true
        this.activedViewName = this.defaultSubView
      } else {
        this.isSplited = false
        this.activedViewName = this.prevActivedViewName
      }
    },
    getRem () {
      this.rootEmPx = parseFloat(
        getComputedStyle(document.body)
          .getPropertyValue('font-size')
      )
    },
    updateScrollUI (ev) {
      if (!ev) return 1

      if (!this.largeHeader) {
        return 1
      }

      let opacity = 1
      const scrollTop = ev.target.scrollTop
      if (this.rootEmPx * 4 >= scrollTop) {
        this.largeHeaderPositionPx = scrollTop
        opacity = 0
      } else {
        this.largeHeaderPositionPx = this.rootEmPx * 4
        opacity = (scrollTop - this.rootEmPx * 3) / this.rootEmPx * 3 * 0.1
        opacity = Math.min(opacity, 1)
      }
      this.opacity = opacity
    },
    pushView (name) {
      this.prevActivedViewName = this.activedViewName
      this.activedViewName = name
    },
    isActive (name) {
      return this.activedViewName === name
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/common.scss';

html, body, .i-app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.i-app {
  overflow: hidden;

  .i-main {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    background-color: $light-background-color;

    & {
      @media only screen and (min-width: 320px) {
        width: 100%;
      }

      @media only screen
        and (min-width: 700px)
        and (orientation: portrait),
        screen and (min-width: 768px)
        and (orientation: portrait) {
        border-right: 1px solid $light-border-color;
        width: 42%;
        float: left;
      }

      @media only screen
        and (min-width: 700px)
        and (orientation: landscape),
        screen and (min-width: 768px)
        and (orientation: landscape) {
        border-right: 1px solid $light-border-color;
        width: 37%;
        float: left;
      }
    }

    &__content {
      overflow-y: auto;
      height: 100%;

      @media only screen and (min-width: 320px) {
        padding-top: 2.5rem;
      }

      @media only screen and (min-width: 768px), (min-width: 1224px) {
        padding-top: 3rem;
      }
    }

    &__large-header {
      position: relative;
      border-bottom: 1px solid;
      border-color: $light-border-color;
      background-color: $light-background-color;
      height: 6rem;

      &__title {
        position: absolute;
        width: 100%;
        padding: .25rem 1rem;
        background-color: $light-background-color;
        font-weight: bold;
        font-size: 2rem;
        z-index: 1;
      }

      &__area {
        position: absolute;
        bottom: .5rem;
        width: 100%;
        padding: 0 1rem;
      }
    }
  }

  .i-sub {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow-x: hidden;
    background-color: $light-background-color;

    & {
      @media only screen and (min-width: 320px){
        width: 100%;
      }

      @media only screen
        and (min-width: 700px)
        and (orientation: portrait),
        screen and (min-width: 768px)
        and (orientation: portrait) {
        position: relative;
        width: 58%;
        float: right;
      }

      @media only screen
        and (min-width: 700px)
        and (orientation: landscape),
        screen and (min-width: 768px)
        and (orientation: landscape) {
        position: relative;
        width: 63%;
        float: right;
      }
    }

    &__content {
      overflow-y: auto;
      height: 100%;

      @media only screen and (min-width: 320px)and (orientation: landscape) {
        padding-top: 2.5rem;
      }

      @media only screen and (min-width: 768px), (min-width: 1224px) {
        padding-top: 3rem;
      }
    }
  }
}

.i-header {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  z-index: 2;
  border-bottom: 1px solid;
  border-color: $light-border-color;
  background-color: $light-background-color;

  @media only screen and (min-width: 320px) {
    height: 2.5rem;
    line-height: 2.5rem;
  }

  @media only screen and (min-width: 768px), (min-width: 1224px) {
    height: 3rem;
    line-height: 3rem;
  }

  &__left {
    float: left;
  }

  &__right {
    float: right;
  }

  &__title {
    display: inline-block;
    color: #000;
    font-size: .9rem;
    font-weight: bold;
  }
}

/* Forward transition effect */
.view-forward-enter-active {
  z-index: 1;
  transition: .4s;
}

.view-forward-leave-active {
  z-index: 0;
  transition: .39s;
}

.view-forward-leave-to {
  z-index: 0;
  transform: translateX(-20%);
}

.view-forward-leave {
  z-index: 0;
  transform: translateX(0);
}

.view-forward-enter {
  z-index: 1;
  transform: translateX(100%);
}

.view-forward-enter-to {
  z-index: 1;
  transform: translateX(0);
}

/* Backward transition effect */
.view-backward-enter-active {
  z-index: 0;
  transition: .4s;
}

.view-backward-leave-active {
  z-index: 1;
  transition: .39s;
}

.view-backward-leave-to {
  z-index: 1;
  transform: translateX(100%);
}

.view-backward-leave {
  z-index: 1;
  transform: translateX(0);
}

.view-backward-enter {
  z-index: 0;
  transform: translateX(-20%);
}

.view-backward-enter-to {
  z-index: 0;
  transform: translateX(0);
}

</style>
