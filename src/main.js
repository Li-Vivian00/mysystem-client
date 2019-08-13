// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueI18n from 'vue-i18n'
// import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "babel-polyfill";
import _ from 'lodash'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(_)
Vue.use(VueI18n)
Vue.prototype.$http = axios

import local from './locales/index'
const i18n = local(VueI18n);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
    // SIdentify
  },
  template: '<App/>',
  i18n
})
