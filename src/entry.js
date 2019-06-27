import iLabel from './components/iLabel.vue'
import iNavigationBar from './components/iNavigationBar.vue'
import iSwitch from './components/iSwitch.vue'
import iTable from './components/iTable.vue'
import iTableItem from './components/iTableItem.vue'
import iTextField from './components/iTextField.vue'
import iView from './components/iView.vue'

const components = {
  iLabel,
  iNavigationBar,
  iSwitch,
  iTable,
  iTableItem,
  iTextField,
  iView
}

export function install(Vue) {
	if (install.installed) return
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
  iLabel,
  iNavigationBar,
  iSwitch,
  iTable,
  iTableItem,
  iTextField,
  iView
}
