<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/personalinfo' }">个人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-position="right" class="per-modal" v-model="perForm" label-width="120px">
      <div class="per-main">
        <el-form-item class="per-item" label="所属部门：">{{perForm.belongDept}}</el-form-item>
      </div>
      <div class="per-main">
        <el-form-item class="per-item" label="工号：">{{perForm.workNumber}}</el-form-item>
      </div>
      <div class="per-main">
        <el-form-item class="per-item" label="用户名：">{{perForm.userName}}</el-form-item>
      </div>
      <div class="per-main">
        <el-form-item class="per-item" label="邮箱：">{{perForm.email}}</el-form-item>
      </div>
      <div class="per-main">
        <el-form-item class="per-item" label="手机号码：">{{perForm.mobile}}</el-form-item>
      </div>
      <div class="per-main">
        <el-form-item class="per-item" label="上次登录时间：">{{perForm.lastLoginTime | TimeFilter}}</el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { information } from '@/services/LoginService'

export default {
  data () {
    return {
      perForm: {
        belongDept: '',
        workNumber: '',
        userName: '',
        email: '',
        mobile: '',
        lastLoginTime: ''
      }
    }
  },
  mounted () {
    this.getInformation()
  },
  methods: {
    getInformation () {
      information().then(res => {
        if (!res) return
        if (res.code === 0) {
          this.perForm = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
  .per-modal {
    padding-top: 40px;
  }

  .per-main {
    padding-left: 15%;
    border-bottom: 1px solid #cccccc;
    line-height: 40px;
  }

  .per-item {
    margin-bottom: 0;
  }
</style>
