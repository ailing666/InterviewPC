<template>
  <div class="userlist">
    <el-card>
      <el-form :model="form" ref="form" inline>
        <el-form-item prop="username" label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="用户邮箱">
          <el-input v-model="form.email"></el-input>
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
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearList">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="userlist">
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
        <el-table-column label="用户名" prop="username"> </el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
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
      <AdduserList
        ref="adduserlist"
        :type="type"
        @search="search"
      ></AdduserList>
    </el-card>
  </div>
</template>

<script>
import { getUserList, setStatus, delList } from '@/api/userlist'
import AdduserList from '@/views/layout/userList/AddUserList.vue'
export default {
  created () {
    this.getData()
  },
  components: { AdduserList },
  data () {
    return {
      type: 'edit',
      pagination: {
        pageSize: 1,
        currentPage: 1,
        total: 10
      },

      form: {
        username: '', //	否	string	昵称
        email: '', //	否	string	邮箱
        role_id: '', //	否	string	角色数字 2管理员、3老师、 4学生
        page: '', //	否	string	页码 默认为1
        limit: '' //	否	string	页尺寸 默认为10
      },
      userlist: []
    }
  },
  computed: {
    roleInfo () {
      return this.$store.state.roleObj
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
      getUserList(_query).then(res => {
        this.userlist = res.data.items
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
      this.$refs.adduserlist.isShow = true
      //  深克隆
      this.$refs.adduserlist.form = JSON.parse(JSON.stringify(row))
    },
    add () {
      this.type = 'add'
      this.$refs.adduserlist.isShow = true
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
