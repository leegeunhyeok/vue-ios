//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'iAppbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    blur: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#f2f2f7',
      validator: function validator (value) {
        return !!value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/i)
      }
    },
    opacity: {
      type: Number,
      default: 0.5
    },
    extend: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      pixel: 12
    }
  },
  computed: {
    navigationClass: function navigationClass () {
      return {
        blur: this.blur
      }
    },
    navigationStyle: function navigationStyle () {
      return {
        backgroundColor: this.color
      }
    }
  },
  mounted: function mounted () {
    this.getFontPixel();
    window.addEventListener('resize', this.getFontPixel);
    window.addEventListener('scroll', this.watchScrollStatus);
  },
  beforeDestroy: function beforeDestroy () {
    window.addEventListener('resize', this.getFontPixel);
    window.removeEventListener('scroll', this.watchScrollStatus);
  },
  methods: {
    getFontPixel: function getFontPixel () {
      this.pixel = parseFloat(
        getComputedStyle(document.body)
          .getPropertyValue('font-size')
      );
    },
    watchScrollStatus: function watchScrollStatus () {
      // const height = this.pixel * 2
    }
  }
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
  return _c(
    "div",
    { staticClass: "i-navigation-bar" },
    [
      _c("transition", [
        !_vm.extend
          ? _c(
              "div",
              {
                staticClass: "i-navigation-bar__default",
                style: _vm.navigationStyle
              },
              [
                _c("div", {
                  staticClass: "i-navigation-bar--mask",
                  class: { blur: _vm.blur }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "i-navigation-bar--title" }, [
                  _vm._v("\n        " + _vm._s(_vm.title) + "\n      ")
                ])
              ]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-77cef01e_0", { source: ".i-navigation-bar {\n  display: inline-block;\n  width: 100%;\n  margin-bottom: 10px;\n}\n@media only screen and (min-width: 320px) {\n.i-navigation-bar {\n    padding-top: 2.5rem;\n}\n}\n@media only screen and (min-width: 768px) {\n.i-navigation-bar {\n    padding-top: 3rem;\n}\n}\n@media only screen and (min-width: 1224px) {\n.i-navigation-bar {\n    padding-top: 3.5rem;\n}\n}\n.i-navigation-bar .i-navigation-bar__default {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 9995;\n}\n@media only screen and (min-width: 320px) {\n.i-navigation-bar .i-navigation-bar__default {\n    height: 2.5rem;\n    line-height: 2.5rem;\n}\n}\n@media only screen and (min-width: 768px) {\n.i-navigation-bar .i-navigation-bar__default {\n    height: 3rem;\n    line-height: 3rem;\n}\n}\n@media only screen and (min-width: 1224px) {\n.i-navigation-bar .i-navigation-bar__default {\n    height: 3.5rem;\n    line-height: 3.5rem;\n}\n}\n.i-navigation-bar .i-navigation-bar__default .i-navigation-bar--mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.i-navigation-bar .i-navigation-bar__default .i-navigation-bar--mask.blur {\n  opacity: 0.95;\n}\n.i-navigation-bar .i-navigation-bar__default .i-navigation-bar--title {\n  color: #000;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/*# sourceMappingURL=iNavigationBar.vue.map */", map: {"version":3,"sources":["D:\\Source\\vue-ios\\src\\components\\iNavigationBar.vue","iNavigationBar.vue"],"names":[],"mappings":"AA0FA;EACA,qBAAA;EACA,WAAA;EACA,mBAAA;ACzFA;AD2FA;AALA;IAMA,mBAAA;ACxFE;AACF;AD0FA;AATA;IAUA,iBAAA;ACvFE;AACF;ADyFA;AAbA;IAcA,mBAAA;ACtFE;AACF;ADwFA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,aAAA;ACtFA;ADwFA;AAPA;IAQA,cAAA;IACA,mBAAA;ACrFE;AACF;ADuFA;AAZA;IAaA,YAAA;IACA,iBAAA;ACpFE;AACF;ADsFA;AAjBA;IAkBA,cAAA;IACA,mBAAA;ACnFE;AACF;ADqFA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;ACnFA;ADqFA;EAEA,aAAA;ACpFA;ADwFA;EACA,WAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;ACtFA;;AAEA,6CAA6C","file":"iNavigationBar.vue","sourcesContent":["<template>\r\n  <div class=\"i-navigation-bar\">\r\n    <transition>\r\n      <div class=\"i-navigation-bar__default\"\r\n        :style=\"navigationStyle\"\r\n        v-if=\"!extend\"\r\n      >\r\n        <div class=\"i-navigation-bar--mask\"\r\n          :class=\"{ blur }\"\r\n        />\r\n\r\n        <div class=\"i-navigation-bar--title\">\r\n          {{ title }}\r\n        </div>\r\n      </div>\r\n    </transition>\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iAppbar',\r\n  props: {\r\n    title: {\r\n      type: String,\r\n      default: ''\r\n    },\r\n    blur: {\r\n      type: Boolean,\r\n      default: true\r\n    },\r\n    color: {\r\n      type: String,\r\n      default: '#f2f2f7',\r\n      validator (value) {\r\n        return !!value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/i)\r\n      }\r\n    },\r\n    opacity: {\r\n      type: Number,\r\n      default: 0.5\r\n    },\r\n    extend: {\r\n      type: Boolean,\r\n      default: false\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      pixel: 12\r\n    }\r\n  },\r\n  computed: {\r\n    navigationClass () {\r\n      return {\r\n        blur: this.blur\r\n      }\r\n    },\r\n    navigationStyle () {\r\n      return {\r\n        backgroundColor: this.color\r\n      }\r\n    }\r\n  },\r\n  mounted () {\r\n    this.getFontPixel()\r\n    window.addEventListener('resize', this.getFontPixel)\r\n    window.addEventListener('scroll', this.watchScrollStatus)\r\n  },\r\n  beforeDestroy () {\r\n    window.addEventListener('resize', this.getFontPixel)\r\n    window.removeEventListener('scroll', this.watchScrollStatus)\r\n  },\r\n  methods: {\r\n    getFontPixel () {\r\n      this.pixel = parseFloat(\r\n        getComputedStyle(document.body)\r\n          .getPropertyValue('font-size')\r\n      )\r\n    },\r\n    watchScrollStatus () {\r\n      // const height = this.pixel * 2\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n\r\n.i-navigation-bar {\r\n  display: inline-block;\r\n  width: 100%;\r\n  margin-bottom: 10px;\r\n\r\n  @media only screen and (min-width: 320px) {\r\n    padding-top: 2.5rem;\r\n  }\r\n\r\n  @media only screen and (min-width: 768px) {\r\n    padding-top: 3rem;\r\n  }\r\n\r\n  @media only screen and (min-width: 1224px) {\r\n    padding-top: 3.5rem;\r\n  }\r\n\r\n  .i-navigation-bar__default {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    z-index: 9995;\r\n\r\n    @media only screen and (min-width: 320px) {\r\n      height: 2.5rem;\r\n      line-height: 2.5rem;\r\n    }\r\n\r\n    @media only screen and (min-width: 768px) {\r\n      height: 3rem;\r\n      line-height: 3rem;\r\n    }\r\n\r\n    @media only screen and (min-width: 1224px) {\r\n      height: 3.5rem;\r\n      line-height: 3.5rem;\r\n    }\r\n\r\n    .i-navigation-bar--mask {\r\n      position: absolute;\r\n      top: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 100%;\r\n\r\n      &.blur {\r\n        // TODO: blur effect implement\r\n        opacity: .95;\r\n      }\r\n    }\r\n\r\n    .i-navigation-bar--title {\r\n      color: #000;\r\n      position: absolute;\r\n      top: 0;\r\n      left: 0;\r\n      width: 100%;\r\n      height: 100%;\r\n    }\r\n  }\r\n}\r\n</style>\r\n",".i-navigation-bar {\n  display: inline-block;\n  width: 100%;\n  margin-bottom: 10px;\n}\n@media only screen and (min-width: 320px) {\n  .i-navigation-bar {\n    padding-top: 2.5rem;\n  }\n}\n@media only screen and (min-width: 768px) {\n  .i-navigation-bar {\n    padding-top: 3rem;\n  }\n}\n@media only screen and (min-width: 1224px) {\n  .i-navigation-bar {\n    padding-top: 3.5rem;\n  }\n}\n.i-navigation-bar .i-navigation-bar__default {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 9995;\n}\n@media only screen and (min-width: 320px) {\n  .i-navigation-bar .i-navigation-bar__default {\n    height: 2.5rem;\n    line-height: 2.5rem;\n  }\n}\n@media only screen and (min-width: 768px) {\n  .i-navigation-bar .i-navigation-bar__default {\n    height: 3rem;\n    line-height: 3rem;\n  }\n}\n@media only screen and (min-width: 1224px) {\n  .i-navigation-bar .i-navigation-bar__default {\n    height: 3.5rem;\n    line-height: 3.5rem;\n  }\n}\n.i-navigation-bar .i-navigation-bar__default .i-navigation-bar--mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.i-navigation-bar .i-navigation-bar__default .i-navigation-bar--mask.blur {\n  opacity: 0.95;\n}\n.i-navigation-bar .i-navigation-bar__default .i-navigation-bar--title {\n  color: #000;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/*# sourceMappingURL=iNavigationBar.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var iNavigationBar = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

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

var script$1 = {
  name: 'iToggle',
  mixins: [ toggle ]
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-19746d98_0", { source: "* {\n  box-sizing: border-box;\n}\n@media only screen and (min-width: 320px) {\nbody {\n    font-size: 12px;\n}\n}\n@media only screen and (min-width: 768px) {\nbody {\n    font-size: 12px;\n}\n}\n@media only screen and (min-width: 1224px) {\nbody {\n    font-size: 12px;\n}\n}\n.i-toggle {\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  width: 3.5rem;\n  height: 2.166rem;\n}\n.i-toggle input[type=checkbox] {\n  display: none;\n  outline: none;\n  width: 0;\n  height: 0;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 1.083rem;\n  background-color: #eaeaeb;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider:before {\n  content: \"\";\n  position: absolute;\n  height: 1.833rem;\n  width: 1.833rem;\n  left: 0.163rem;\n  bottom: 0.166rem;\n  border-radius: 50%;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  background-color: #fff;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider {\n  background-color: #34c759;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider:before {\n  transform: translateX(1.333rem);\n}\n\n/*# sourceMappingURL=iToggle.vue.map */", map: {"version":3,"sources":["iToggle.vue","D:\\Source\\vue-ios\\src\\components\\iToggle.vue"],"names":[],"mappings":"AAAA;EACE,sBAAsB;AACxB;AAEA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;ACKA;EDFE,wCAAwC;ECI1C,kBAAA;EACA,cAAA;EACA,aAAA;EACA,gBAAA;ADFA;ACIA;EACA,aAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;ADFA;ACIA;EACA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,yBAvBA;EAwBA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ADFA;ACIA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EACA,0CAAA;EACA,sBAAA;EACA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ADFA;ACQA;EACA,yBApDA;AD8CA;ACSA;EACA,+BAAA;ADPA;;AAEA,sCAAsC","file":"iToggle.vue","sourcesContent":["* {\n  box-sizing: border-box;\n}\n\n@media only screen and (min-width: 320px) {\n  body {\n    font-size: 12px;\n  }\n}\n@media only screen and (min-width: 768px) {\n  body {\n    font-size: 12px;\n  }\n}\n@media only screen and (min-width: 1224px) {\n  body {\n    font-size: 12px;\n  }\n}\n\n.i-toggle {\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  width: 3.5rem;\n  height: 2.166rem;\n}\n.i-toggle input[type=checkbox] {\n  display: none;\n  outline: none;\n  width: 0;\n  height: 0;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 1.083rem;\n  background-color: #eaeaeb;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox] + span.i-toggle--slider:before {\n  content: \"\";\n  position: absolute;\n  height: 1.833rem;\n  width: 1.833rem;\n  left: 0.163rem;\n  bottom: 0.166rem;\n  border-radius: 50%;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  background-color: #fff;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider {\n  background-color: #34c759;\n}\n.i-toggle input[type=checkbox]:checked + span.i-toggle--slider:before {\n  transform: translateX(1.333rem);\n}\n\n/*# sourceMappingURL=iToggle.vue.map */","<template>\r\n  <label class=\"i-toggle\">\r\n    <input type=\"checkbox\" ref=\"target\" :value=\"value\">\r\n    <span class=\"i-toggle--slider\"></span>\r\n  </label>\r\n</template>\r\n\r\n<script>\r\nimport toggle from '@/mixins/toggle'\r\n\r\nexport default {\r\n  name: 'iToggle',\r\n  mixins: [ toggle ]\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n@import '../common/style/mixin.scss';\r\n$toggle-color-active: #34c759;\r\n$toggle-color-deactive: #eaeaeb;\r\n\r\n.i-toggle {\r\n  @include tap-highlight-disable;\r\n  position: relative;\r\n  display: block;\r\n  width: 3.5rem;\r\n  height: 2.166rem;\r\n\r\n  input[type=checkbox] {\r\n    display: none;\r\n    outline: none;\r\n    width: 0;\r\n    height: 0;\r\n\r\n    & + span.i-toggle--slider {\r\n      cursor: pointer;\r\n      position: absolute;\r\n      top: 0;\r\n      left: 0;\r\n      right: 0;\r\n      bottom: 0;\r\n      border-radius: 1.083rem;\r\n      background-color: $toggle-color-deactive;\r\n      -webkit-transition: $transition-speed;\r\n         -moz-transition: $transition-speed;\r\n          -ms-transition: $transition-speed;\r\n           -o-transition: $transition-speed;\r\n              transition: $transition-speed;\r\n\r\n      &:before {\r\n        content: \"\";\r\n        position: absolute;\r\n        height: 1.833rem;\r\n        width: 1.833rem;\r\n        left: 0.163rem;\r\n        bottom: 0.166rem;\r\n        border-radius: 50%;\r\n        box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);\r\n        background-color: #fff;\r\n        -webkit-transition: $transition-speed;\r\n           -moz-transition: $transition-speed;\r\n            -ms-transition: $transition-speed;\r\n             -o-transition: $transition-speed;\r\n                transition: $transition-speed;\r\n      }\r\n    }\r\n\r\n    &:checked {\r\n\r\n      & + span.i-toggle--slider {\r\n        background-color: $toggle-color-active;\r\n      }\r\n\r\n      & + span.i-toggle--slider:before {\r\n        transform: translateX(1.333rem);\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var iToggle = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

//
//
//
//
//
//

var script$2 = {
  name: 'iView'
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "i-view" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-4e8771d6_0", { source: ".i-view {\n  width: 100%;\n  height: 100%;\n  padding: 1rem;\n}\n\n/*# sourceMappingURL=iView.vue.map */", map: {"version":3,"sources":["D:\\Source\\vue-ios\\src\\components\\iView.vue","iView.vue"],"names":[],"mappings":"AAcA;EACA,WAAA;EACA,YAAA;EACA,aAAA;ACbA;;AAEA,oCAAoC","file":"iView.vue","sourcesContent":["<template>\r\n  <div class=\"i-view\">\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iView'\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.i-view {\r\n  width: 100%;\r\n  height: 100%;\r\n  padding: 1rem;\r\n}\r\n</style>\r\n",".i-view {\n  width: 100%;\n  height: 100%;\n  padding: 1rem;\n}\n\n/*# sourceMappingURL=iView.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var iView = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

var components = {
  iNavigationBar: iNavigationBar,
  iToggle: iToggle,
  iView: iView
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

export { iNavigationBar, iToggle, iView, install };
