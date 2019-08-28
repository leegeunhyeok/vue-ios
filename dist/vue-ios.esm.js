/**
 * @description Dialog mixin
 */
var dialog = {
  props: {
    /**
     * @usage <Dialog :title="myTitle" v-if="show"/>
     */
    title: {
      type: String
    },
    orientation: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    isHorizontal: function isHorizontal () {
      return this.orientation === 'horizontal'
    }
  },
  methods: {
    close: function close () {
      this.$emit('close');
    }
  }
};

//

var script = {
  name: 'iAlert',
  mixins: [ dialog ],
  data: function data () {
    return {
      showDialog: false
    }
  },
  methods: {
    close: function close () {
      this.showDialog = false;
      this.$emit('close');
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
    "transition",
    {
      attrs: { name: "fade" },
      on: {
        "before-enter": function($event) {
          _vm.showDialog = true;
        },
        "before-leave": function($event) {
          _vm.showDialog = false;
        }
      }
    },
    [
      _c("div", { staticClass: "i-alert" }, [
        _c(
          "div",
          { staticClass: "i-alert__mask", on: { click: _vm.close } },
          [
            _c(
              "transition",
              { attrs: { name: "dialog" }, on: { "after-leave": _vm.close } },
              [
                _vm.showDialog
                  ? _c(
                      "div",
                      {
                        staticClass: "i-alert__dialog",
                        on: {
                          click: function($event) {
                            $event.stopPropagation();
                          }
                        }
                      },
                      [
                        _c("div", { staticClass: "i-alert__dialog__header" }, [
                          _vm._v(_vm._s(_vm.title))
                        ]),
                        _vm._v(" "),
                        !!_vm.$slots.body
                          ? _c(
                              "div",
                              { staticClass: "i-alert__dialog__body" },
                              [_vm._t("body")],
                              2
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        !!_vm.$slots.footer
                          ? _c(
                              "div",
                              {
                                staticClass: "i-alert__dialog__footer",
                                class: {
                                  horizontal: _vm.isHorizontal,
                                  vertical: !_vm.isHorizontal
                                }
                              },
                              [_vm._t("footer")],
                              2
                            )
                          : _vm._e()
                      ]
                    )
                  : _vm._e()
              ]
            )
          ],
          1
        )
      ])
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-10c2b28b_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.dialog-enter-active, .dialog-leave-active {\n  transition: all 0.3s;\n}\n.dialog-enter {\n  -webkit-transform: translate(-50%, -50%) scale(0.9) !important;\n  -moz-transform: translate(-50%, -50%) scale(0.9) !important;\n  -ms-transform: translate(-50%, -50%) scale(0.9) !important;\n  -o-transform: translate(-50%, -50%) scale(0.9) !important;\n  transform: translate(-50%, -50%) scale(0.9) !important;\n}\n.dialog-leave-to {\n  opacity: 0;\n}\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.fade-enter-active, .fade-leave-active {\n  transition: opacity 0.3s;\n}\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-alert {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n}\n.i-alert__mask {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.i-alert__dialog {\n  position: relative;\n  top: 50%;\n  left: 50%;\n  padding-top: 1.2rem;\n  border-radius: 1rem;\n  background-color: #f2f2f7;\n  text-align: center;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n@media only screen and (min-width: 320px) {\n.i-alert__dialog {\n    width: 70%;\n}\n}\n@media only screen and (min-width: 768px) {\n.i-alert__dialog {\n    width: 35%;\n}\n}\n@media only screen and (min-width: 1224px) {\n.i-alert__dialog {\n    width: 20%;\n}\n}\n.i-alert__dialog__header {\n  font-weight: bold;\n  font-size: 1.2rem;\n}\n.i-alert__dialog__body {\n  padding: 0.8rem;\n  font-size: 1rem;\n}\n.i-alert__dialog__footer {\n  border-top: 1px solid #c5c5c8;\n  width: 100%;\n}\n.i-alert__dialog__footer.horizontal > * {\n  display: flex;\n}\n.i-alert__dialog__footer.horizontal > * .i-button {\n  padding: 0.8rem 0;\n  flex: 1 1 0;\n  border-right: 1px solid #c5c5c8;\n}\n.i-alert__dialog__footer.horizontal > * .i-button:nth-last-child(1) {\n  border: none;\n}\n.i-alert__dialog__footer.vertical > * {\n  padding: 0.4rem 0;\n}\n.i-alert__dialog__footer.vertical > * .i-button {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #c5c5c8;\n}\n.i-alert__dialog__footer.vertical > * .i-button:nth-last-child(1) {\n  border: none;\n}\n\n/*# sourceMappingURL=iAlert.vue.map */", map: {"version":3,"sources":["iAlert.vue","D:\\Source\\vue-ios\\src\\components\\iAlert.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF,gFAAgF;AAChF,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AAEA;EACE,oBAAoB;AACtB;AAEA;EACE,8DAA8D;EAC9D,2DAA2D;EAC3D,0DAA0D;EAC1D,yDAAyD;EACzD,sDAAsD;AACxD;AAEA;EACE,UAAU;AACZ;AAEA;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AAEA;EACE,wBAAwB;AAC1B;AAEA;EACE,UAAU;AACZ;AAEA;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;ACjCA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;ADoCA;AClCA;EACA,WAAA;EACA,YAAA;EACA,oCAAA;ADoCA;ACjCA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,mBAAA;EACA,mBAAA;EACA,yBAAA;EACA,kBAAA;EACA,wCAAA;EACA,qCAAA;EACA,oCAAA;EACA,mCAAA;EACA,gCAAA;ADmCA;ACjCA;AAdA;IAeA,UAAA;ADoCE;AACF;AClCA;AAlBA;IAmBA,UAAA;ADqCE;AACF;ACnCA;AAtBA;IAuBA,UAAA;ADsCE;AACF;ACpCA;EACA,iBAAA;EACA,iBAAA;ADsCA;ACnCA;EACA,eAAA;EACA,eAAA;ADqCA;AClCA;EACA,6BAAA;EACA,WAAA;ADoCA;AClCA;EACA,aAAA;ADoCA;AClCA;EACA,iBAAA;EACA,WAAA;EACA,+BAAA;ADoCA;AClCA;EACA,YAAA;ADoCA;AC/BA;EACA,iBAAA;ADiCA;AC/BA;EACA,cAAA;EACA,WAAA;EACA,gCAAA;ADiCA;AC/BA;EACA,YAAA;ADiCA;;AAEA,qCAAqC","file":"iAlert.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.dialog-enter-active, .dialog-leave-active {\n  transition: all 0.3s;\n}\n\n.dialog-enter {\n  -webkit-transform: translate(-50%, -50%) scale(0.9) !important;\n  -moz-transform: translate(-50%, -50%) scale(0.9) !important;\n  -ms-transform: translate(-50%, -50%) scale(0.9) !important;\n  -o-transform: translate(-50%, -50%) scale(0.9) !important;\n  transform: translate(-50%, -50%) scale(0.9) !important;\n}\n\n.dialog-leave-to {\n  opacity: 0;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity 0.3s;\n}\n\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-alert {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 9999;\n}\n.i-alert__mask {\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.i-alert__dialog {\n  position: relative;\n  top: 50%;\n  left: 50%;\n  padding-top: 1.2rem;\n  border-radius: 1rem;\n  background-color: #f2f2f7;\n  text-align: center;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n@media only screen and (min-width: 320px) {\n  .i-alert__dialog {\n    width: 70%;\n  }\n}\n@media only screen and (min-width: 768px) {\n  .i-alert__dialog {\n    width: 35%;\n  }\n}\n@media only screen and (min-width: 1224px) {\n  .i-alert__dialog {\n    width: 20%;\n  }\n}\n.i-alert__dialog__header {\n  font-weight: bold;\n  font-size: 1.2rem;\n}\n.i-alert__dialog__body {\n  padding: 0.8rem;\n  font-size: 1rem;\n}\n.i-alert__dialog__footer {\n  border-top: 1px solid #c5c5c8;\n  width: 100%;\n}\n.i-alert__dialog__footer.horizontal > * {\n  display: flex;\n}\n.i-alert__dialog__footer.horizontal > * .i-button {\n  padding: 0.8rem 0;\n  flex: 1 1 0;\n  border-right: 1px solid #c5c5c8;\n}\n.i-alert__dialog__footer.horizontal > * .i-button:nth-last-child(1) {\n  border: none;\n}\n.i-alert__dialog__footer.vertical > * {\n  padding: 0.4rem 0;\n}\n.i-alert__dialog__footer.vertical > * .i-button {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #c5c5c8;\n}\n.i-alert__dialog__footer.vertical > * .i-button:nth-last-child(1) {\n  border: none;\n}\n\n/*# sourceMappingURL=iAlert.vue.map */","<template>\r\n  <transition name=\"fade\"\r\n    @before-enter=\"showDialog = true\"\r\n    @before-leave=\"showDialog = false\"\r\n  >\r\n    <div class=\"i-alert\">\r\n      <div class=\"i-alert__mask\"\r\n        @click=\"close\"\r\n      >\r\n        <transition name=\"dialog\"\r\n          @after-leave=\"close\"\r\n        >\r\n          <div class=\"i-alert__dialog\"\r\n            @click.stop\r\n            v-if=\"showDialog\"\r\n          >\r\n            <div class=\"i-alert__dialog__header\">{{ title }}</div>\r\n            <div class=\"i-alert__dialog__body\" v-if=\"!!$slots.body\">\r\n              <slot name=\"body\"/>\r\n            </div>\r\n            <div class=\"i-alert__dialog__footer\"\r\n              :class=\"{\r\n                horizontal: isHorizontal,\r\n                vertical: !isHorizontal\r\n              }\"\r\n              v-if=\"!!$slots.footer\"\r\n            >\r\n              <slot name=\"footer\"/>\r\n            </div>\r\n          </div>\r\n        </transition>\r\n      </div>\r\n    </div>\r\n  </transition>\r\n</template>\r\n\r\n<script>\r\nimport dialog from '@/mixins/dialog'\r\n\r\nexport default {\r\n  name: 'iAlert',\r\n  mixins: [ dialog ],\r\n  data () {\r\n    return {\r\n      showDialog: false\r\n    }\r\n  },\r\n  methods: {\r\n    close () {\r\n      this.showDialog = false\r\n      this.$emit('close')\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/transition-dialog.scss';\r\n@import '../common/style/transition-fade.scss';\r\n@import '../common/style/common.scss';\r\n\r\n.i-alert {\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 9999;\r\n\r\n  &__mask {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(0, 0, 0, .3);\r\n  }\r\n\r\n  &__dialog {\r\n    position: relative;\r\n    top: 50%;\r\n    left: 50%;\r\n    padding-top: 1.2rem;\r\n    border-radius: 1rem;\r\n    background-color: $light-background-color;\r\n    text-align: center;\r\n    -webkit-transform: translate(-50%, -50%);\r\n        -moz-transform: translate(-50%, -50%);\r\n        -ms-transform: translate(-50%, -50%);\r\n          -o-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n\r\n    @media only screen and (min-width: 320px) {\r\n      width: 70%;\r\n    }\r\n\r\n    @media only screen and (min-width: 768px) {\r\n      width: 35%;\r\n    }\r\n\r\n    @media only screen and (min-width: 1224px) {\r\n      width: 20%;\r\n    }\r\n\r\n    &__header {\r\n      font-weight: bold;\r\n      font-size: 1.2rem;\r\n    }\r\n\r\n    &__body {\r\n      padding: .8rem;\r\n      font-size: 1rem;\r\n    }\r\n\r\n    &__footer {\r\n      border-top: 1px solid $light-border-color;\r\n      width: 100%;\r\n\r\n      &.horizontal > * {\r\n        display: flex;\r\n\r\n        .i-button {\r\n          padding: .8rem 0;\r\n          flex: 1 1 0;\r\n          border-right: 1px solid $light-border-color;\r\n\r\n          &:nth-last-child(1) {\r\n            border: none;\r\n          }\r\n        }\r\n      }\r\n\r\n      &.vertical > * {\r\n        padding: .4rem 0;\r\n\r\n        .i-button {\r\n          display: block;\r\n          width: 100%;\r\n          border-bottom: 1px solid $light-border-color;\r\n\r\n          &:nth-last-child(1) {\r\n            border: none;\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var iAlert = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

//
//
//
//
//
//

var script$1 = {
  name: 'iMainView'
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "i-main-view" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-7178b194_0", { source: ".i-main-view {\n  width: 100%;\n}\n\n/*# sourceMappingURL=_iMainView.vue.map */", map: {"version":3,"sources":["D:\\Source\\vue-ios\\src\\components\\_iMainView.vue","_iMainView.vue"],"names":[],"mappings":"AAcA;EACA,WAAA;ACbA;;AAEA,yCAAyC","file":"_iMainView.vue","sourcesContent":["<template>\r\n  <div class=\"i-main-view\">\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iMainView'\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.i-main-view {\r\n  width: 100%;\r\n}\r\n</style>\r\n",".i-main-view {\n  width: 100%;\n}\n\n/*# sourceMappingURL=_iMainView.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var iMainView = normalizeComponent_1(
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
  name: 'iSubView'
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "i-sub-view" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-1fbf79b0_0", { source: ".i-sub-view {\n  width: 100%;\n}\n.i-sub-view .i-view {\n  position: absolute;\n  top: 2.5rem;\n}\n\n/*# sourceMappingURL=_iSubView.vue.map */", map: {"version":3,"sources":["D:\\Source\\vue-ios\\src\\components\\_iSubView.vue","_iSubView.vue"],"names":[],"mappings":"AAcA;EACA,WAAA;ACbA;ADeA;EACA,kBAAA;EACA,WAAA;ACbA;;AAEA,wCAAwC","file":"_iSubView.vue","sourcesContent":["<template>\r\n  <div class=\"i-sub-view\">\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iSubView'\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.i-sub-view {\r\n  width: 100%;\r\n\r\n  & .i-view {\r\n    position: absolute;\r\n    top: 2.5rem;\r\n  }\r\n}\r\n</style>\r\n",".i-sub-view {\n  width: 100%;\n}\n.i-sub-view .i-view {\n  position: absolute;\n  top: 2.5rem;\n}\n\n/*# sourceMappingURL=_iSubView.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var iSubView = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

//

var script$3 = {
  name: 'iApp',
  props: {
    defaultSubView: {
      type: String
    },
    header: {
      type: Boolean
    },
    largeHeader: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Header'
    },
    largeTitle: {
      type: String,
      default: 'Header'
    },
    subTitle: {
      type: String,
      default: 'Header'
    }
  },
  data: function data () {
    return {
      appWidth: 0,
      rootEmPx: 12,
      isSplited: false,
      transitionBlocked: false,
      transitionUnlockTimer: null,
      largeHeaderPositionPx: 0,
      opacity: 1,
      activedViewName: 'main',
      toggle: true
    }
  },
  watch: {
    isSplited: function isSplited () {
      var this$1 = this;

      clearTimeout(this.transitionUnlockTimer);
      this.transitionBlocked = true;
      this.transitionUnlockTimer = setTimeout(function () {
        this$1.transitionBlocked = false;
      }, 400);
    }
  },
  computed: {
    mainViewTransition: function mainViewTransition () {
      if (this.transitionBlocked) {
        return ''
      }
      return 'view-forward'
    },
    subViewTransition: function subViewTransition () {
      if (this.transitionBlocked) {
        return ''
      }
      return 'view-forward'
    },
    mainStyle: function mainStyle () {
      return {
        'z-index': this.activedViewName === 'main' ? 1 : 0
      }
    },
    headerStyle: function headerStyle () {
      return {
        'border-color': ("rgba(197, 197, 200, " + (this.opacity) + ")")
      }
    },
    headerTitleOpacity: function headerTitleOpacity () {
      return {
        'opacity': this.opacity
      }
    },
    largeHeaderPosition: function largeHeaderPosition () {
      return {
        'top': this.largeHeaderPositionPx + 'px'
      }
    }
  },
  components: {
    iMainView: iMainView,
    iSubView: iSubView
  },
  created: function created () {
    this.opacity = this.largeHeader ? 0 : 1;
  },
  mounted: function mounted () {
    this.updateAppUI();
    window.addEventListener('resize', this.updateAppUI);
    this.$refs.main.addEventListener('scroll', this.updateScrollUI);
    this.$refs.sub.addEventListener('scroll', this.updateScrollUI);
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.getRem);
    this.$refs.main.removeEventListener('scroll', this.updateScrollUI);
    this.$refs.sub.removeEventListener('scroll', this.updateScrollUI);
  },
  methods: {
    updateAppUI: function updateAppUI (ev) {
      this.appWidth = window.innerWidth;
      this.updateSplitState();
      this.getRem();
    },
    updateSplitState: function updateSplitState () {
      if (this.appWidth >= 700) {
        this.isSplited = true;
        if (this.activedViewName === 'main') {
          this.activedViewName = this.defaultSubView;
        }
      } else {
        this.isSplited = false;
      }
    },
    getRem: function getRem () {
      this.rootEmPx = parseFloat(
        getComputedStyle(document.body)
          .getPropertyValue('font-size')
      );
    },
    updateScrollUI: function updateScrollUI (ev) {
      if (!ev) { return 1 }

      if (!this.largeHeader) {
        return 1
      }

      var opacity = 1;
      var scrollTop = ev.target.scrollTop;
      if (this.rootEmPx * 4 >= scrollTop) {
        this.largeHeaderPositionPx = scrollTop;
        opacity = 0;
      } else {
        this.largeHeaderPositionPx = this.rootEmPx * 4;
        opacity = (scrollTop - this.rootEmPx * 3) / this.rootEmPx * 3 * 0.1;
        opacity = Math.min(opacity, 1);
      }
      this.opacity = opacity;
    },
    pushView: function pushView (name) {
      this.activedViewName = name;
    },
    isActive: function isActive (name) {
      return this.activedViewName === name
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "i-app" },
    [
      _c("transition-group", { attrs: { name: _vm.mainViewTransition } }, [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.activedViewName === "main" || _vm.isSplited,
                expression: "activedViewName === 'main' || isSplited"
              }
            ],
            key: "main",
            staticClass: "i-main",
            style: _vm.mainStyle
          },
          [
            _c("div", { staticClass: "i-header", style: _vm.headerStyle }, [
              _c(
                "div",
                { staticClass: "i-header__left" },
                [_vm._t("headerLeft")],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "i-header__title",
                  style: _vm.headerTitleOpacity
                },
                [_vm._v("\n          " + _vm._s(_vm.title) + "\n        ")]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "i-header__right" },
                [_vm._t("headerRight")],
                2
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { ref: "main", staticClass: "i-main__content" },
              [
                _vm.largeHeader
                  ? _c("div", { staticClass: "i-main__large-header" }, [
                      _c(
                        "div",
                        {
                          staticClass: "i-main__large-header__title",
                          style: _vm.largeHeaderPosition
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(_vm.largeTitle) +
                              "\n          "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "i-main__large-header__area" },
                        [_vm._t("largeHeader")],
                        2
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "iMainView",
                  { ref: "main" },
                  [
                    _vm._t("main", null, {
                      pushView: _vm.pushView,
                      isActive: _vm.isActive
                    })
                  ],
                  2
                )
              ],
              1
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.activedViewName !== "main" || _vm.isSplited,
                expression: "activedViewName !== 'main' || isSplited"
              }
            ],
            key: "sub",
            staticClass: "i-sub"
          },
          [
            _c("div", { staticClass: "i-header" }, [
              _c(
                "div",
                { staticClass: "i-header__left" },
                [_vm._t("subHeaderLeft")],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "i-header__title" }, [
                _vm._v("\n          " + _vm._s(_vm.subTitle) + "\n        ")
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "i-header__right" },
                [_vm._t("subHeaderRight")],
                2
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { ref: "sub", staticClass: "i-sub__content" },
              [
                _c(
                  "iSubView",
                  [
                    _c(
                      "transition-group",
                      { attrs: { name: _vm.subViewTransition } },
                      [
                        _vm._t("sub", null, {
                          pushView: _vm.pushView,
                          isActive: _vm.isActive
                        })
                      ],
                      2
                    )
                  ],
                  1
                )
              ],
              1
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "i-alert-area" }, [_vm._t("alert")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-ab5316e0_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\nhtml, body, .i-app {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.i-app {\n  overflow: hidden;\n}\n.i-app .i-main {\n  position: relative;\n  height: 100%;\n  overflow-x: hidden;\n  background-color: #f2f2f7;\n}\n@media only screen and (min-width: 320px) {\n.i-app .i-main {\n    width: 100%;\n}\n}\n@media only screen and (min-width: 700px) and (orientation: portrait), screen and (min-width: 768px) and (orientation: portrait) {\n.i-app .i-main {\n    border-right: 1px solid #c5c5c8;\n    width: 42%;\n    float: left;\n}\n}\n@media only screen and (min-width: 700px) and (orientation: landscape), screen and (min-width: 768px) and (orientation: landscape) {\n.i-app .i-main {\n    border-right: 1px solid #c5c5c8;\n    width: 37%;\n    float: left;\n}\n}\n.i-app .i-main__content {\n  overflow-y: auto;\n  height: 100%;\n}\n@media only screen and (min-width: 320px) {\n.i-app .i-main__content {\n    padding-top: 2.5rem;\n}\n}\n@media only screen and (min-width: 768px), (min-width: 1224px) {\n.i-app .i-main__content {\n    padding-top: 3rem;\n}\n}\n.i-app .i-main__large-header {\n  position: relative;\n  border-bottom: 1px solid;\n  border-color: #c5c5c8;\n  background-color: #f2f2f7;\n  height: 6rem;\n}\n.i-app .i-main__large-header__title {\n  position: absolute;\n  width: 100%;\n  padding: 0.25rem 1rem;\n  background-color: #f2f2f7;\n  font-weight: bold;\n  font-size: 2rem;\n  z-index: 1;\n}\n.i-app .i-main__large-header__area {\n  position: absolute;\n  bottom: 0.5rem;\n  width: 100%;\n  padding: 0 1rem;\n}\n.i-app .i-sub {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  overflow-x: hidden;\n  background-color: #f2f2f7;\n}\n@media only screen and (min-width: 320px) {\n.i-app .i-sub {\n    width: 100%;\n}\n}\n@media only screen and (min-width: 700px) and (orientation: portrait), screen and (min-width: 768px) and (orientation: portrait) {\n.i-app .i-sub {\n    position: relative;\n    width: 58%;\n    float: right;\n}\n}\n@media only screen and (min-width: 700px) and (orientation: landscape), screen and (min-width: 768px) and (orientation: landscape) {\n.i-app .i-sub {\n    position: relative;\n    width: 63%;\n    float: right;\n}\n}\n.i-app .i-sub__content {\n  overflow-y: auto;\n  height: 100%;\n}\n@media only screen and (min-width: 320px) and (orientation: landscape) {\n.i-app .i-sub__content {\n    padding-top: 2.5rem;\n}\n}\n@media only screen and (min-width: 768px), (min-width: 1224px) {\n.i-app .i-sub__content {\n    padding-top: 3rem;\n}\n}\n.i-header {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 2;\n  border-bottom: 1px solid;\n  border-color: #c5c5c8;\n  background-color: #f2f2f7;\n}\n@media only screen and (min-width: 320px) {\n.i-header {\n    height: 2.5rem;\n    line-height: 2.5rem;\n}\n}\n@media only screen and (min-width: 768px), (min-width: 1224px) {\n.i-header {\n    height: 3rem;\n    line-height: 3rem;\n}\n}\n.i-header__left {\n  float: left;\n}\n.i-header__right {\n  float: right;\n}\n.i-header__title {\n  display: inline-block;\n  color: #000;\n  font-size: 0.9rem;\n  font-weight: bold;\n}\n\n/* Forward transition effect */\n.view-forward-enter-active {\n  z-index: 1;\n  transition: 0.4s;\n}\n.view-forward-leave-active {\n  z-index: 0;\n  transition: 0.39s;\n}\n.view-forward-leave-to {\n  z-index: 0;\n  transform: translateX(-20%);\n}\n.view-forward-leave {\n  z-index: 0;\n  transform: translateX(0);\n}\n.view-forward-enter {\n  z-index: 1;\n  transform: translateX(100%);\n}\n.view-forward-enter-to {\n  z-index: 1;\n  transform: translateX(0);\n}\n\n/* Backward transition effect */\n.view-backward-enter-active {\n  z-index: 0;\n  transition: 0.4s;\n}\n.view-backward-leave-active {\n  z-index: 1;\n  transition: 0.39s;\n}\n.view-backward-leave-to {\n  z-index: 1;\n  transform: translateX(100%);\n}\n.view-backward-leave {\n  z-index: 1;\n  transform: translateX(0);\n}\n.view-backward-enter {\n  z-index: 0;\n  transform: translateX(-20%);\n}\n.view-backward-enter-to {\n  z-index: 0;\n  transform: translateX(0);\n}\n\n/*# sourceMappingURL=iApp.vue.map */", map: {"version":3,"sources":["iApp.vue","D:\\Source\\vue-ios\\src\\components\\iApp.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;ACqNA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;ADlNA;ACqNA;EACA,gBAAA;ADlNA;ACoNA;EACA,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;ADlNA;ACqNA;AADA;IAEA,WAAA;ADlNE;AACF;ACoNA;AALA;IAUA,+BAAA;IACA,UAAA;IACA,WAAA;ADrNE;AACF;ACuNA;AAfA;IAoBA,+BAAA;IACA,UAAA;IACA,WAAA;ADxNE;AACF;AC2NA;EACA,gBAAA;EACA,YAAA;ADzNA;AC2NA;AAJA;IAKA,mBAAA;ADxNE;AACF;AC0NA;AARA;IASA,iBAAA;ADvNE;AACF;AC0NA;EACA,kBAAA;EACA,wBAAA;EACA,qBAAA;EACA,yBAAA;EACA,YAAA;ADxNA;AC0NA;EACA,kBAAA;EACA,WAAA;EACA,qBAAA;EACA,yBAAA;EACA,iBAAA;EACA,eAAA;EACA,UAAA;ADxNA;AC2NA;EACA,kBAAA;EACA,cAAA;EACA,WAAA;EACA,eAAA;ADzNA;AC8NA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;AD5NA;AC+NA;AADA;IAEA,WAAA;AD5NE;AACF;AC8NA;AALA;IAUA,kBAAA;IACA,UAAA;IACA,YAAA;AD/NE;AACF;ACiOA;AAfA;IAoBA,kBAAA;IACA,UAAA;IACA,YAAA;ADlOE;AACF;ACqOA;EACA,gBAAA;EACA,YAAA;ADnOA;ACqOA;AAJA;IAKA,mBAAA;ADlOE;AACF;ACoOA;AARA;IASA,iBAAA;ADjOE;AACF;ACsOA;EACA,kBAAA;EACA,MAAA;EACA,WAAA;EACA,kBAAA;EACA,UAAA;EACA,wBAAA;EACA,qBAAA;EACA,yBAAA;ADnOA;ACqOA;AAVA;IAWA,cAAA;IACA,mBAAA;ADlOE;AACF;ACoOA;AAfA;IAgBA,YAAA;IACA,iBAAA;ADjOE;AACF;ACmOA;EACA,WAAA;ADjOA;ACoOA;EACA,YAAA;ADlOA;ACqOA;EACA,qBAAA;EACA,WAAA;EACA,iBAAA;EACA,iBAAA;ADnOA;;ACuOA,8BAAA;AACA;EACA,UAAA;EACA,gBAAA;ADpOA;ACuOA;EACA,UAAA;EACA,iBAAA;ADpOA;ACuOA;EACA,UAAA;EACA,2BAAA;ADpOA;ACuOA;EACA,UAAA;EACA,wBAAA;ADpOA;ACuOA;EACA,UAAA;EACA,2BAAA;ADpOA;ACuOA;EACA,UAAA;EACA,wBAAA;ADpOA;;ACuOA,+BAAA;AACA;EACA,UAAA;EACA,gBAAA;ADpOA;ACuOA;EACA,UAAA;EACA,iBAAA;ADpOA;ACuOA;EACA,UAAA;EACA,2BAAA;ADpOA;ACuOA;EACA,UAAA;EACA,wBAAA;ADpOA;ACuOA;EACA,UAAA;EACA,2BAAA;ADpOA;ACuOA;EACA,UAAA;EACA,wBAAA;ADpOA;;AAEA,mCAAmC","file":"iApp.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nhtml, body, .i-app {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n}\n\n.i-app {\n  overflow: hidden;\n}\n.i-app .i-main {\n  position: relative;\n  height: 100%;\n  overflow-x: hidden;\n  background-color: #f2f2f7;\n}\n@media only screen and (min-width: 320px) {\n  .i-app .i-main {\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 700px) and (orientation: portrait), screen and (min-width: 768px) and (orientation: portrait) {\n  .i-app .i-main {\n    border-right: 1px solid #c5c5c8;\n    width: 42%;\n    float: left;\n  }\n}\n@media only screen and (min-width: 700px) and (orientation: landscape), screen and (min-width: 768px) and (orientation: landscape) {\n  .i-app .i-main {\n    border-right: 1px solid #c5c5c8;\n    width: 37%;\n    float: left;\n  }\n}\n.i-app .i-main__content {\n  overflow-y: auto;\n  height: 100%;\n}\n@media only screen and (min-width: 320px) {\n  .i-app .i-main__content {\n    padding-top: 2.5rem;\n  }\n}\n@media only screen and (min-width: 768px), (min-width: 1224px) {\n  .i-app .i-main__content {\n    padding-top: 3rem;\n  }\n}\n.i-app .i-main__large-header {\n  position: relative;\n  border-bottom: 1px solid;\n  border-color: #c5c5c8;\n  background-color: #f2f2f7;\n  height: 6rem;\n}\n.i-app .i-main__large-header__title {\n  position: absolute;\n  width: 100%;\n  padding: 0.25rem 1rem;\n  background-color: #f2f2f7;\n  font-weight: bold;\n  font-size: 2rem;\n  z-index: 1;\n}\n.i-app .i-main__large-header__area {\n  position: absolute;\n  bottom: 0.5rem;\n  width: 100%;\n  padding: 0 1rem;\n}\n.i-app .i-sub {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  overflow-x: hidden;\n  background-color: #f2f2f7;\n}\n@media only screen and (min-width: 320px) {\n  .i-app .i-sub {\n    width: 100%;\n  }\n}\n@media only screen and (min-width: 700px) and (orientation: portrait), screen and (min-width: 768px) and (orientation: portrait) {\n  .i-app .i-sub {\n    position: relative;\n    width: 58%;\n    float: right;\n  }\n}\n@media only screen and (min-width: 700px) and (orientation: landscape), screen and (min-width: 768px) and (orientation: landscape) {\n  .i-app .i-sub {\n    position: relative;\n    width: 63%;\n    float: right;\n  }\n}\n.i-app .i-sub__content {\n  overflow-y: auto;\n  height: 100%;\n}\n@media only screen and (min-width: 320px) and (orientation: landscape) {\n  .i-app .i-sub__content {\n    padding-top: 2.5rem;\n  }\n}\n@media only screen and (min-width: 768px), (min-width: 1224px) {\n  .i-app .i-sub__content {\n    padding-top: 3rem;\n  }\n}\n\n.i-header {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 2;\n  border-bottom: 1px solid;\n  border-color: #c5c5c8;\n  background-color: #f2f2f7;\n}\n@media only screen and (min-width: 320px) {\n  .i-header {\n    height: 2.5rem;\n    line-height: 2.5rem;\n  }\n}\n@media only screen and (min-width: 768px), (min-width: 1224px) {\n  .i-header {\n    height: 3rem;\n    line-height: 3rem;\n  }\n}\n.i-header__left {\n  float: left;\n}\n.i-header__right {\n  float: right;\n}\n.i-header__title {\n  display: inline-block;\n  color: #000;\n  font-size: 0.9rem;\n  font-weight: bold;\n}\n\n/* Forward transition effect */\n.view-forward-enter-active {\n  z-index: 1;\n  transition: 0.4s;\n}\n\n.view-forward-leave-active {\n  z-index: 0;\n  transition: 0.39s;\n}\n\n.view-forward-leave-to {\n  z-index: 0;\n  transform: translateX(-20%);\n}\n\n.view-forward-leave {\n  z-index: 0;\n  transform: translateX(0);\n}\n\n.view-forward-enter {\n  z-index: 1;\n  transform: translateX(100%);\n}\n\n.view-forward-enter-to {\n  z-index: 1;\n  transform: translateX(0);\n}\n\n/* Backward transition effect */\n.view-backward-enter-active {\n  z-index: 0;\n  transition: 0.4s;\n}\n\n.view-backward-leave-active {\n  z-index: 1;\n  transition: 0.39s;\n}\n\n.view-backward-leave-to {\n  z-index: 1;\n  transform: translateX(100%);\n}\n\n.view-backward-leave {\n  z-index: 1;\n  transform: translateX(0);\n}\n\n.view-backward-enter {\n  z-index: 0;\n  transform: translateX(-20%);\n}\n\n.view-backward-enter-to {\n  z-index: 0;\n  transform: translateX(0);\n}\n\n/*# sourceMappingURL=iApp.vue.map */","<template>\r\n  <div class=\"i-app\">\r\n    <transition-group\r\n      :name=\"mainViewTransition\"\r\n    >\r\n      <div class=\"i-main\" :key=\"'main'\"\r\n        :style=\"mainStyle\"\r\n        v-show=\"activedViewName === 'main' || isSplited\"\r\n      >\r\n        <div class=\"i-header\"\r\n          :style=\"headerStyle\"\r\n        >\r\n          <div class=\"i-header__left\">\r\n            <slot name=\"headerLeft\"/>\r\n          </div>\r\n          <div class=\"i-header__title\"\r\n            :style=\"headerTitleOpacity\"\r\n          >\r\n            {{ title }}\r\n          </div>\r\n          <div class=\"i-header__right\">\r\n            <slot name=\"headerRight\"/>\r\n          </div>\r\n        </div>\r\n        <div class=\"i-main__content\" ref=\"main\">\r\n          <div class=\"i-main__large-header\"\r\n            v-if=\"largeHeader\"\r\n          >\r\n            <div class=\"i-main__large-header__title\"\r\n              :style=\"largeHeaderPosition\"\r\n            >\r\n              {{ largeTitle }}\r\n            </div>\r\n            <div class=\"i-main__large-header__area\">\r\n              <slot name=\"largeHeader\"/>\r\n            </div>\r\n          </div>\r\n          <iMainView ref=\"main\">\r\n            <slot name=\"main\"\r\n              :pushView=\"pushView\"\r\n              :isActive=\"isActive\"\r\n            />\r\n          </iMainView>\r\n        </div>\r\n      </div>\r\n      <div class=\"i-sub\" :key=\"'sub'\"\r\n        v-show=\"activedViewName !== 'main' || isSplited\"\r\n      >\r\n        <div class=\"i-header\">\r\n          <div class=\"i-header__left\">\r\n            <slot name=\"subHeaderLeft\"/>\r\n          </div>\r\n          <div class=\"i-header__title\">\r\n            {{ subTitle }}\r\n          </div>\r\n          <div class=\"i-header__right\">\r\n            <slot name=\"subHeaderRight\"/>\r\n          </div>\r\n        </div>\r\n        <div class=\"i-sub__content\" ref=\"sub\">\r\n          <iSubView>\r\n            <transition-group :name=\"subViewTransition\">\r\n              <slot name=\"sub\"\r\n                :pushView=\"pushView\"\r\n                :isActive=\"isActive\"\r\n              />\r\n            </transition-group>\r\n          </iSubView>\r\n        </div>\r\n      </div>\r\n    </transition-group>\r\n    <div class=\"i-alert-area\">\r\n      <slot name=\"alert\"/>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport iMainView from './_iMainView.vue'\r\nimport iSubView from './_iSubView.vue'\r\n\r\nexport default {\r\n  name: 'iApp',\r\n  props: {\r\n    defaultSubView: {\r\n      type: String\r\n    },\r\n    header: {\r\n      type: Boolean\r\n    },\r\n    largeHeader: {\r\n      type: Boolean,\r\n      default: true\r\n    },\r\n    title: {\r\n      type: String,\r\n      default: 'Header'\r\n    },\r\n    largeTitle: {\r\n      type: String,\r\n      default: 'Header'\r\n    },\r\n    subTitle: {\r\n      type: String,\r\n      default: 'Header'\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      appWidth: 0,\r\n      rootEmPx: 12,\r\n      isSplited: false,\r\n      transitionBlocked: false,\r\n      transitionUnlockTimer: null,\r\n      largeHeaderPositionPx: 0,\r\n      opacity: 1,\r\n      activedViewName: 'main',\r\n      toggle: true\r\n    }\r\n  },\r\n  watch: {\r\n    isSplited () {\r\n      clearTimeout(this.transitionUnlockTimer)\r\n      this.transitionBlocked = true\r\n      this.transitionUnlockTimer = setTimeout(() => {\r\n        this.transitionBlocked = false\r\n      }, 400)\r\n    }\r\n  },\r\n  computed: {\r\n    mainViewTransition () {\r\n      if (this.transitionBlocked) {\r\n        return ''\r\n      }\r\n      return 'view-forward'\r\n    },\r\n    subViewTransition () {\r\n      if (this.transitionBlocked) {\r\n        return ''\r\n      }\r\n      return 'view-forward'\r\n    },\r\n    mainStyle () {\r\n      return {\r\n        'z-index': this.activedViewName === 'main' ? 1 : 0\r\n      }\r\n    },\r\n    headerStyle () {\r\n      return {\r\n        'border-color': `rgba(197, 197, 200, ${this.opacity})`\r\n      }\r\n    },\r\n    headerTitleOpacity () {\r\n      return {\r\n        'opacity': this.opacity\r\n      }\r\n    },\r\n    largeHeaderPosition () {\r\n      return {\r\n        'top': this.largeHeaderPositionPx + 'px'\r\n      }\r\n    }\r\n  },\r\n  components: {\r\n    iMainView,\r\n    iSubView\r\n  },\r\n  created () {\r\n    this.opacity = this.largeHeader ? 0 : 1\r\n  },\r\n  mounted () {\r\n    this.updateAppUI()\r\n    window.addEventListener('resize', this.updateAppUI)\r\n    this.$refs.main.addEventListener('scroll', this.updateScrollUI)\r\n    this.$refs.sub.addEventListener('scroll', this.updateScrollUI)\r\n  },\r\n  beforeDestroy () {\r\n    window.removeEventListener('resize', this.getRem)\r\n    this.$refs.main.removeEventListener('scroll', this.updateScrollUI)\r\n    this.$refs.sub.removeEventListener('scroll', this.updateScrollUI)\r\n  },\r\n  methods: {\r\n    updateAppUI (ev) {\r\n      this.appWidth = window.innerWidth\r\n      this.updateSplitState()\r\n      this.getRem()\r\n    },\r\n    updateSplitState () {\r\n      if (this.appWidth >= 700) {\r\n        this.isSplited = true\r\n        if (this.activedViewName === 'main') {\r\n          this.activedViewName = this.defaultSubView\r\n        }\r\n      } else {\r\n        this.isSplited = false\r\n      }\r\n    },\r\n    getRem () {\r\n      this.rootEmPx = parseFloat(\r\n        getComputedStyle(document.body)\r\n          .getPropertyValue('font-size')\r\n      )\r\n    },\r\n    updateScrollUI (ev) {\r\n      if (!ev) return 1\r\n\r\n      if (!this.largeHeader) {\r\n        return 1\r\n      }\r\n\r\n      let opacity = 1\r\n      const scrollTop = ev.target.scrollTop\r\n      if (this.rootEmPx * 4 >= scrollTop) {\r\n        this.largeHeaderPositionPx = scrollTop\r\n        opacity = 0\r\n      } else {\r\n        this.largeHeaderPositionPx = this.rootEmPx * 4\r\n        opacity = (scrollTop - this.rootEmPx * 3) / this.rootEmPx * 3 * 0.1\r\n        opacity = Math.min(opacity, 1)\r\n      }\r\n      this.opacity = opacity\r\n    },\r\n    pushView (name) {\r\n      this.activedViewName = name\r\n    },\r\n    isActive (name) {\r\n      return this.activedViewName === name\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n\r\nhtml, body, .i-app {\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0;\r\n  padding: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n.i-app {\r\n  overflow: hidden;\r\n\r\n  .i-main {\r\n    position: relative;\r\n    height: 100%;\r\n    overflow-x: hidden;\r\n    background-color: $light-background-color;\r\n\r\n    & {\r\n      @media only screen and (min-width: 320px) {\r\n        width: 100%;\r\n      }\r\n\r\n      @media only screen\r\n        and (min-width: 700px)\r\n        and (orientation: portrait),\r\n        screen and (min-width: 768px)\r\n        and (orientation: portrait) {\r\n        border-right: 1px solid $light-border-color;\r\n        width: 42%;\r\n        float: left;\r\n      }\r\n\r\n      @media only screen\r\n        and (min-width: 700px)\r\n        and (orientation: landscape),\r\n        screen and (min-width: 768px)\r\n        and (orientation: landscape) {\r\n        border-right: 1px solid $light-border-color;\r\n        width: 37%;\r\n        float: left;\r\n      }\r\n    }\r\n\r\n    &__content {\r\n      overflow-y: auto;\r\n      height: 100%;\r\n\r\n      @media only screen and (min-width: 320px) {\r\n        padding-top: 2.5rem;\r\n      }\r\n\r\n      @media only screen and (min-width: 768px), (min-width: 1224px) {\r\n        padding-top: 3rem;\r\n      }\r\n    }\r\n\r\n    &__large-header {\r\n      position: relative;\r\n      border-bottom: 1px solid;\r\n      border-color: $light-border-color;\r\n      background-color: $light-background-color;\r\n      height: 6rem;\r\n\r\n      &__title {\r\n        position: absolute;\r\n        width: 100%;\r\n        padding: .25rem 1rem;\r\n        background-color: $light-background-color;\r\n        font-weight: bold;\r\n        font-size: 2rem;\r\n        z-index: 1;\r\n      }\r\n\r\n      &__area {\r\n        position: absolute;\r\n        bottom: .5rem;\r\n        width: 100%;\r\n        padding: 0 1rem;\r\n      }\r\n    }\r\n  }\r\n\r\n  .i-sub {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    height: 100%;\r\n    overflow-x: hidden;\r\n    background-color: $light-background-color;\r\n\r\n    & {\r\n      @media only screen and (min-width: 320px){\r\n        width: 100%;\r\n      }\r\n\r\n      @media only screen\r\n        and (min-width: 700px)\r\n        and (orientation: portrait),\r\n        screen and (min-width: 768px)\r\n        and (orientation: portrait) {\r\n        position: relative;\r\n        width: 58%;\r\n        float: right;\r\n      }\r\n\r\n      @media only screen\r\n        and (min-width: 700px)\r\n        and (orientation: landscape),\r\n        screen and (min-width: 768px)\r\n        and (orientation: landscape) {\r\n        position: relative;\r\n        width: 63%;\r\n        float: right;\r\n      }\r\n    }\r\n\r\n    &__content {\r\n      overflow-y: auto;\r\n      height: 100%;\r\n\r\n      @media only screen and (min-width: 320px)and (orientation: landscape) {\r\n        padding-top: 2.5rem;\r\n      }\r\n\r\n      @media only screen and (min-width: 768px), (min-width: 1224px) {\r\n        padding-top: 3rem;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n.i-header {\r\n  position: absolute;\r\n  top: 0;\r\n  width: 100%;\r\n  text-align: center;\r\n  z-index: 2;\r\n  border-bottom: 1px solid;\r\n  border-color: $light-border-color;\r\n  background-color: $light-background-color;\r\n\r\n  @media only screen and (min-width: 320px) {\r\n    height: 2.5rem;\r\n    line-height: 2.5rem;\r\n  }\r\n\r\n  @media only screen and (min-width: 768px), (min-width: 1224px) {\r\n    height: 3rem;\r\n    line-height: 3rem;\r\n  }\r\n\r\n  &__left {\r\n    float: left;\r\n  }\r\n\r\n  &__right {\r\n    float: right;\r\n  }\r\n\r\n  &__title {\r\n    display: inline-block;\r\n    color: #000;\r\n    font-size: .9rem;\r\n    font-weight: bold;\r\n  }\r\n}\r\n\r\n/* Forward transition effect */\r\n.view-forward-enter-active {\r\n  z-index: 1;\r\n  transition: .4s;\r\n}\r\n\r\n.view-forward-leave-active {\r\n  z-index: 0;\r\n  transition: .39s;\r\n}\r\n\r\n.view-forward-leave-to {\r\n  z-index: 0;\r\n  transform: translateX(-20%);\r\n}\r\n\r\n.view-forward-leave {\r\n  z-index: 0;\r\n  transform: translateX(0);\r\n}\r\n\r\n.view-forward-enter {\r\n  z-index: 1;\r\n  transform: translateX(100%);\r\n}\r\n\r\n.view-forward-enter-to {\r\n  z-index: 1;\r\n  transform: translateX(0);\r\n}\r\n\r\n/* Backward transition effect */\r\n.view-backward-enter-active {\r\n  z-index: 0;\r\n  transition: .4s;\r\n}\r\n\r\n.view-backward-leave-active {\r\n  z-index: 1;\r\n  transition: .39s;\r\n}\r\n\r\n.view-backward-leave-to {\r\n  z-index: 1;\r\n  transform: translateX(100%);\r\n}\r\n\r\n.view-backward-leave {\r\n  z-index: 1;\r\n  transform: translateX(0);\r\n}\r\n\r\n.view-backward-enter {\r\n  z-index: 0;\r\n  transform: translateX(-20%);\r\n}\r\n\r\n.view-backward-enter-to {\r\n  z-index: 0;\r\n  transform: translateX(0);\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var iApp = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );

/**
 * @description Button status mixin
 */
var button = {
  props: {
    /**
     * @usage <Button @click="myFunc"/>
     */
    color: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    bold: {
      type: Boolean | String
    }
  },
  methods: {
    click: function click ($event) {
      this.$emit('click', $event);
    }
  }
};

//

var script$4 = {
  name: 'iButton',
  mixins: [ button ]
};

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "button",
    {
      staticClass: "i-button",
      class: { bold: _vm.bold },
      on: { click: _vm.click }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-3f6f4b0c_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-button {\n  -webkit-tap-highlight-color: transparent;\n  cursor: pointer;\n  outline: none;\n  border: none;\n  color: #097afe;\n  background-color: transparent;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n}\n.i-button.bold {\n  font-weight: bold;\n}\n.i-button:hover {\n  color: #cce4fd;\n}\n\n/*# sourceMappingURL=iButton.vue.map */", map: {"version":3,"sources":["iButton.vue","D:\\Source\\vue-ios\\src\\components\\iButton.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;ICaF,eAAA;ADXE;AACF;AACA;AACE;ICYF,eAAA;ADVE;AACF;AACA;AACE;ICWF,eAAA;ADTE;AACF;ACAA;EDGE,wCAAwC;ECD1C,eAAA;EACA,aAAA;EACA,YAAA;EACA,cAAA;EACA,6BAAA;EACA,eAAA;EACA,oBAAA;ADGA;ACDA;EACA,iBAAA;ADGA;ACAA;EACA,cAAA;ADEA;;AAEA,sCAAsC","file":"iButton.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-button {\n  -webkit-tap-highlight-color: transparent;\n  cursor: pointer;\n  outline: none;\n  border: none;\n  color: #097afe;\n  background-color: transparent;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n}\n.i-button.bold {\n  font-weight: bold;\n}\n.i-button:hover {\n  color: #cce4fd;\n}\n\n/*# sourceMappingURL=iButton.vue.map */","<template>\r\n  <button class=\"i-button\"\r\n    :class=\"{ bold }\"\r\n    @click=\"click\"\r\n  >\r\n    <slot/>\r\n  </button>\r\n</template>\r\n\r\n<script>\r\nimport button from '@/mixins/button'\r\n\r\nexport default {\r\n  name: 'iButton',\r\n  mixins: [ button ]\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n@import '../common/style/mixin.scss';\r\n\r\n.i-button {\r\n  @include tap-highlight-disable;\r\n  cursor: pointer;\r\n  outline: none;\r\n  border: none;\r\n  color: $ios-blue-color;\r\n  background-color: transparent;\r\n  font-size: 1rem;\r\n  padding: .5rem 1rem;\r\n\r\n  &.bold {\r\n    font-weight: bold;\r\n  }\r\n\r\n  &:hover {\r\n    color: $ios-lightblue-color;\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  

  
  var iButton = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    browser,
    undefined
  );

//
//
//
//
//
//

var script$5 = {
  name: 'iLabel'
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "i-label" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-796708ca_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-label {\n  display: inline-block;\n  color: #000000;\n  font-size: 1rem;\n}\n\n/*# sourceMappingURL=iLabel.vue.map */", map: {"version":3,"sources":["iLabel.vue","D:\\Source\\vue-ios\\src\\components\\iLabel.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;ECQA,kGAAA;ADNA;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;ACPA;EACA,qBAAA;EACA,cAAA;EACA,eAAA;ADUA;;AAEA,qCAAqC","file":"iLabel.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-label {\n  display: inline-block;\n  color: #000000;\n  font-size: 1rem;\n}\n\n/*# sourceMappingURL=iLabel.vue.map */","<template>\r\n  <div class=\"i-label\">\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iLabel'\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n\r\n.i-label {\r\n  display: inline-block;\r\n  color: $light-primary-text-color;\r\n  font-size: 1rem;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  

  
  var iLabel = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    browser,
    undefined
  );

/**
 * @description Box model mixin
 */
var boxModel = {
  props: {
    width: [ Number, String ],
    height: [ Number, String ],
    margin: [ Number, String ],
    marginTop: [ Number, String ],
    marginBottom: [ Number, String ],
    marginLeft: [ Number, String ],
    marginRight: [ Number, String ],
    padding: [ Number, String ],
    paddingTop: [ Number, String ],
    paddingBottom: [ Number, String ],
    paddingLeft: [ Number, String ],
    paddingRight: [ Number, String ]
  },
  computed: {
    propsStyle: function propsStyle () {
      return {
        width: this.width,
        height: this.height,
        margin: this.margin,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        marginLeft: this.marginLeft,
        marginRight: this.marginRight,
        padding: this.padding,
        paddingTop: this.paddingTop,
        paddingBottom: this.paddingBottom,
        paddingLeft: this.paddingLeft,
        paddingRight: this.paddingRight
      }
    }
  }
};

/**
 * @description Textfield status mixin
 */
var textfield = {
  props: {
    /**
     * @usage <Textfield v-model="myValue"/>
     */
    value: {
      default: ''
    },
    placeholder: {
      type: String
    },
    max: {
      type: Number | String
    },
    min: {
      type: Number | String
    },
    maxlength: {
      type: Number | String
    },
    spellcheck: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input: function input ($event) {
      this.$emit('input', $event.target.value);
    }
  }
};

//

var script$6 = {
  name: 'iSearchField',
  mixins: [ boxModel, textfield ],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    staticClass: "i-text-search-field",
    style: _vm.propsStyle,
    attrs: {
      spellcheck: _vm.spellcheck,
      type: _vm.type,
      placeholder: _vm.placeholder,
      max: _vm.max,
      min: _vm.min,
      maxlength: _vm.maxlength
    },
    domProps: { value: _vm.value },
    on: { input: _vm.input }
  })
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-6d558350_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-text-search-field {\n  outline: none;\n  padding: 0.4rem 0.8rem;\n  background-color: #e3e3e8;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-text-search-field::placeholder {\n  color: #8e8e93;\n}\n.i-text-search-field:-ms-input-placeholder {\n  color: #8e8e93;\n}\n.i-text-search-field::-ms-input-placeholder {\n  color: #8e8e93;\n}\n.i-text-search-field:hover {\n  background-color: #dedee4;\n}\n\n/*# sourceMappingURL=iSearchField.vue.map */", map: {"version":3,"sources":["iSearchField.vue","D:\\Source\\vue-ios\\src\\components\\iSearchField.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;ACaA;EACA,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ADVA;ACYA;EACA,cAhBA;ADMA;ACaA;EACA,cApBA;ADSA;ACcA;EACA,cAxBA;ADYA;ACeA;EACA,yBAAA;ADbA;;AAEA,2CAA2C","file":"iSearchField.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-text-search-field {\n  outline: none;\n  padding: 0.4rem 0.8rem;\n  background-color: #e3e3e8;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-text-search-field::placeholder {\n  color: #8e8e93;\n}\n.i-text-search-field:-ms-input-placeholder {\n  color: #8e8e93;\n}\n.i-text-search-field::-ms-input-placeholder {\n  color: #8e8e93;\n}\n.i-text-search-field:hover {\n  background-color: #dedee4;\n}\n\n/*# sourceMappingURL=iSearchField.vue.map */","<template>\r\n  <input\r\n    class=\"i-text-search-field\"\r\n    :spellcheck=\"spellcheck\"\r\n    :style=\"propsStyle\"\r\n    :type=\"type\"\r\n    :placeholder=\"placeholder\"\r\n    :max=\"max\"\r\n    :min=\"min\"\r\n    :maxlength=\"maxlength\"\r\n    :value=\"value\"\r\n    @input=\"input\"\r\n  >\r\n</template>\r\n\r\n<script>\r\nimport boxModel from '@/mixins/box-model'\r\nimport textfield from '@/mixins/textfield'\r\n\r\nexport default {\r\n  name: 'iSearchField',\r\n  mixins: [ boxModel, textfield ],\r\n  props: {\r\n    type: {\r\n      type: String,\r\n      default: 'text'\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n$placeholder-color: #8e8e93;\r\n\r\n.i-text-search-field {\r\n  outline: none;\r\n  padding: .4rem .8rem;\r\n  background-color: #e3e3e8;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font-size: 1rem;\r\n  -webkit-transition: $transition-duration;\r\n     -moz-transition: $transition-duration;\r\n      -ms-transition: $transition-duration;\r\n       -o-transition: $transition-duration;\r\n          transition: $transition-duration;\r\n\r\n  &::placeholder {\r\n    color: $placeholder-color;\r\n  }\r\n\r\n  &:-ms-input-placeholder {\r\n    color: $placeholder-color;\r\n  }\r\n\r\n  &::-ms-input-placeholder {\r\n    color: $placeholder-color;\r\n  }\r\n\r\n  &:hover {\r\n    background-color: #dedee4;\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  

  
  var iSearchField = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    browser,
    undefined
  );

/**
 * @description Toggle status mixin
 */
var toggle = {
  props: {
    /**
     * @usage <toggle v-model="myValue"/>
     */
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change: function change ($event) {
      this.$emit('input', $event.target.checked);
    }
  }
};

//

var script$7 = {
  name: 'iSwitch',
  mixins: [ toggle ]
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { staticClass: "i-switch" }, [
    _c("input", {
      attrs: { type: "checkbox" },
      domProps: { value: _vm.value, checked: _vm.value },
      on: { change: _vm.change }
    }),
    _vm._v(" "),
    _c("span", { staticClass: "i-switch__slider" })
  ])
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-9e4cca94_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-switch {\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  width: 3.5rem;\n  height: 2.166rem;\n}\n.i-switch input[type=checkbox] {\n  display: none;\n  outline: none;\n  width: 0;\n  height: 0;\n}\n.i-switch input[type=checkbox]:checked + span.i-switch__slider {\n  background-color: #34c759;\n}\n.i-switch input[type=checkbox]:checked + span.i-switch__slider:before {\n  transform: translateX(1.333rem);\n}\n.i-switch__slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 1.083rem;\n  background-color: #eaeaeb;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-switch__slider:before {\n  content: \"\";\n  position: absolute;\n  height: 1.833rem;\n  width: 1.833rem;\n  left: 0.163rem;\n  bottom: 0.166rem;\n  border-radius: 50%;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  background-color: #fff;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n\n/*# sourceMappingURL=iSwitch.vue.map */", map: {"version":3,"sources":["iSwitch.vue","D:\\Source\\vue-ios\\src\\components\\iSwitch.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;ICaF,eAAA;ADXE;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;ICWF,eAAA;ADTE;AACF;ACKA;EDFE,wCAAwC;ECI1C,kBAAA;EACA,cAAA;EACA,aAAA;EACA,gBAAA;ADFA;ACIA;EACA,aAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;ADFA;ACMA;EACA,yBAnBA;ADeA;ACOA;EACA,+BAAA;ADLA;ACUA;EACA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,yBAnCA;EAoCA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ADRA;ACUA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,gBAAA;EACA,kBAAA;EACA,0CAAA;EACA,sBAAA;EACA,wBAAA;EACA,qBAAA;EACA,oBAAA;EACA,mBAAA;EACA,gBAAA;ADRA;;AAEA,sCAAsC","file":"iSwitch.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-switch {\n  -webkit-tap-highlight-color: transparent;\n  position: relative;\n  display: block;\n  width: 3.5rem;\n  height: 2.166rem;\n}\n.i-switch input[type=checkbox] {\n  display: none;\n  outline: none;\n  width: 0;\n  height: 0;\n}\n.i-switch input[type=checkbox]:checked + span.i-switch__slider {\n  background-color: #34c759;\n}\n.i-switch input[type=checkbox]:checked + span.i-switch__slider:before {\n  transform: translateX(1.333rem);\n}\n.i-switch__slider {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 1.083rem;\n  background-color: #eaeaeb;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n.i-switch__slider:before {\n  content: \"\";\n  position: absolute;\n  height: 1.833rem;\n  width: 1.833rem;\n  left: 0.163rem;\n  bottom: 0.166rem;\n  border-radius: 50%;\n  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);\n  background-color: #fff;\n  -webkit-transition: 0.3s;\n  -moz-transition: 0.3s;\n  -ms-transition: 0.3s;\n  -o-transition: 0.3s;\n  transition: 0.3s;\n}\n\n/*# sourceMappingURL=iSwitch.vue.map */","<template>\r\n  <label class=\"i-switch\">\r\n    <input type=\"checkbox\"\r\n      :value=\"value\"\r\n      :checked=\"value\"\r\n      @change=\"change\"\r\n    >\r\n    <span class=\"i-switch__slider\"></span>\r\n  </label>\r\n</template>\r\n\r\n<script>\r\nimport toggle from '@/mixins/toggle'\r\n\r\nexport default {\r\n  name: 'iSwitch',\r\n  mixins: [ toggle ]\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n@import '../common/style/mixin.scss';\r\n$toggle-color-active: #34c759;\r\n$toggle-color-deactive: #eaeaeb;\r\n\r\n.i-switch {\r\n  @include tap-highlight-disable;\r\n  position: relative;\r\n  display: block;\r\n  width: 3.5rem;\r\n  height: 2.166rem;\r\n\r\n  input[type=checkbox] {\r\n    display: none;\r\n    outline: none;\r\n    width: 0;\r\n    height: 0;\r\n\r\n    &:checked {\r\n\r\n      & + span.i-switch__slider {\r\n        background-color: $toggle-color-active;\r\n      }\r\n\r\n      & + span.i-switch__slider:before {\r\n        transform: translateX(1.333rem);\r\n      }\r\n    }\r\n  }\r\n\r\n  &__slider {\r\n    cursor: pointer;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    border-radius: 1.083rem;\r\n    background-color: $toggle-color-deactive;\r\n    -webkit-transition: $transition-duration;\r\n       -moz-transition: $transition-duration;\r\n        -ms-transition: $transition-duration;\r\n         -o-transition: $transition-duration;\r\n            transition: $transition-duration;\r\n\r\n    &:before {\r\n      content: \"\";\r\n      position: absolute;\r\n      height: 1.833rem;\r\n      width: 1.833rem;\r\n      left: 0.163rem;\r\n      bottom: 0.166rem;\r\n      border-radius: 50%;\r\n      box-shadow: 0px 1px 2px rgba(0, 0, 0, .2);\r\n      background-color: #fff;\r\n      -webkit-transition: $transition-duration;\r\n         -moz-transition: $transition-duration;\r\n          -ms-transition: $transition-duration;\r\n           -o-transition: $transition-duration;\r\n              transition: $transition-duration;\r\n    }\r\n  }\r\n}\r\n\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  

  
  var iSwitch = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//

var script$8 = {
  name: 'iTable',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "i-table" },
    [
      _vm.title
        ? _c("div", { staticClass: "i-table__title" }, [
            _vm._v("\n    " + _vm._s(_vm.title) + "\n  ")
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = function (inject) {
    if (!inject) { return }
    inject("data-v-87c1c29a_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-table {\n  width: 100%;\n  padding-top: 2rem;\n  background-color: #f2f2f7;\n}\n.i-table__title {\n  padding: 0 1rem;\n  margin-bottom: 0.4rem;\n  font-size: 0.86rem;\n  text-align: left;\n  color: #6d6d72;\n}\n.i-table .i-table-item {\n  border-top: 1px solid #c5c5c8;\n}\n.i-table > .i-table-item ~ .i-table-item {\n  border: none;\n}\n.i-table .i-table-item:last-child {\n  border-bottom: 1px solid #c5c5c8;\n}\n.i-table .i-table-item:last-child::before {\n  width: 0;\n  height: 0;\n}\n\n/*# sourceMappingURL=iTable.vue.map */", map: {"version":3,"sources":["iTable.vue","D:\\Source\\vue-ios\\src\\components\\iTable.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;ICaF,eAAA;ADXE;AACF;AACA;AACE;ICYF,eAAA;ADVE;AACF;AACA;AACE;ICWF,eAAA;ADTE;AACF;ACEA;EACA,WAAA;EACA,iBAAA;EACA,yBAAA;ADCA;ACCA;EACA,eAAA;EACA,qBAAA;EACA,kBAAA;EACA,gBAAA;EACA,cAAA;ADCA;ACEA;EACA,6BAAA;ADAA;ACGA;EACA,YAAA;ADDA;ACIA;EACA,gCAAA;ADFA;ACIA;EACA,QAAA;EACA,SAAA;ADFA;;AAEA,qCAAqC","file":"iTable.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-table {\n  width: 100%;\n  padding-top: 2rem;\n  background-color: #f2f2f7;\n}\n.i-table__title {\n  padding: 0 1rem;\n  margin-bottom: 0.4rem;\n  font-size: 0.86rem;\n  text-align: left;\n  color: #6d6d72;\n}\n.i-table .i-table-item {\n  border-top: 1px solid #c5c5c8;\n}\n.i-table > .i-table-item ~ .i-table-item {\n  border: none;\n}\n.i-table .i-table-item:last-child {\n  border-bottom: 1px solid #c5c5c8;\n}\n.i-table .i-table-item:last-child::before {\n  width: 0;\n  height: 0;\n}\n\n/*# sourceMappingURL=iTable.vue.map */","<template>\r\n  <div class=\"i-table\">\r\n    <div class=\"i-table__title\" v-if=\"title\">\r\n      {{ title }}\r\n    </div>\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iTable',\r\n  props: {\r\n    title: {\r\n      type: String,\r\n      default: ''\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n\r\n.i-table {\r\n  width: 100%;\r\n  padding-top: 2rem;\r\n  background-color: $light-background-color;\r\n\r\n  &__title {\r\n    padding: 0 1rem;\r\n    margin-bottom: .4rem;\r\n    font-size: .86rem;\r\n    text-align: left;\r\n    color: $light-secondary-text-color;\r\n  }\r\n\r\n  .i-table-item {\r\n    border-top: 1px solid $light-border-color;\r\n  }\r\n\r\n  & > .i-table-item ~ .i-table-item {\r\n    border: none;\r\n  }\r\n\r\n  .i-table-item:last-child {\r\n    border-bottom: 1px solid $light-border-color;\r\n\r\n    &::before {\r\n      width: 0;\r\n      height: 0;\r\n    }\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  

  
  var iTable = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    browser,
    undefined
  );

//
//
//
//
//
//

var script$9 = {
  name: 'iTableItem'
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "i-table-item" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-dbb548c8_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-table-item {\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  width: 100%;\n  padding: 0.3rem 1rem;\n  vertical-align: top;\n  background-color: #ffffff;\n}\n.i-table-item:before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: calc(100% - 1rem);\n  height: 1px;\n  background-color: #c5c5c8;\n}\n.i-table-item .left {\n  margin-right: auto;\n}\n.i-table-item .left.i-button {\n  padding-left: 0;\n}\n.i-table-item .right {\n  margin-left: auto;\n}\n.i-table-item .right.i-button {\n  padding-right: 0;\n}\n.i-table-item .center {\n  float: none;\n  text-align: center;\n  margin: 0 auto;\n}\n.i-table-item .i-label {\n  line-height: 2.2rem;\n}\n\n/*# sourceMappingURL=iTableItem.vue.map */", map: {"version":3,"sources":["iTableItem.vue","D:\\Source\\vue-ios\\src\\components\\iTableItem.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;ECQA,kGAAA;ADNA;AACA;AACE;ICaF,eAAA;ADXE;AACF;AACA;AACE;ICYF,eAAA;ADVE;AACF;AACA;AACE;ICWF,eAAA;ADTE;AACF;ACPA;EACA,aAAA;EACA,8BAAA;EACA,kBAAA;EACA,WAAA;EACA,oBAAA;EACA,mBAAA;EACA,yBAAA;ADUA;ACRA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,wBAAA;EACA,WAAA;EACA,yBAAA;ADUA;ACPA;EACA,kBAAA;ADSA;ACPA;EACA,eAAA;ADSA;ACLA;EACA,iBAAA;ADOA;ACLA;EACA,gBAAA;ADOA;ACHA;EACA,WAAA;EACA,kBAAA;EACA,cAAA;ADKA;ACFA;EACA,mBAAA;ADIA;;AAEA,yCAAyC","file":"iTableItem.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-table-item {\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  width: 100%;\n  padding: 0.3rem 1rem;\n  vertical-align: top;\n  background-color: #ffffff;\n}\n.i-table-item:before {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: calc(100% - 1rem);\n  height: 1px;\n  background-color: #c5c5c8;\n}\n.i-table-item .left {\n  margin-right: auto;\n}\n.i-table-item .left.i-button {\n  padding-left: 0;\n}\n.i-table-item .right {\n  margin-left: auto;\n}\n.i-table-item .right.i-button {\n  padding-right: 0;\n}\n.i-table-item .center {\n  float: none;\n  text-align: center;\n  margin: 0 auto;\n}\n.i-table-item .i-label {\n  line-height: 2.2rem;\n}\n\n/*# sourceMappingURL=iTableItem.vue.map */","<template>\r\n  <div class=\"i-table-item\">\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iTableItem'\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n\r\n.i-table-item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  position: relative;\r\n  width: 100%;\r\n  padding: .3rem 1rem;\r\n  vertical-align: top;\r\n  background-color: $light-pure-color;\r\n\r\n  &:before {\r\n    content: \"\";\r\n    position: absolute;\r\n    bottom: 0;\r\n    right: 0;\r\n    width: calc(100% - 1rem);\r\n    height: 1px;\r\n    background-color: $light-border-color;\r\n  }\r\n\r\n  .left {\r\n    margin-right: auto;\r\n\r\n    &.i-button {\r\n      padding-left: 0;\r\n    }\r\n  }\r\n\r\n  .right {\r\n    margin-left: auto;\r\n\r\n    &.i-button {\r\n      padding-right: 0;\r\n    }\r\n  }\r\n\r\n  .center {\r\n    float: none;\r\n    text-align: center;\r\n    margin: 0 auto;\r\n  }\r\n\r\n  .i-label {\r\n    line-height: 2.2rem;\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  

  
  var iTableItem = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    browser,
    undefined
  );

//

var script$a = {
  name: 'iTextField',
  mixins: [ boxModel, textfield ],
  props: {
    type: {
      type: String,
      default: 'text'
    }
  }
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    staticClass: "i-text-field",
    style: _vm.propsStyle,
    attrs: {
      spellcheck: _vm.spellcheck,
      type: _vm.type,
      placeholder: _vm.placeholder,
      max: _vm.max,
      min: _vm.min,
      maxlength: _vm.maxlength
    },
    domProps: { value: _vm.value },
    on: { input: _vm.input }
  })
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  var __vue_inject_styles__$a = function (inject) {
    if (!inject) { return }
    inject("data-v-6363e868_0", { source: "@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 768px) {\nhtml {\n    font-size: 16px;\n}\n}\n@media (min-width: 1224px) {\nhtml {\n    font-size: 16px;\n}\n}\n.i-text-field {\n  outline: none;\n  padding: 0.4rem 0.8rem;\n  background-color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n}\n.i-text-field::placeholder {\n  color: #8a8a8d;\n}\n.i-text-field:-ms-input-placeholder {\n  color: #8a8a8d;\n}\n.i-text-field::-ms-input-placeholder {\n  color: #8a8a8d;\n}\n\n/*# sourceMappingURL=iTextField.vue.map */", map: {"version":3,"sources":["iTextField.vue","D:\\Source\\vue-ios\\src\\components\\iTextField.vue"],"names":[],"mappings":"AAAA,gFAAgF;AAChF;EACE,sBAAsB;AACxB;AAEA;EACE,kGAAkG;AACpG;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;AACA;AACE;IACE,eAAe;AACjB;AACF;ACaA;EACA,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;ADVA;ACYA;EACA,cAXA;ADCA;ACaA;EACA,cAfA;ADIA;ACcA;EACA,cAnBA;ADOA;;AAEA,yCAAyC","file":"iTextField.vue","sourcesContent":["@import url(\"https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap\");\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-family: \"Helvetica Neue\", \"Apple SD Gothic Neo\", \"Nanum Gothic\", Helvetica, Arial, sans-serif;\n}\n@media (min-width: 320px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n@media (min-width: 1224px) {\n  html {\n    font-size: 16px;\n  }\n}\n\n.i-text-field {\n  outline: none;\n  padding: 0.4rem 0.8rem;\n  background-color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n}\n.i-text-field::placeholder {\n  color: #8a8a8d;\n}\n.i-text-field:-ms-input-placeholder {\n  color: #8a8a8d;\n}\n.i-text-field::-ms-input-placeholder {\n  color: #8a8a8d;\n}\n\n/*# sourceMappingURL=iTextField.vue.map */","<template>\r\n  <input\r\n    class=\"i-text-field\"\r\n    :spellcheck=\"spellcheck\"\r\n    :style=\"propsStyle\"\r\n    :type=\"type\"\r\n    :placeholder=\"placeholder\"\r\n    :max=\"max\"\r\n    :min=\"min\"\r\n    :maxlength=\"maxlength\"\r\n    :value=\"value\"\r\n    @input=\"input\"\r\n  >\r\n</template>\r\n\r\n<script>\r\nimport boxModel from '@/mixins/box-model'\r\nimport textfield from '@/mixins/textfield'\r\n\r\nexport default {\r\n  name: 'iTextField',\r\n  mixins: [ boxModel, textfield ],\r\n  props: {\r\n    type: {\r\n      type: String,\r\n      default: 'text'\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n@import '../common/style/common.scss';\r\n$placeholder-color: #8a8a8d;\r\n\r\n.i-text-field {\r\n  outline: none;\r\n  padding: .4rem .8rem;\r\n  background-color: $light-pure-color;\r\n  border: none;\r\n  border-radius: 6px;\r\n  font-size: 1rem;\r\n\r\n  &::placeholder {\r\n    color: $placeholder-color;\r\n  }\r\n\r\n  &:-ms-input-placeholder {\r\n    color: $placeholder-color;\r\n  }\r\n\r\n  &::-ms-input-placeholder {\r\n    color: $placeholder-color;\r\n  }\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject SSR */
  

  
  var iTextField = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    browser,
    undefined
  );

//
//
//
//
//
//

var script$b = {
  name: 'iView'
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "i-view" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  var __vue_inject_styles__$b = function (inject) {
    if (!inject) { return }
    inject("data-v-5218ea10_0", { source: ".i-view {\n  width: 100%;\n  height: 100%;\n}\n.i-view .i-table:nth-last-child(1) {\n  padding-bottom: 2rem;\n}\n\n/*# sourceMappingURL=iView.vue.map */", map: {"version":3,"sources":["D:\\Source\\vue-ios\\src\\components\\iView.vue","iView.vue"],"names":[],"mappings":"AAcA;EACA,WAAA;EACA,YAAA;ACbA;ADeA;EACA,oBAAA;ACbA;;AAEA,oCAAoC","file":"iView.vue","sourcesContent":["<template>\r\n  <div class=\"i-view\">\r\n    <slot/>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: 'iView'\r\n}\r\n\r\n</script>\r\n\r\n<style lang=\"scss\">\r\n.i-view {\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  .i-table:nth-last-child(1) {\r\n    padding-bottom: 2rem;\r\n  }\r\n}\r\n</style>\r\n",".i-view {\n  width: 100%;\n  height: 100%;\n}\n.i-view .i-table:nth-last-child(1) {\n  padding-bottom: 2rem;\n}\n\n/*# sourceMappingURL=iView.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject SSR */
  

  
  var iView = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    browser,
    undefined
  );

var components = {
  iAlert: iAlert,
  iApp: iApp,
  iButton: iButton,
  iLabel: iLabel,
  iSearchField: iSearchField,
  iSwitch: iSwitch,
  iTable: iTable,
  iTableItem: iTableItem,
  iTextField: iTextField,
  iView: iView
};

function install (Vue) {
  if (install.installed) {
    return
  }

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

export { iAlert, iApp, iButton, iLabel, iSearchField, iSwitch, iTable, iTableItem, iTextField, iView, install };
