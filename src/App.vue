<template>
  <iView id="app">
    <iNavigationBar :title="appTitle" :largeTitle="largeTitle">
      <iButton slot="titleLeft">L</iButton>
      <iTextField slot="largeArea" 
        :width="'100%'"
        :maxlength="15"
        v-model="textValue" 
      />
      <iButton slot="titleRight">R</iButton>
    </iNavigationBar>
    <iTable :title="tableTitle">
      <iTableItem>
        <iLabel class="left">Switch {{ switchValue ? 'On' : 'Off' }}</iLabel>
        <iSwitch class="right" v-model="switchValue"/>
      </iTableItem>
      <iTableItem>
        <iButton class="left" @click="count++">Click me</iButton>
        <iLabel class="right">{{ count }}</iLabel>
      </iTableItem>
      <iTableItem>
        <iLabel class="left">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <iLabel class="center">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <iLabel class="right">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
      </iTableItem>
    </iTable>
    <iAlert :title="'iAlert'" v-if="switchValue">
      <div slot="body">Hello, world!</div>
      <div slot="footer">
        <iButton>Cancel</iButton>
        <iButton>Ok</iButton>
      </div>
    </iAlert>
  </iView>
</template>

<script>
import iView from '@/components/iView'
import iTextField from '@/components/iTextField'
import iNavigationBar from '@/components/iNavigationBar'
import iTable from '@/components/iTable'
import iTableItem from '@/components/iTableItem'
import iLabel from '@/components/iLabel'
import iSwitch from '@/components/iSwitch'
import iButton from '@/components/iButton'
import iAlert from '@/components/iAlert'

export default {
  name: 'app',
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'Vue.js',
      textValue: 'Hello, world!',
      tableTitle: 'iTable',
      switchValue: false,
      count: 0
    }
  },
  components: {
    iView,
    iTextField,
    iNavigationBar,
    iTable,
    iTableItem,
    iLabel,
    iSwitch,
    iButton,
    iAlert
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
@import './common/style/transition-dialog.scss';
@import './common/style/transition-fade.scss';

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
