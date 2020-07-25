// 导入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)
// 导入子组件
import Login from '@/views/login/Login.vue'
import Layout from '@/views/layout/Layout.vue'
import Chart from '@/views/layout/chart/Chart.vue'
import EnterpriseList from '@/views/layout/enterpriseList/EnterpriseList.vue'
import QuestionList from '@/views/layout/questionList/QuestionList.vue'
import SubjectList from '@/views/layout/subjectList/SubjectList.vue'
import UserList from '@/views/layout/userList/UserList.vue'
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
      component: Layout,
      redirect: '/layout/subjectList',
      children: [
        {
          path: '/layout/chart',
          component: Chart,
          meta: {
            title: '数据概览',
            icon: 'el-icon-pie-chart'
          }
        },

        {
          path: '/layout/enterpriseList',
          component: EnterpriseList,
          meta: {
            title: '企业列表',
            icon: 'el-icon-office-building'
          }
        },
        {
          path: '/layout/questionList',
          component: QuestionList,
          meta: {
            title: '题库列表',
            icon: 'el-icon-edit-outline'
          }
        },
        {
          path: '/layout/subjectList',
          component: SubjectList,
          meta: {
            title: '学科列表',
            icon: 'el-icon-notebook-2'
          }
        },
        {
          path: '/layout/userList',
          component: UserList,
          meta: {
            title: '用户列表',
            icon: 'el-icon-user'
          }
        }
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach()

// 暴露
export default router
