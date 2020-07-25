<template>
  <div class="addSubject">
    <el-dialog :visible="isShow" width="30%">
      <div slot="title">新增用户</div>
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id">
            <el-option
              v-for="(value, key, index) in roleInfo"
              :key="index"
              :label="value"
              :value="+key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="禁用" :value="1"></el-option>
            <el-option label="启用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addList, editList } from '@/api/userlist'
export default {
  props: ['type'],
  watch: {
    isShow (newVal) {
      if (newVal == false) {
        this.form = {
          id: '', //	是	int	用户标识
          username: '', //	否	string	昵称
          email: '', //	否	string	邮箱
          phone: '', //	否	string	手机号
          role_id: '', //	否	string	角色：2管理员、3老师、4学生
          status: '', //	否	string	状态：1启用0禁用
          remark: '', //	否	string	备注
          avatar: '', //	否	string	头像
          password: '' //	否	string	密码
        }
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  },
  data () {
    return {
      isShow: false,
      form: {
        username: '', //	是	string	用户名
        email: '', //	是	string	邮箱
        phone: '', //	是	string	手机号
        role_id: '', //	是	string	角色 、2 管理员、3 老师、4 学生
        status: '', //	否	string	1(启用)0(禁用)
        remark: '' //	否	string	备注
      },
      rules: {
        username: [{ required: true, message: '必填', trigger: 'change' }],
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
        role_id: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  computed: {
    roleInfo () {
      return this.$store.state.roleObj
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.type === 'add') {
            addList(this.form).then(() => {
              this.$message.success('添加成功')
              this.$emit('search')
              this.isShow = false
            })
          } else {
            editList(this.form).then(() => {
              this.$message.success('编辑成功')
              this.$emit('search')
              this.isShow = false
            })
          }
        }
      })
    },
    close () {
      this.isShow = false
    }
  }
}
</script>

<style>
.el-dialog__header {
  height: 35px;
  color: #fff;
  text-align: center;
  background: linear-gradient(to right, #1493fa, #01c6fa);
}
.el-dialog__footer {
  text-align: center;
}
</style>
