<template>
  <div class="i-app">
    <div class="i-main">
      <div class="i-header">
        <div class="i-header__left">
          <slot name="headerLeft"/>
        </div>
        <div class="i-header__title">
          {{ title }}
        </div>
        <div class="i-header__right">
          <slot name="headerRight"/>
        </div>
      </div>
      <div class="i-main__content">
        <iMainView ref="main">
          <slot name="main"/>
        </iMainView>
      </div>
    </div>
    <div class="i-sub">
      <div class="i-header">
        <div class="i-header__left">
          <slot name="headerLeft"/>
        </div>
        <div class="i-header__title">
          {{ subTitle }}
        </div>
        <div class="i-header__right">
          <slot name="headerRight"/>
        </div>
      </div>
      <div class="i-sub__content">
        <iSubView>
          <slot name="sub"/>
        </iSubView>
      </div>
    </div>
    <div class="i-alert-area">
      <slot name="alert"/>
    </div>
  </div>
</template>

<script>
import iMainView from '@/components/_iMainView'
import iSubView from '@/components/_iSubView'
import iNavigationBar from '@/components/iNavigationBar'

export default {
  name: 'iApp',
  props: {
    header: {
      type: Boolean
    },
    title: {
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
      subNavigationTitle: 'Sub view',
      showSubTitle: false
    }
  },
  watch: {
    $iWidth (newVal) {
      this.showSubTitle = newVal >= 700
    }
  },
  components: {
    iMainView,
    iSubView,
    iNavigationBar
  },
  mounted () {
    window.addEventListener('resize', this.watchWindowSize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.watchWindowSize)
  },
  methods: {
    watchWindowSize () {
      this.$iWidth = event.target.innerWidth
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
}

.i-app {
  overflow: hidden;

  .i-main {
    position: relative;
    height: 100%;

    & {
      @media only screen and (min-width: 320px) {
        width: 100%;
      }

      @media only screen and (min-width: 700px), screen and (min-width: 768px) {
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
  }

  .i-sub {
    position: relative;
    height: 100%;

    & {
      @media only screen and (min-width: 320px) {
        width: 0%;
      }

      @media only screen and (min-width: 700px), screen and (min-width: 768px) {
        width: 63%;
        float: right;
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
  }
}

.i-header {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  z-index: 1;
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
</style>
