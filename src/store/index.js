// 导入
import Vue from 'vue'
import Vuex from 'vuex'
// 注册
Vue.use(Vuex)
// 实例化
const store = new Vuex.Store({
  state: {
    userInfo: '',
    roleObj: {
      1: '超级管理员',
      2: '管理员',
      3: '老师',
      4: '学生'
    },
    // m默认
    role: '超级管理员'
  }
})
// 暴露
export default store
