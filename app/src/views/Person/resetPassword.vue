<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/personalinfo' }">个人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="pass-modal" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
      <el-form-item label="原密码：" prop="oldPassword">
        <el-input class="input" type="password" v-model="ruleForm2.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="password">
        <el-input class="input" type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        <span style="color:#6392fe">密码至少6位,包含数字和大小写字母</span>
      </el-form-item>

      <el-form-item label="确认新密码：" prop="confirmPassword">
        <el-input class="input" type="password" v-model="ruleForm2.confirmPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button type="primary" @click="canclePass">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%" :show-close='false'>
      <span style="text-align: center;">修改密码成功，请重新登录</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDel">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { resetPassword } from '@/services/LoginService'

export default {
  name: 'Login',
  data () {
    return {
      ruleForm2: {
        password: '',
        confirmPassword: '',
        oldPassword: ''

      },
      rules2: {
        oldPassword: [
          { validator: this.validateoldPass, trigger: 'blur' }
        ],
        password: [
          { validator: this.validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: this.validatePass2, trigger: 'blur' }
        ]
      },
      compareData: null,
      dialogVisible: false
    }
  },
  methods: {
    validateoldPass (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    },
    validatePass (rule, value, callback) {
      const rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      if (!value || !rgx.test(value)) {
        callback(new Error('请按规则输入密码'))
      } else if (this.ruleForm2.oldPassword && (this.ruleForm2.oldPassword === value)) {
        callback(new Error('请勿与原密码一致'))
      } else {
        if (this.ruleForm2.confirmPassword !== '') {
          this.$refs.ruleForm2.validateField('confirmPassword')
        }
        callback()
      }
    },
    validatePass2 (rule, value, callback) {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPassword(this.ruleForm2).then(res => {
            if (res.code === 0) {
              this.$message.success('修改成功')
              this.$router.push('/')
              localStorage.removeItem('Authorization')
              if (localStorage.getItem('sitePassword')) {
                localStorage.removeItem('Authorization')
              }
            }
          })
        }
      })
    },
    confirmDel () {
      this.$router.push('/')
    },
    canclePass () {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped>
  .input {
    width: 60%;
  }
  .pass-modal {
    margin-top: 40px;
  }
</style>
