import iNavigationBar from './components/iNavigationBar.vue'
import iToggle from './components/iToggle.vue'
import iView from './components/iView.vue'

const components = {
  iNavigationBar,
  iToggle,
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
  iNavigationBar,
  iToggle,
  iView
}
