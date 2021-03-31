<template>
  <div class="inner-header">
    <span class="header-right">
      <span @click="logoutPro" style="cursor:pointer">退出</span>
      <img src="../assets/admin.png" alt="">
      <span>您好，{{name}}</span>
    </span>
  </div>
</template>

<script>
import { logout } from '@/services/LoginService'

export default {
  data () {
    return {
      name: localStorage.getItem('siteName')
    }
  },
  methods: {
    logoutPro () {
      logout().then(res => {
        if (!res) return
        if (res.code === 0) {
          this.$router.push('/')
          localStorage.removeItem('Authorization')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  $blue-color: #6392fe;
  .el-header {
    padding: 0;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 20000;
  }

  .inner-header {
    padding: 0 30px;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    background: $blue-color url('../assets/newlogo.png') no-repeat 30px;
    overflow: hidden;

    .header-right {
      float: right;

      img {
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
      }
    }
  }
</style>
