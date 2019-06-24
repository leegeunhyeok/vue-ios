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

```html
<template>
  <iView id="app">
    <iNavigationBar :title="appTitle" :largeTitle="largeTitle"/>
    <iToggle v-model="toggleValue"/>
  </iView>
</template>

<script>
import {
  iView,
  iNavigationBar,
  iToggle
} from 'vue-ios'

export default {
  name: 'app',
  data () {
    return {
      appTitle: 'iOS Vue',
      largeTitle: 'Vue.js',
      toggleValue: false
    }
  },
  components: {
    iView,
    iNavigationBar,
    iToggle
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
