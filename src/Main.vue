<template>
  <iView :type="'main'">
    <iNavigationBar :title="appTitle" :largeTitle="largeTitle">
      <iButton slot="titleLeft">L</iButton>
      <iSearchField slot="largeArea"
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
          :width="'100%'"
          :maxlength="15"
          :placeholder="'Name'"
          v-model="idValue"
        />
      </iTableItem>
      <iTableItem>
        <iTextField
          :width="'100%'"
          :maxlength="15"
          :type="'password'"
          :placeholder="'Password'"
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
    <iAlert title="iAlert"
      @close="switchValue = false"
      v-show="switchValue"
    >
      <div slot="body">Hello, world!</div>
      <div slot="footer">
        <iButton :bold="true" @click="switchValue = false">Cancel</iButton>
        <iButton @click="switchValue = false">Ok</iButton>
      </div>
    </iAlert>
  </iView>
</template>

<script>
import iAlert from '@/components/iAlert'
import iButton from '@/components/iButton'
import iLabel from '@/components/iLabel'
import iNavigationBar from '@/components/iNavigationBar'
import iSwitch from '@/components/iSwitch'
import iTable from '@/components/iTable'
import iTableItem from '@/components/iTableItem'
import iTextField from '@/components/iTextField'
import iSearchField from '@/components/iSearchField'
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
    iAlert,
    iButton,
    iLabel,
    iNavigationBar,
    iSwitch,
    iTable,
    iTableItem,
    iTextField,
    iSearchField,
    iView
  }
}
</script>
