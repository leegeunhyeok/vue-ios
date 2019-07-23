<template>
  <iView>
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
        <iLabel class="left">{{ textValue || 'No text' }}</iLabel>
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
        <iLabel class="left">Vue.js</iLabel>
        <iLabel class="right">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <iLabel class="left">Vue.js</iLabel>
        <iLabel class="center">Vue.js</iLabel>
        <iLabel class="right">Vue.js</iLabel>
      </iTableItem>
    </iTable>
    <iTable :title="'Register'">
      <iTableItem>
        <iTextField
          width="100%"
          maxlength="15"
          placeholder="Name"
          v-model="idValue"
        />
      </iTableItem>
      <iTableItem>
        <iTextField
          width="100%"
          maxlength="15"
          type="password"
          placeholder="Password"
          v-model="passwordValue"
        />
      </iTableItem>
      <iTableItem>
        <h2>ID:{{ idValue }}</h2>
      </iTableItem>
      <iTableItem>
        <h2>Password: {{ passwordValue }}</h2>
      </iTableItem>
    </iTable>
  </iView>
</template>

<script>
import iButton from '@/components/iButton'
import iLabel from '@/components/iLabel'
import iSwitch from '@/components/iSwitch'
import iTable from '@/components/iTable'
import iTableItem from '@/components/iTableItem'
import iTextField from '@/components/iTextField'
import iView from '@/components/iView'

export default {
  name: 'app',
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'iOS Vue',
      textValue: 'Hello, world!',
      tableTitle: 'iTable',
      switchValue: false,
      idValue: '',
      passwordValue: '',
      count: 0
    }
  },
  components: {
    iButton,
    iLabel,
    iSwitch,
    iTable,
    iTableItem,
    iTextField,
    iView
  },
  watch: {
    switchValue (newVal) {
      if (newVal) {
        this.$emit('onAlert')
      }
    }
  }
}
</script>
