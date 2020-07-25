// 导入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)
// 导入子组件
import Login from '@/views/login/Login.vue'
import Layout from '@/views/layout/Layout.vue'
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
    },
    {
      path: '/layout',
      component: Layout
    }
  ]
})

// 暴露
export default router
