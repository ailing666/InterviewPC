import Vue from 'vue'
import App from './App.vue'
// 导入router
import router from '@/router/index.js'
// 导入element-ui
import ElementUi from 'element-ui'
// 导入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入vuex
import store from '@/store/index.js'
// 注册
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  // 注入vue实例
  router,
  // 注入vuex
  store,
  render: h => h(App)
}).$mount('#app')
