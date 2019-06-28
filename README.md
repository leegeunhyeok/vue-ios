<p align="center">
  <img width="200" src="https://user-images.githubusercontent.com/26512984/59761543-13875580-92d0-11e9-871c-2874fa82e332.png">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-ios">
    <img alt="npm" src="https://img.shields.io/npm/v/vue-ios.svg">
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

```
npm install vue-ios
```

- Preview

<img src="https://user-images.githubusercontent.com/26512984/60333033-0d316180-99d3-11e9-9f2b-50cb5effe524.gif">

```html
<template>
  <iView id="app">
    <iNavigationBar :title="appTitle" :largeTitle="largeTitle">
      <iButton slot="titleLeft">L</iButton>
      <iTextField slot="largeArea" 
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
        <iLabel class="left">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <iLabel class="center">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <iLabel class="right">Vue.js</iLabel>
      </iTableItem>
      <iTableItem>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
        <h2>{{ textValue || 'No text' }}</h2>
      </iTableItem>
    </iTable>
  </iView>
</template>

<script>
import {
  iView,
  iTextField,
  iNavigationBar
  iTable,
  iTableItem,
  iLabel,
  iSwitch,
  iButton
} from 'vue-ios'

export default {
  name: 'app',
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'Vue.js',
      textValue: 'Hello, world!',
      tableTitle: 'iTable',
      switchValue: true,
      count: 0
    }
  },
  components: {
    iView,
    iTextField,
    iNavigationBar,
    iTable,
    iTableItem,
    iLabel,
    iSwitch,
    iButton
  }
}
</script>
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
