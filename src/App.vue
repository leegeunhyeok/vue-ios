<template>
  <iApp>
    <template v-slot:headerLeft>
      <iButton>L</iButton>
    </template>
    <template v-slot:headerRight>
      <iButton>R</iButton>
    </template>
    <template v-slot:largeHeader>
      <iSearchField
        :width="'100%'"
        :maxlength="'15'"
        v-model="textValue"
      />
    </template>
    <template v-slot:main>
      <Main
        :alert="showAlert"
        @onAlert="onAlert"
        v-if="isMain"
      />
    </template>
    <template v-slot:sub>
      <Sub v-if="true"/>
    </template>
    <template v-slot:alert>
      <iAlert
        :title="'iAlert'"
        @close="showAlert = false"
        v-show="showAlert"
      >
        <template v-slot:body>{{ textValue }}</template>
        <template v-slot:footer>
          <div>
            <iButton bold="true" @click="showAlert = false">Cancel</iButton>
            <iButton @click="showAlert = false">Ok</iButton>
          </div>
        </template>
      </iAlert>
    </template>
  </iApp>
</template>

<script>
import iApp from '@/components/iApp'
import iAlert from '@/components/iAlert'
import iButton from '@/components/iButton'
import iSearchField from '@/components/iSearchField'

import Main from './Main.vue'
import Sub from './Sub.vue'

export default {
  name: 'app',
  components: {
    iApp,
    iAlert,
    iButton,
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
