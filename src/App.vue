<template>
  <iApp
    :defaultSubView="'sub-1'"
  >
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
    <template v-slot:main="{ pushView }">
      <Main
        :alert="showAlert"
        @onPushView="pushView"
        @onAlert="onAlert"
      />
    </template>
    <template v-slot:sub="{ isActive }">
      <Sub1 v-show="isActive('sub-1')" :key="1"/>
      <Sub2 v-show="isActive('sub-2')" :key="2"/>
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
import Sub1 from './Sub1.vue'
import Sub2 from './Sub2.vue'

export default {
  name: 'app',
  components: {
    iApp,
    iAlert,
    iButton,
    iSearchField,
    Main,
    Sub1,
    Sub2
  },
  data () {
    return {
      textValue: 'Hello, world!',
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
