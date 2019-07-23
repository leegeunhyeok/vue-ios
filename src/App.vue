<template>
  <iApp>
    <iNavigationBar
      :title="appTitle"
      :largeTitle="largeTitle"
      slot="header"
    >
      <iButton slot="titleLeft">L</iButton>
      <iSearchField slot="largeArea"
        :width="'100%'"
        :maxlength="15"
        v-model="textValue"
      />
      <iButton slot="titleRight">R</iButton>
    </iNavigationBar>
    <Main v-if="isMain" slot="main"/>
    <Sub v-if="true" slot="sub"/>
  </iApp>
</template>

<script>
import iApp from '@/components/iApp'
import iAlert from '@/components/iAlert'
import iButton from '@/components/iButton'
import iLabel from '@/components/iLabel'
import iNavigationBar from '@/components/iNavigationBar'
import iNavigator from '@/components/iNavigator'
import iSwitch from '@/components/iSwitch'
import iTable from '@/components/iTable'
import iTableItem from '@/components/iTableItem'
import iTextField from '@/components/iTextField'
import iSearchField from '@/components/iSearchField'
import iView from '@/components/iView'

import Main from './Main.vue'
import Sub from './Sub.vue'

export default {
  name: 'app',
  components: {
    iApp,
    iAlert,
    iButton,
    iLabel,
    iNavigationBar,
    iNavigator,
    iSwitch,
    iTable,
    iTableItem,
    iTextField,
    iSearchField,
    iView,
    Main,
    Sub
  },
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'iOS Vue',
      textValue: 'Hello, world!',
      tableTitle: 'iTable',
      switchValue: false,
      idValue: '',
      passwordValue: '',
      count: 0,
      isMain: true,
      view: 'main'
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
