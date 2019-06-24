<template>
  <iView id="app">
    <iNavigationBar :title="appTitle" :largeTitle="largeTitle">
      <iTextField slot="largeArea"/>
    </iNavigationBar>
    <iToggle :value="toggleValue" @onChange="toggleValue = $event"/>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
    <h2>Test</h2>
  </iView>
</template>

<script>
import iView from '@/components/iView'
import iTextField from '@/components/iTextField'
import iNavigationBar from '@/components/iNavigationBar'
import iToggle from '@/components/iToggle'

export default {
  name: 'app',
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'Vue.js',
      toggleValue: false
    }
  },
  components: {
    iView,
    iTextField,
    iNavigationBar,
    iToggle
  },
  mounted () {
    const metaContents = [
      'initial-scale=1.0',
      'width=device-width',
      'user-scalable=no',
      'maximum-scale=1'
    ]
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = metaContents.join(',')
    document.head.appendChild(meta)
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
