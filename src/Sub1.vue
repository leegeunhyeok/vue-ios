<template>
  <iView>
    <iTable :title="'Sub 1'">
      <iTableItem>
        <iLabel class="left">Switch {{ switchValue ? 'On' : 'Off' }}</iLabel>
        <iSwitch class="right" v-model="switchValue"/>
      </iTableItem>
      <iTableItem>
        <iLabel class="left">This is sub1 view!!</iLabel>
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

export default {
  name: 'sub-1',
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
    iView
  }
}
</script>
