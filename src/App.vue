<template>
  <iApp>
    <Main v-if="isMain"/>
    <Sub v-if="view === 'sub'"/>
  </iApp>
</template>

<script>
import iApp from '@/components/iApp'

import Main from './Main.vue'
import Sub from './Sub.vue'

export default {
  name: 'app',
  components: {
    iApp,
    Main,
    Sub
  },
  data () {
    return {
      isMain: true,
      view: 'sub'
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
