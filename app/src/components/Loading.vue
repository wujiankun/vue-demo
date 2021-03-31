<template>
  <div v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"></div>

</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  beforeDestroy () {
    this.$root.Bus.$off('openLoading', this.openLoading)
    this.$root.Bus.$off('closeLoading', this.closeLoading)
  },
  mounted () {
    this.$root.Bus.$on('openLoading', this.openLoading)
    this.$root.Bus.$on('closeLoading', this.closeLoading)
  },
  methods: {
    openLoading () {
      this.loading = true
    },
    closeLoading () {
      this.loading = false
    }
  }
}
</script>

<style>
</style>
