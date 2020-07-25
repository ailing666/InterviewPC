<template>
  <div class="layout">
    <el-container>
      <el-header class="layout_header">
        <i class="el-icon-s-fold"></i>
        <img src="@/assets/img/layout-logo.png" alt="" />
        <p class="flex"></p>
        <img class="user-avatar" :src="baseURL + '/' + info.avatar" alt="" />
        <span class="username">{{ info.username }},您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="$route.path" router>
            <el-menu-item
              v-for="(item, index) in $router.options.routes[2].children"
              :key="index"
              :index="item.path"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfo, userExit } from '@/api/layout.js'
import { removeToken } from '@/util/token.js'
export default {
  created () {
    getUserInfo().then(res => {
      this.$store.state.userInfo = res.data
    })
  },
  data () {
    return {
      baseURL: process.env.VUE_APP_URL
    }
  },
  methods: {
    exit () {
      this.$confirm('您确定要退出吗?', '提示', {
        comfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      })
        .then(() => {
          userExit().then(() => {
            // 清楚token
            removeToken()
            // 跳转到login液
            this.$router.push('/login')
          })
        })
        .catch(() => {})
    }
  },
  computed: {
    info () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style lang="less">
.layout_header {
  display: flex;
  height: 50px;
  line-height: 50px;
  align-items: center;
  .el-icon-s-fold {
    margin-right: 10px;
  }
  .flex {
    flex: 1;
  }
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .username {
    font-size: 20px;
    margin-right: 15px;
  }
}
</style>
