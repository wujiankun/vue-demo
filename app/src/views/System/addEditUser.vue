<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/system/user' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="userForm" :rules="rules" ref="userForm" class="user-modal">
      <el-form-item label="所属部门：" :label-width="formLabelWidth" prop="belongDept">
        <el-input v-model="userForm.belongDept" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="工号：" :label-width="formLabelWidth" prop="workNumber">
        <el-input v-model="userForm.workNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth" prop="userName">
        <el-input v-model="userForm.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
        <el-input v-model="userForm.password" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
        <el-input v-model="userForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" :label-width="formLabelWidth" prop="mobile">
        <el-input v-model="userForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户状态：" :label-width="formLabelWidth" prop="enabled">
        <el-radio v-model="userForm.enabled" label="1">启用</el-radio>
        <el-radio v-model="userForm.enabled" label="0">停用</el-radio>
      </el-form-item>
      <el-form-item label="用户角色：" :label-width="formLabelWidth" prop="roleId" class="sel-width">
        <el-select v-model="userForm.roleId" placeholder="请选择">
          <el-option
            v-for="item in allRoles"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit('userForm')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { submitUser, getRoleList, editUser } from '@/services/LoginService'
import { checkPhone, lengthVal, workLengthVal } from '@/utils/validate.js'

export default {
  data () {
    return {
      userForm: {
        belongDept: '',
        workNumber: '',
        userName: '',
        password: '',
        email: '',
        mobile: '',
        enabled: '',
        id: '',
        roleId: ''

      },
      allRoles: [],
      rules: {
        belongDept: [
          { validator: lengthVal, trigger: 'blur' }
        ],
        workNumber: [
          { validator: workLengthVal, trigger: 'blur' }
        ],
        userName: [
          { validator: lengthVal, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ]
      },
      formLabelWidth: '120px',
      editId: this.$route.params.id
    }
  },
  mounted () {
    if (this.editId) {
      this.editInit()
    } else {
      this.addInit()
    }
  },
  methods: {
    addInit () {
      getRoleList().then(res => {
        if (!res) return
        if (res.code === 0) {
          this.allRoles = res.data.allRoles
        }
      })
    },
    editInit () {
      editUser({ id: this.editId }).then(res => {
        if (!res) return
        if (res.code === 0) {
          this.allRoles = res.data.allRoles
          this.userForm.belongDept = res.data.adminUser.belongDept
          this.userForm.workNumber = res.data.adminUser.workNumber
          this.userForm.userName = res.data.adminUser.userName
          this.userForm.userName = res.data.adminUser.userName
          this.userForm.email = res.data.adminUser.email
          this.userForm.mobile = res.data.adminUser.mobile
          this.userForm.enabled = res.data.adminUser.enabled + ''
          this.userForm.roleId = parseInt(res.data.adminUser.roleId)
          this.userForm.id = parseInt(res.data.adminUser.id)
        }
      })
    },
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          submitUser(this.userForm).then(res => {
            if (!res) return
            if (res.code === 0) {
              this.$message.success('提交成功！')
              //  this.$root.Bus.$emit('pageUpdate');
              this.$router.back(-1)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    cancel () {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped>
  .user-modal {
    width: 50%;
    margin-top: 40px;
  }

  .sel-width .el-select {
    width: 100%;
  }

  .el-main .dialog-footer {
    text-align: left;
    padding-left: 115px;
  }
</style>
