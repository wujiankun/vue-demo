<template>
  <div>
    <el-form :model="roleForm" :rules="rules" ref="roleForm" style="width:50%">
      <el-form-item label="角色中文名称" label-width="160px" prop="name">
        <el-input v-model="roleForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色英文名称" label-width="160px" prop="nameCode">
        <el-input v-model="roleForm.nameCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="160px" prop="describe">
        <el-input v-model="roleForm.describe" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="材料信息是否可修改" label-width="160px" prop="ifMaterialsChange">
        <el-radio v-model="roleForm.BtnStuffAndRevise" :label="true">是</el-radio>
        <el-radio v-model="roleForm.BtnStuffAndRevise" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="按钮权限设置" label-width="160px">
        <!--<el-checkbox v-model="roleForm.ifMaterialsCheck">材料复核通过</el-checkbox>-->
        <!--<el-checkbox v-model="roleForm.ifMaterialsReject">材料复核未通过</el-checkbox>-->
        <!--<el-checkbox v-model="roleForm.ifFireCase">案件释放</el-checkbox>-->
        <!--<el-checkbox v-model="roleForm.ifArbitraion">申请仲裁审批</el-checkbox>-->
        <!--<el-checkbox v-model="roleForm.ifExport">导出</el-checkbox>-->
        <el-checkbox v-for="item in btnList" :key="item.code" v-model="roleForm[item.code]">{{item.name}}</el-checkbox>
      </el-form-item>
      <el-form-item label="页面权限设置" label-width="160px">
        <el-tree
          ref="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1,2]"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit('roleForm')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { addRoleList, submitRole, editRole } from '@/services/LoginService'
// import { roleButtonPerms } from '@/services/LoginService';
import { lengthVal } from '@/utils/validate.js'

export default {
  data () {
    return {
      roleForm: {
        id: '',
        name: '',
        nameCode: '',
        describe: '',
        menuIds: [],
        ifLookMobile: '',
        BtnStuffAndRevise: '',
        BtnCheckPass: '',
        BtnCheckReject: '',
        BtnCheckStuffRelease: '',
        BtnCheckToApprove: '',
        BtnCheckExport: ''
      },
      rules: {
        name: [
          { validator: lengthVal, trigger: 'blur' }
        ],
        nameCode: [
          { validator: lengthVal, trigger: 'blur' }
        ],
        describe: [
          { validator: lengthVal, trigger: 'blur' }
        ],
        BtnStuffAndRevise: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      menuList: [],
      btnList: [],
      defaultProps: {
        children: 'childList',
        label: 'name'
      },
      editId: this.$route.params.id
    }
  },
  mounted () {
    // this.roleButtonPerms();
    if (this.editId) {
      this.editRole()
    } else {
      this.addRoleList()
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitRole()
        }
      })
    },
    submitRole () {
      const data = this.getSubmitData()
      submitRole(data).then(res => {
        if (!res) return
        if (res.code === 0) {
          this.$message.success('提交成功！')
          this.$router.back(-1)
        }
      })
    },
    // roleButtonPerms () {
    //   roleButtonPerms().then(res => {
    //     if (res.code === 0) {
    //       this.btnList = res.data;
    //     }
    //   });
    // },
    addRoleList () {
      addRoleList().then(res => {
        if (res.code === 0) {
          this.menuList = res.data.menu.childList
        }
      })
    },
    editRole () {
      editRole({ id: this.editId }).then(res => {
        if (res.code === 0) {
          // 菜单数据
          this.menuList = res.data.menu.childList
          const roleInfo = res.data.role
          // roleForm数据
          for (const i in roleInfo) {
            this.roleForm[i] = roleInfo[i]
          }
          // 菜单menuIds单独处理
          this.roleForm.menuIds = res.data.role.menuIds.split(',')
          // 按钮权限单独处理
          const obj = this.dataInit(res.data.role.buttonPermission)
          for (const key in obj) {
            this.roleForm[key] = (obj[key] === '1')
          }
          this.$refs.tree.setCheckedKeys(this.roleForm.menuIds)
        }
      })
    },
    dataInit (data) {
      const obj = {}
      if (data) {
        const arr = data.split(',')
        arr.forEach(item => {
          const key = item.split(':')[0]
          const value = item.split(':')[1]
          obj[key] = value
        })
      }
      return obj
    },
    getSubmitData () {
      // let str = `BtnStuffAndRevise:${this.roleForm.BtnStuffAndRevise ? '1' : '0'},BtnCheckPass:${this.roleForm.BtnCheckPass ? '1' : '0'},BtnCheckReject:${this.roleForm.BtnCheckReject ? '1' : '0'},BtnCheckStuffRelease:${this.roleForm.BtnCheckStuffRelease ? '1' : '0'},BtnCheckToApprove:${this.roleForm.BtnCheckToApprove ? '1' : '0'},BtnCheckExport:${this.roleForm.BtnCheckExport ? '1' : '0'}`;
      // for (let i in this.btnList) {
      //   str += this.btnList
      // }
      let str = 'BtnStuffAndRevise:' + (this.roleForm.BtnStuffAndRevise ? '1' : '0') + ','
      this.btnList.forEach(item => {
        str += item.code + ':' + (this.roleForm[item.code] ? '1' : '0') + ','
      })
      const data = Object.assign({},
        this.roleForm,
        { menuIds: this.$refs.tree.getCheckedKeys().join(',') },
        { buttonPermission: str }
      )
      return data
    },
    cancel () {
      this.$router.back(-1)
    }
  }
}
</script>
<style>
  .el-tree {
    margin-top: 10px;
  }

  .el-main .dialog-footer {
    text-align: left;
    padding-left: 155px;
  }
</style>
