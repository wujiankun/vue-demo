<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    :show-close="isClose"
    :close-on-click-modal="isClose"
    :close-on-press-escape="isClose"
    :center="isCenter"
  >
    <component v-bind:is="currentView" :model="form" v-if="isShow">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
  </el-dialog>
</template>
<script>
import addEditUser from '@/views/System/addEditUser'
import addEditRole from '@/views/System/addEditRole'
import resetPassword from '@/views/Person/resetPassword'
export default {
  data () {
    return {
      dialogFormVisible: false,
      currentView: '',
      title: '',
      isClose: true,
      form: { },
      isCenter: false
    }
  },
  // 在组件销毁时解除事件绑定
  beforeDestroy () {
    this.$root.Bus.$off('dialogOpenListener')
    this.$root.Bus.$off('dialogCloseListener', this.dialogClose)
  },
  // 在 created 钩子函数中监听事件
  created () {
    this.$root.Bus.$on('dialogOpenListener', value => {
      this.dialogOpen(value)
    })
    this.$root.Bus.$on('dialogCloseListener', next => {
      this.dialogClose()
      next && next() // 给关闭dialog添加回掉函数
    })
  },
  methods: {
    dialogOpen (data) {
      this.dialogFormVisible = data.dialogFormVisible
      this.currentView = data.currentView
      this.title = data.title
      this.form = data.data
      this.isClose = data.isClose
      this.isCenter = data.isCenter
    },
    dialogClose () {
      this.dialogFormVisible = false
    }
  },
  computed: {
    isShow: function () {
      return this.dialogFormVisible
    }
  },
  components: {
    addEditUser,
    addEditRole,
    resetPassword
  }
}
</script>
<style lang="scss">
  .el-dialog__wrapper{
    padding-left: 260px;
  }
  .dialog-footer{
    text-align: right;
  }
  .el-dialog{
    .el-form{
      width: 80%;
    }
    .el-select,.el-input{
      width: 100%;
    }
  }
</style>
