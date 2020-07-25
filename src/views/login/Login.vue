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
        <el-form :model="form" :rules="rules" ref="form">
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
              show-password
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
                <img
                  class="login_imgCode"
                  :src="login_imgCode"
                  @click="refreshCode"
                  alt=""
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="isPass">
            <el-checkbox v-model="form.isPass"
              >我已阅读并同意<el-link type="primary">用户协议</el-link
              >和<el-link type="primary">隐私条款</el-link></el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_button" @click="submit"
              >登录</el-button
            >
            <br />
            <el-button type="primary" class="login_button" @click="showRegister"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <Register ref="register"></Register>
    </div>
    <div class="login_right">
      <img src="@/assets/img/login_right.png" alt="" />
    </div>
  </div>
</template>

<script>
import { toLogin } from '@/api/login.js'
import { saveToken } from '@/util/token.js'
import Register from '@/views/login/Register.vue'
export default {
  components: { Register },
  data () {
    return {
      login_imgCode: process.env.VUE_APP_URL + '/captcha?type=login',
      form: {
        isPass: '',
        phone: '', //是	string	手机号
        password: '', //是	string	密码
        code: '' //是	string	验证码
      },
      rules: {
        isPass: [
          {
            validator: (rule, value, callback) => {
              if (value == true) {
                callback()
              } else {
                callback(new Error('请勾选同意用户条款'))
              }
            }
          }
        ],
        phone: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('手机号格式错误'))
              }
            },
            trigger: 'change'
          }
        ],
        password: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位数验证码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(result => {
        if (result) {
          toLogin(this.form).then(res => {
            this.$message.success('登陆成功')
            // 保存用户的token
            saveToken(res.data.token)
            // 跳转路由
            this.$router.push('/layout')
          })
        } else {
          this.$message.error('登录失败')
        }
      })
    },
    showRegister () {
      this.$refs.register.isShow = true
    },
    // 刷新图形码
    refreshCode () {
      this.login_imgCode =
        process.env.VUE_APP_URL + '/captcha?type=login&t=' + Date.now()
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
