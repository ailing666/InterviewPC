// 导入
import Vue from 'vue'
import Vuex from 'vuex'
// 注册
Vue.use(Vuex)
// 实例化
const store = new Vuex.Store({
  state: {
    userInfo: ''
  }
})
// 暴露
export default store
