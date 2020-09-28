/*
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-25 13:37:30
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import TennetcnUI from 'tennetcn-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'tennetcn-ui/lib/styles/index.css'
import '@/styles/index.scss'
Vue.config.productionTip = false

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(TennetcnUI)

import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
