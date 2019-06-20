(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueiOS = {}));
}(this, function (exports) { 'use strict';

  /**
   * @description Toggle status mixin
   */
  var toggle = {
    props: {
      /**
       * @usage <toggle :value="false"/>
       */
      value: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted () {
      this.$refs.target.addEventListener('change', this.change);
    },
    beforeDestroy: function beforeDestroy () {
      this.$refs.target.removeEventListener('change', this.change);
    },
    methods: {
      change: function change (event) {
        this.$emit('onChange', event.target.checked);
      }
    }
  };

  //

  var script = {
    name: 'iToggle',
    mixins: [ toggle ]
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("label", { staticClass: "i-toggle" }, [
      _c("input", {
        ref: "target",
        attrs: { type: "checkbox" },
        domProps: { value: _vm.value }
      }),
      _vm._v(" "),
      _c("span", { staticClass: "i-toggle--slider" })
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-0671666d_0", { source: ".i-toggle {\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  width: 3.5rem;\n  height: 2.166rem;\n}\n.i-toggle input[type=checkbox] {\n  display: none;\n  outline: none;\n  width: 0;\n  height: 0;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 1.083rem;\n  background-color: #eaeaeb;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider:before {\n  content: \"\";\n  position: absolute;\n  height: 1.833rem;\n  width: 1.833rem;\n  left: 0.163rem;\n  bottom: 0.166rem;\n  border-radius: 50%;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  background-color: #fff;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider {\n  background-color: #34c759;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider:before {\n  transform: translateX(1.333rem);\n}\n\n/*# sourceMappingURL=iToggle.vue.map */", map: {"version":3,"sources":["D:\\Source\\vue-ios\\src\\components\\iToggle\\iToggle.vue","iToggle.vue"],"names":[],"mappings":"AAuBA;ECtBE,wCAAwC;EDwB1C,kBAAA;EACA,cAAA;EACA,aAAA;EACA,gBAAA;ACtBA;ADwBA;EACA,aAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;ACtBA;ADwBA;EACA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,yBAvBA;EAwBA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ACtBA;ADwBA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EACA,0CAAA;EACA,sBAAA;EACA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ACtBA;AD4BA;EACA,yBApDA;AC0BA;AD6BA;EACA,+BAAA;AC3BA;;AAEA,sCAAsC","file":"iToggle.vue","sourcesContent":["<template>\r\n  <label class=\"i-toggle\">\r\n    <input type=\"checkbox\" ref=\"target\" :value=\"value\">\r\n    <span class=\"i-toggle--slider\"></span>\r\n  </label>\r\n</template>\r\n\r\n<script>\r\nimport toggle from '@/mixins/toggle'\r\n\r\nexport default {\r\n  name: 'iToggle',\r\n  mixins: [ toggle ]\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../../common/style/common.scss';\r\n@import '../../common/style/mixin.scss';\r\n$toggle-color-active: #34c759;\r\n$toggle-color-deactive: #eaeaeb;\r\n\r\n.i-toggle {\r\n  @include tap-highlight-disable;\r\n  position: relative;\r\n  display: block;\r\n  width: 3.5rem;\r\n  height: 2.166rem;\r\n\r\n  input[type=checkbox] {\r\n    display: none;\r\n    outline: none;\r\n    width: 0;\r\n    height: 0;\r\n\r\n    & + span.i-toggle--slider {\r\n      cursor: pointer;\r\n      position: absolute;\r\n      top: 0;\r\n      left: 0;\r\n      right: 0;\r\n      bottom: 0;\r\n      border-radius: 1.083rem;\r\n      background-color: $toggle-color-deactive;\r\n      -webkit-transition: $transition-speed;\r\n         -moz-transition: $transition-speed;\r\n          -ms-transition: $transition-speed;\r\n           -o-transition: $transition-speed;\r\n              transition: $transition-speed;\r\n\r\n      &:before {\r\n        content: \"\";\r\n        position: absolute;\r\n        height: 1.833rem;\r\n        width: 1.833rem;\r\n        left: 0.163rem;\r\n        bottom: 0.166rem;\r\n        border-radius: 50%;\r\n        box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);\r\n        background-color: #fff;\r\n        -webkit-transition: $transition-speed;\r\n           -moz-transition: $transition-speed;\r\n            -ms-transition: $transition-speed;\r\n             -o-transition: $transition-speed;\r\n                transition: $transition-speed;\r\n      }\r\n    }\r\n\r\n    &:checked {\r\n\r\n      & + span.i-toggle--slider {\r\n        background-color: $toggle-color-active;\r\n      }\r\n\r\n      & + span.i-toggle--slider:before {\r\n        transform: translateX(1.333rem);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n</style>\r\n",".i-toggle {\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  width: 3.5rem;\n  height: 2.166rem;\n}\n.i-toggle input[type=checkbox] {\n  display: none;\n  outline: none;\n  width: 0;\n  height: 0;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 1.083rem;\n  background-color: #eaeaeb;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider:before {\n  content: \"\";\n  position: absolute;\n  height: 1.833rem;\n  width: 1.833rem;\n  left: 0.163rem;\n  bottom: 0.166rem;\n  border-radius: 50%;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  background-color: #fff;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider {\n  background-color: #34c759;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider:before {\n  transform: translateX(1.333rem);\n}\n\n/*# sourceMappingURL=iToggle.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var iToggle = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  var components = {
    iToggle: iToggle
  };

  function install(Vue) {
  	if (install.installed) { return }
    install.installed = true;
    Object.keys(components).forEach(function (name) {
      Vue.component(name, components[name]);
    });
  }

  var plugin = {
  	install: install
  };

  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }

  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.iToggle = iToggle;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
