<template>
  <div class="main-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/system/user' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-box">
      <el-form label-position="right" label-width="80px" :inline="true" size="mini">
        <el-form-item label="搜索" class="sel-item">
          <el-select v-model="searchKey" placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.typeId"
              :label="item.label"
              :value="item.typeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=""  label-width="0px">
          <el-input  v-model="searchValue">  </el-input>
        </el-form-item>
        <el-form-item label="用户状态" class="sel-status">
          <el-select v-model="pageObject.enabled" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.enabledId"
              :label="item.label"
              :value="item.enabledId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="创建时间" class="start-time">
         <el-date-picker size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"  v-model="pageObject.startTime" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item  label="-" label-width="20px">
         <el-date-picker size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"  v-model="pageObject.endTime" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" class="el-button--primary is-plain searchBtn" size="mini" round @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button icon="el-icon-plus" size="small" type="primary" plain @click="add">添加用户</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column  label="序号">
        <template scope="scope"><span>{{scope.$index+(pageObject.pageNum - 1) * pageObject.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column
        prop="belongDept"
        label="所属部门">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="workNumber"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="createTime"
        show-overflow-tooltip
        :formatter="formatTime"
        label="创建时间"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="用户状态">
        <template slot-scope="scope">
            {{scope.row.enabled == 1 ? '启用' : '停用'}}
         </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="150">
        <template slot-scope="scope">
          <el-button
            plain
            type="primary"
            size="mini"
            @click="edit(scope.$index, scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="hackReset"
      background
      :current-page="pageObject.pageNum"
      :page-size="pageObject.pageSize"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50]"
      @current-change="handleCurrentChange"
      layout="slot, total, prev, pager, next, jumper"
      :total="pageTotal">
      <span class="el-pagination__total">当前页{{tableData.length}}条</span>
    </el-pagination>
    <!--<el-pagination-->
      <!--background-->
      <!--:current-page="pageObject.pageNum"-->
      <!--:page-size="pageObject.pageSize"-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--layout="slot, total, prev, pager, next, jumper"-->
      <!--:total="pageTotal">-->
      <!--<span class="el-pagination__total">当前页{{tableData.length}}条</span>-->
    <!--</el-pagination>-->
  </div>
</template>

<script>
import { userList } from '@/services/LoginService'
export default {
  data () {
    return {
      searchKey: '',
      searchValue: '',
      tableData: [],
      options: [{
        typeId: '',
        label: '请选择'
      }, {
        typeId: 'userName',
        label: '用户名'
      }, {
        typeId: 'workNumber',
        label: '工号'
      }, {
        typeId: 'belongDept',
        label: '所属部门'
      }],
      statusOptions: [{
        enabledId: '',
        label: '请选择'
      }, {
        enabledId: '0',
        label: '停用'
      }, {
        enabledId: '1',
        label: '启用'
      }],
      value: '',
      tempObj: {

      },
      pageObject: {
        pageSize: 10,
        pageNum: 1,
        startTime: '',
        endTime: ''
      },
      pageTotal: 0,
      hackReset: true
    }
  },
  beforeDestroy () {
    // this.$root.Bus.$off('pageUpdate', this.getList);
  },
  mounted () {
    this.getList()
    this.$root.Bus.$on('pageUpdate', this.getList)
  },
  methods: {
    query () {
      this.pageObject.pageNum = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.pageObject.pageNum = val
      this.getList()
    },
    hack () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    getList () {
      const data = Object.assign({}, this.pageObject)
      if (this.searchKey && this.searchValue) {
        data[this.searchKey] = this.searchValue
      }
      userList(data).then(res => {
        if (!res) return
        if (res.code === 0) {
          this.tableData = res.data.list
          this.pageTotal = res.data.total
          this.hack()
        }
      })
    },
    add () {
      this.$router.push('/system/addEditUser')
    },
    edit (index, row) {
      this.$router.push({ name: '/system/addEditUser', params: { id: row.id } })
    },
    handleSizeChange (val) {
      this.pageObject.pageSize = val
      this.pageObject.pageNum = 1
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-box{
    margin:20px 0 15px;
    width: 100%;
    border: 1px solid rgba(228, 228, 228, 1);
    padding:30px 0px;
    background-color: #fff;
  }
  .el-checkbox{
    margin-bottom: 0;
  }
</style>
