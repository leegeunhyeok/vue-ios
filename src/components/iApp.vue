<template>
  <div class="i-app">
    <div class="i-main-area" ref="main">
      <div class="i-header-area">
        <slot name="header"/>
      </div>
      <div class="i-main-view">
        <slot name="main"/>
      </div>
    </div>
    <div class="i-sub-area">
      <iNavigationBar
        :title="subNavigationTitle"
        :static="true"
        v-if="showSubTitle"
      />
      <div class="i-sub-view">
        <slot name="sub"/>
      </div>
    </div>
  </div>
</template>

<script>
import iNavigationBar from '@/components/iNavigationBar'

export default {
  name: 'iApp',
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
html, body, .i-app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.i-app {
  overflow: hidden;

  .i-main-area, .i-sub-area {
    position: relative;
    height: 100%;
    overflow-y: auto;
  }

  .i-main-area {
    @media only screen and (min-width: 320px) {
      width: 100%;
    }

    @media only screen and (min-width: 700px), screen and (min-width: 768px) {
      width: 35%;
      float: left;
    }
  }

  .i-sub-area {
    @media only screen and (min-width: 320px) {
      width: 100%;
    }

    @media only screen and (min-width: 700px), screen and (min-width: 768px) {
      width: 65%;
      float: right;
    }
  }
}
</style>
