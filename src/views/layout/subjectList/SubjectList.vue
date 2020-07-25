<template>
  <div class="subjectList">
    <el-card>
      <el-form :model="form" ref="form" inline>
        <el-form-item prop="rid" label="学科编号">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearList">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="subjectList">
        <el-table-column label="序号" width="50px">
          <template v-slot="scope">
            <div>
              {{
                (pagination.currentPage - 1) * pagination.pageSize +
                  scope.$index +
                  1
              }}
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
            <div>{{ scope.row.status === 0 ? '禁用' : '启用' }}</div>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[1, 5, 10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
      <AddSubject ref="addSubject" :type="type" @search="search"></AddSubject>
    </el-card>
  </div>
</template>

<script>
import { getSubjectList, setStatus, delList } from '@/api/subject'
import AddSubject from '@/views/layout/subjectList/AddSubject.vue'
export default {
  created () {
    this.getData()
  },
  components: { AddSubject },
  data () {
    return {
      type: 'edit',
      pagination: {
        pageSize: 1,
        currentPage: 1,
        total: 10
      },
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
    getData () {
      let _query = {
        ...this.form,
        // 需要单独传页码和页容量
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
      }
      getSubjectList(_query).then(res => {
        this.subjectList = res.data.items
        this.pagination.total = res.data.pagination.total
      })
    },
    search () {
      this.pagination.currentPage = 1
      this.getData()
    },
    // 清除
    clearList () {
      this.$refs.form.resetFields()
      this.search()
    },
    // 页容量改变
    handleSizeChange (size) {
      this.pagination.pageSize = size
      this.search()
    },
    handleCurrentChange (page) {
      this.pagination.currentPage = page
      this.getData()
    },
    edit (row) {
      this.type = 'edit'
      this.$refs.addSubject.isShow = true
      //  深克隆
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row))
    },
    add () {
      this.type = 'add'
      this.$refs.addSubject.isShow = true
    },
    // 设置状态
    changeStatus (id) {
      setStatus({ id }).then(() => {
        this.$message.success('状态设置成功')
        this.search()
      })
    },
    del (id) {
      this.$confirm('您确定要删除这条数据吗', '提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delList({ id }).then(() => {
            this.$message.success('删除成功')
            this.search()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
.status {
  margin: 0 10px;
}
</style>
