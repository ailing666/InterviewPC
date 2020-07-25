<template>
  <div class="addSubject">
    <el-dialog :visible="isShow" width="30%">
      <div slot="title">新增企业</div>
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
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
import { addList, editList } from '@/api/enterprise'
export default {
  props: ['type'],
  watch: {
    isShow (newVal) {
      if (newVal == false) {
        this.form = {
          eid: '', //	是	string	企业编号
          name: '', //	是	string	企业名称
          short_name: '', //	是	string	企业简称
          intro: '', //	是	string	企业简介
          remark: '' //	否	string	企业备注
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
        eid: '', //	是	string	企业编号
        name: '', //	是	string	企业名称
        short_name: '', //	是	string	企业简称
        intro: '', //	是	string	企业简介
        remark: '' //	否	string	企业备注
      },
      rules: {
        eid: [{ required: true, message: '必填', trigger: 'change' }],
        name: [{ required: true, message: '必填', trigger: 'change' }],
        short_name: [{ required: true, message: '必填', trigger: 'change' }],
        intro: [{ required: true, message: '必填', trigger: 'change' }]
      }
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
