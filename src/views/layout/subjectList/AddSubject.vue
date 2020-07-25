<template>
  <div class="addSubject">
    <el-dialog :visible="isShow" width="30%">
      <div slot="title">新增学科</div>
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
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
import { addList, editList } from '@/api/subject'
export default {
  props: ['type'],
  watch: {
    isShow (newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields()
        this.imageUrl = ''
      }
    }
  },
  data () {
    return {
      isShow: false,
      form: {
        rid: '', //是	string	学科编号
        name: '', //是	string	学科名称
        short_name: '', //否	string	学科简称
        intro: '', //否	string	学科简介
        remark: '' //否	string	备注
      },
      rules: {
        rid: [{ required: true, message: '必填', trigger: 'change' }],
        name: [{ required: true, message: '必填', trigger: 'change' }]
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
