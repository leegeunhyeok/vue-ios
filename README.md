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

## Usage

```bash
npm install vue-ios
```

- Preview

<img src="https://user-images.githubusercontent.com/26512984/60678481-965b0380-9ebf-11e9-9092-4832cbad9a55.gif">

```html
<template>
  <iView id="app">
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
import {
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
} from 'vue-ios'

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
    iSearchField,
    iSwitch,
    iTable,
    iTableItem,
    iTextField,
    iView
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

<style>

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
```

## Project setup
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
