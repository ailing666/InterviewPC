// 导入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)
// 导入子组件
import Login from '@/views/login/Login.vue'
// 实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

// 暴露
export default router
