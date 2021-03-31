<template>
  <div>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside>
          <Aside/>
        </el-aside>
        <el-main>
          <router-view></router-view>
          <Dialog/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Dialog from '@/components/Dialog'
export default {
  name: 'Main',
  components: {
    Header,
    Aside,
    Dialog
  }
}
//
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }
  .el-main{
    margin-top: 60px;
    margin-left: 260px;
    text-align: left;
  }
  .el-table{
    margin: 15px 0;
  }
  .el-pagination{
    text-align: right;
  }
</style>
