<template>
  <div class="login">
    <div class="login_left">
      <!-- 标题 -->
      <div class="login_left_title">
        <h5 class="login_left_title_logo">
          <img src="@/assets/img/login_logo.png" alt="" />
        </h5>
        <div>面试宝典</div>
        <div class="login_left_title_line"></div>
        <div>用户登录</div>
      </div>
      <!-- 表单 -->
      <div class="login_left_body">
        <el-form :model="form">
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="16"
                ><el-input
                  v-model="form.code"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-key"
                ></el-input
              ></el-col>
              <el-col :span="8">
                <img class="login_imgCode" src="@/assets/img/code.jpg" alt="" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              >我已阅读并同意<el-link type="primary">用户协议</el-link
              >和<el-link type="primary">隐私条款</el-link></el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_button">登录</el-button>
            <br />
            <el-button type="primary" class="login_button">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login_right">
      <img src="@/assets/img/login_right.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        phone: '', //是	string	手机号
        password: '', //是	string	密码
        code: '' //是	string	验证码
      }
    }
  }
}
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(-225deg, #1493fa, #01c6fa);
  .login_left {
    width: 480px;
    height: 550px;
    padding: 40px;
    background-color: #f5f5f5;
    box-sizing: border-box;
    .login_left_title {
      display: flex;
      margin-bottom: 30px;
      font-size: 20px;
      .login_left_title_logo {
        margin-right: 20px;
      }
      .login_left_title_line {
        width: 1px;
        height: 28px;
        margin: 0 20px;
        background-color: #e2e2e2;
      }
    }
    .login_left_body {
      .login_imgCode {
        height: 42px;
        width: 100%;
      }
      .login_button {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
