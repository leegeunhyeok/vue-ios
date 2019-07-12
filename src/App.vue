<template>
  <iApp>
    <iNavigationBar :title="appTitle" :largeTitle="largeTitle">
      <iButton slot="titleLeft">L</iButton>
      <iSearchField slot="largeArea"
        :width="'100%'"
        :maxlength="15"
        v-model="textValue"
      />
      <iButton slot="titleRight">R</iButton>
    </iNavigationBar>
    <iNavigator>
      <Main v-if="isMain"/>
      <Sub v-else/>
    </iNavigator>
  </iApp>
</template>

<script>
import iApp from '@/components/iApp'
import iNavigator from '@/components/iNavigator'
import iNavigationBar from '@/components/iNavigationBar'
import iButton from '@/components/iButton'
import iSearchField from '@/components/iSearchField'

import Main from './Main.vue'
import Sub from './Sub.vue'

export default {
  name: 'app',
  components: {
    iApp,
    iNavigator,
    iNavigationBar,
    iButton,
    iSearchField,
    Main,
    Sub
  },
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'iOS Vue',
      textValue: 'test',
      isMain: true
    }
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
