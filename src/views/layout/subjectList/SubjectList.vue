<template>
  <div class="subjectList">
    <el-card>
      <el-form :model="form" ref="form" inline>
        <el-form-item porp="rid" label="学科编号">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item porp="name" label="学科名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item porp="username" label="创建者">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item porp="status" label="状态">
          <el-select v-model="form.status">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="subjectList">
        <el-table-column label="序号" width="50px">
          <template v-slot="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid"> </el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            <div>
              {{ scope.row.status === 0 ? '禁用' : '启用' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-link type="primary" @click="edit(scope.row)">编辑</el-link>
              <el-link
                type="primary"
                class="status"
                @click="changeStatus(scope.row.id)"
                >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-link
              >
              <el-link type="primary" @click="del(scope.row.id)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getSubjectList } from '@/api/subject'
export default {
  created () {
    getSubjectList(this.form).then(res => {
      this.subjectList = res.data.items
    })
  },
  data () {
    return {
      form: {
        rid: '', //	否	string	学科编号
        name: '', //	否	string	学科名称
        username: '', //	否	string	创建者用户名
        status: '', //	否	string	状态 0(禁用) 1(启用)
        page: '', //	否	string	页码 默认为1
        limit: '' //	否	string	页尺寸 默认为10
      },
      subjectList: []
    }
  },
  methods: {
    edit (row) {
      window.console.log(row)
    },
    changeStatus (id) {
      window.console.log(id)
    },
    del (id) {
      window.console.log(id)
    }
  }
}
</script>

<style>
.status {
  margin: 0 10px;
}
</style>
