<template>
  <div class="i-app">
    <div class="i-main-area">
      <div class="test">
        Hello
      </div>
      <div class="i-main-content">        
        <iMainView ref="main">
          <slot name="main"/>
        </iMainView>      
      </div>
    </div>
    <iSubView>
      <iNavigationBar static="true"
        :title="subNavigationTitle"
        v-if="showSubTitle"
      />
      <slot name="sub"/>
    </iSubView>
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

  .i-main-area {
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

    .i-main-content {
      overflow-y: auto;
      height: 100%;
    }
  }
}

.test {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: red;
}
</style>
