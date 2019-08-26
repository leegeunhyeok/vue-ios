<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/26512984/59761543-13875580-92d0-11e9-871c-2874fa82e332.png">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-ios">
    <img alt="npm" src="https://img.shields.io/npm/v/vue-ios.svg">
  </a>
  <a>
    <img alt="npm" src="https://img.shields.io/npm/dm/vue-ios.svg">
  </a>
  <a href="https://www.npmjs.com/package/vue-ios">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/vue-ios.svg">
  </a>
  <a href="#">
    <img alt="NPM" src="https://img.shields.io/npm/l/vue-ios.svg">
  </a>
  <a href="#">
    <img alt="Vue version" src="https://img.shields.io/badge/vue-2.6.10-green.svg">
  </a>
</p>

<h1 align="center">vue-ios</h1>
<p align="center">🍎 iOS Style components library for Vue.js</p>

## :sparkles: Usage

```bash
npm install vue-ios
```

- Preview

<img src="https://user-images.githubusercontent.com/26512984/63633927-1107fa00-c68b-11e9-8950-62ace6544d74.gif">

```html
<template>
  <!-- App.vue -->
  <iApp>
    <iButton slot="headerLeft">L</iButton>
    <iButton slot="headerRight">R</iButton>
    <iSearchField slot="largeHeader"
      width="100%"
      maxlength="15"
      v-model="textValue"
    />
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
import {
  iApp,
  iAlert,
  iButton,
  iNavigationBar,
  iSearchField
} from 'vue-ios'

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
  methods: {
    onAlert ($event) {
      this.showAlert = $event
    }
  }
}
</script>
```

```html
<template>
  <!-- Main.vue -->
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
import {
  iButton,
  iLabel,
  iSwitch,
  iTable,
  iTableItem,
  iTextField,
  iView
} from 'ios-vue'

export default {
  name: 'app',
  props: {
    alert: {
      type: Boolean
    }
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
    alert (newVal) {
      this.switchValue = newVal
    },
    switchValue (newVal) {
      this.$emit('onAlert', newVal)
    }
  },
  created () {
    this.switchValue = this.alert
  }
}
</script>
```

```html
<template>
  <!-- Sub.vue -->
  <iView>
    <iTable :title="'Sub'">
      <iTableItem>
        <iLabel class="left">Switch {{ switchValue ? 'On' : 'Off' }}</iLabel>
        <iSwitch class="right" v-model="switchValue"/>
      </iTableItem>
    </iTable>
  </iView>
</template>

<script>
import {
  iLabel,
  iSwitch,
  iTable,
  iTableItem,
  iView
} from 'vue-ios'

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
    iView
  }
}
</script>
```

## :pencil: TODO

- :sparkles: ~~iOS Style basic components~~ [ :heavy_check_mark: ]
- :full_moon_with_face: ~~iOS Light theme~~ [ :heavy_check_mark: ]
- :new_moon_with_face: iOS Dark theme [ :x: ]
- :couple: ~~iOS Split view~~ [ :heavy_check_mark: ]
- :arrow_heading_up: View routing [ :x: ]
- :zap: Improve performance!
- :christmas_tree: Like a real iOS style!
- :baby: Make easy to use!
- :sparkling_heart: More components and features!

## :construction_worker: Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
