<template>
  <div class="layout">
    <el-container>
      <el-header class="layout_header">
        <i class="el-icon-s-fold"></i>
        <img src="@/assets/img/layout-logo.png" alt="" />
        <p class="flex"></p>
        <img src="@/assets/img/layout-avatar.png" alt="" />
        <span class="username">李达,您好</span>
        <el-button type="primary">退出</el-button>
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
export default {
  data () {
    return {
      data () {
        return {}
      }
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
  .username {
    font-size: 20px;
    margin-right: 15px;
  }
}
</style>
