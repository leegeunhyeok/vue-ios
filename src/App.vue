<template>
  <iApp>
    <div>
      <iButton slot="titleLeft">L</iButton>
      <iSearchField slot="largeArea"
        width="100%"
        maxlength="15"
        v-model="textValue"
      />
      <iButton slot="titleRight">R</iButton>
    </div>
    <Main slot="main" 
      :alert="showAlert"
      @onAlert="onAlert"
      v-if="isMain"
    />
    <Sub slot="sub" v-if="true"/>
    <iAlert slot="alert"
      title="iAlert"
      @close="showAlert = false"
      v-show="showAlert"
    >
      <div slot="body">{{ textValue }}</div>
      <div slot="footer">
        <iButton bold="true" @click="showAlert = false">Cancel</iButton>
        <iButton @click="showAlert = false">Ok</iButton>
      </div>
    </iAlert>
  </iApp>
</template>

<script>
import iApp from '@/components/iApp'
import iAlert from '@/components/iAlert'
import iButton from '@/components/iButton'
import iNavigationBar from '@/components/iNavigationBar'
import iSearchField from '@/components/iSearchField'

import Main from './Main.vue'
import Sub from './Sub.vue'

export default {
  name: 'app',
  components: {
    iApp,
    iAlert,
    iButton,
    iNavigationBar,
    iSearchField,
    Main,
    Sub
  },
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'iOS Vue',
      textValue: 'Hello, world!',
      tableTitle: 'iTable',
      isMain: true,
      showAlert: false
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
  },
  methods: {
    onAlert ($event) {
      this.showAlert = $event
    }
  }
}
</script>
