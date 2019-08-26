import iAlert from './components/iAlert.vue'
import iApp from './components/iApp.vue'
import iButton from './components/iButton.vue'
import iLabel from './components/iLabel.vue'
import iSearchField from './components/iSearchField.vue'
import iSwitch from './components/iSwitch.vue'
import iTable from './components/iTable.vue'
import iTableItem from './components/iTableItem.vue'
import iTextField from './components/iTextField.vue'
import iView from './components/iView.vue'

const components = {
  iAlert,
  iApp,
  iButton,
  iLabel,
  iSearchField,
  iSwitch,
  iTable,
  iTableItem,
  iTextField,
  iView
}

export function install (Vue) {
  if (install.installed) {
    return
  }

  install.installed = true
  Object.keys(components).forEach(name => {
    Vue.component(name, components[name])
  })
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export {
  iAlert,
  iApp,
  iButton,
  iLabel,
  iSearchField,
  iSwitch,
  iTable,
  iTableItem,
  iTextField,
  iView
}
