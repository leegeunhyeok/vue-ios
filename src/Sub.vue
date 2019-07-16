<template>
  <iView>
    <iNavigationBar :title="'Sub'" :largeTitle="'Sub'">
      <iButton slot="titleLeft">L</iButton>
      <iSearchField slot="largeArea"
        :width="'100%'"
        :maxlength="15"
        v-model="textValue"
      />
      <iButton slot="titleRight">R</iButton>
    </iNavigationBar>
    <iTable :title="'Sub'">
      <iTableItem>
        <iLabel class="left">Switch {{ switchValue ? 'On' : 'Off' }}</iLabel>
        <iSwitch class="right" v-model="switchValue"/>
      </iTableItem>
    </iTable>
  </iView>
</template>

<script>
import iLabel from '@/components/iLabel'
import iSwitch from '@/components/iSwitch'
import iTable from '@/components/iTable'
import iTableItem from '@/components/iTableItem'
import iView from '@/components/iView'
import iNavigationBar from '@/components/iNavigationBar'

export default {
  name: 'app',
  data () {
    return {
      switchValue: false
    }
  },
  components: {
    iLabel,
    iSwitch,
    iTable,
    iTableItem,
    iView,
    iNavigationBar
  }
}
</script>
