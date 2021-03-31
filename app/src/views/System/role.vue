<template>
  <div class="main-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/system/user' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
     <div class="search-box">
      <el-form label-position="right">
        <el-form-item label="搜索" class="sel-item" style="margin-left:40px;">
          <el-select v-model="searchKey" placeholder="请选择" size="mini" style="width:80%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" class="inp-item" >
          <el-input
            size="mini"
            v-model="searchValue">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="el-button--primary is-plain searchBtn" size="mini" round @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button icon="el-icon-plus" class="el-button-top" size="small" type="primary" plain @click="add">创建角色</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column  label="序号">
        <template scope="scope"><span>{{scope.$index+(pageObject.pageNum - 1) * pageObject.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column
        prop="nameCode"
        label="角色英文名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色中文名称">
      </el-table-column>
      <el-table-column
        prop="describe"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="150">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            plain
            type="primary"
            size="mini"
            @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      v-if="hackReset"
      :current-page.sync="pageObject.pageNum"
      :page-size="pageObject.pageSize"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50]"
      @current-change="handleCurrentChange"
      layout="slot, total, prev, pager, next, jumper"
      :total="pageTotal">
      <span class="el-pagination__total">当前页{{tableData.length}}条</span>
    </el-pagination>
    <el-dialog title="删除角色" :visible.sync="dialogVisible" width="35%">
      <span style="text-align: center;">是否删除该角色？</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDel"> 是 </el-button>
        <el-button @click="dialogVisible=false"> 否 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, deltRole } from '@/services/LoginService'
export default {
  data () {
    return {
      searchKey: '',
      searchValue: '',
      tableData: [],
      dialogVisible: false,
      pageObject: {
        type: '',
        pageSize: 10,
        pageNum: 1,
        value: ''
      },
      options: [{
        value: '',
        label: '请选择'
      }, {
        value: 'nameCode',
        label: '角色英文名称'
      }, {
        value: 'name',
        label: '角色中文名称'
      }],
      pageTotal: 0,
      delId: 0,
      hackReset: true
    }
  },
  // beforeDestroy () {
  //   this.$root.Bus.$off('pageUpdate', this.getList);
  // },
  mounted () {
    this.getList()
    // this.$root.Bus.$on('pageUpdate', this.getList);
  },
  methods: {
    hack () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    handleCurrentChange (val) {
      this.pageObject.pageNum = val
      this.getList()
    },
    handleSizeChange (val) {
      this.pageObject.pageSize = val
      this.pageObject.pageNum = 1
      this.getList()
    },
    getList () {
      const data = Object.assign({}, this.pageObject)
      if (this.searchKey && this.searchValue) {
        data[this.searchKey] = this.searchValue
      }
      roleList(data).then(res => {
        if (!res) return
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pageTotal = res.data.total
          this.hack()
        }
      })
    },
    add () {
      this.$router.push('/system/addEditRole')
    },
    edit (index, row) {
      this.$router.push({ name: '/system/addEditRole', params: { id: row.id } })
    },
    del (index, row) {
      this.dialogVisible = true
      this.delId = row.id
    },
    confirmDel () {
      deltRole({ id: this.delId }).then(res => {
        if (!res) return
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.dialogVisible = false
          this.getList()
        }
      })
    },
    query () {
      this.pageObject.pageNum = 1
      this.getList()
    }
  }
}
</script>

<style scoped>
  .el-button-top{
    margin-top: 12px;
  }
  .search-box{
    margin:20px 0 15px;
    width: 100%;
    border: 1px solid rgba(228, 228, 228, 1);
    padding:30px 0px;
    background-color: #fff;
  }
   .search-box .el-form-item{
    display: inline-block;
    width:20%;
    margin-bottom: 0;
  }
</style>
