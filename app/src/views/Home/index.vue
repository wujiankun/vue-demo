<template>
  <div class="main-content">欢迎光临！</div>
</template>
<script>
export default {
  mounted () {
    if (localStorage.getItem('firstLogin') === '1') {
      this.$root.Bus.$emit('dialogOpenListener', { currentView: 'resetPassword', dialogFormVisible: true, title: '登陆成功！请重置密码！', isClose: false })
    }
  }
}
</script>
