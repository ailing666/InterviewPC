<template>
  <div class="register">
    <el-dialog
      title="提示"
      :visible.sync="isShow"
      width="40%"
      :show-close="false"
    >
      <div slot="title">用户注册</div>
      <!-- 表单区域 -->
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item prop="avatar" label="头像">
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="username" label="昵称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="imgCode" label="图形码">
          <el-row>
            <el-col :span="15">
              <el-input v-model="form.imgCode"></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <img :src="imgCodeUrl" @click="changeCode" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="rcode" label="验证码">
          <el-row>
            <el-col :span="15">
              <el-input v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-button :disabled="time != 3" @click="getUserCode"
                >获取用户验证码<span v-if="time != 3"
                  >{{ time }}秒)</span
                ></el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="sumbit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 30, //倒计时
      isShow: false, //对话框是否显示
      uploadUrl: process.env.VUE_APP_URL + '/uploads', //接口地址
      imageUrl: '', // 上传图片的地址
      imgCodeUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      form: {
        avatar: '', //	是	string	头像地址
        username: '', //	是	string	用户名
        email: '', //	是	string	邮箱
        phone: '', //	是	string	手机号
        password: '', //	是	string	密码
        imgCode: '', //图形码
        rcode: '' //	是	string	验证码
      },
      rules: {
        avatar: [{ required: true, message: '必填哦', trigger: 'blur' }],
        username: [
          { required: true, message: '必填哦', trigger: 'blur' },
          { min: 2, message: '最小长度为2', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '必填哦', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('邮箱格式不正确哦'))
              }
            },
            trigger: 'blur'
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
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ],
        imgCode: [
          { required: true, message: '必填哦', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位数的验证码', trigger: 'blur' }
        ],
        rcode: [
          { required: true, message: '必填哦', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位数的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getUserCode () {
      this.time--
      let timer = setInterval(() => {
        this.time--
        if (this.time < 0) {
          clearInterval(timer)
          this.time = 30
        }
      }, 1000)
    },
    // 上传前
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG & PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传成功
    handleAvatarSuccess (res) {
      // 将图片地址赋值给form.avatar
      this.form.avatar = res.data.file_path
      // 上传成功图片地址
      this.imageUrl = process.env.VUE_APP_URL + '/' + res.data.file_path

      // 手动触发验证
      this.$refs.form.validateField(['avatar'])
    },
    changeCode () {
      this.imgCodeUrl =
        process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now()
    },
    // 提交
    sumbit () {
      this.$refs.form.validate(result => {
        if (result) {
          this.$message.success('注册成功')
        } else {
          this.$message.error('注册失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.register {
  .el-dialog__header {
    height: 35px;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #1493fa, #01c6fa);
  }
  .el-dialog__footer {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
