<template>
  <el-menu
    :default-openeds="openeds"
    :default-active="$route.path"
    :unique-opened=true router
    class="el-menu-vertical-demo"
    background-color="#ffffff"
    text-color="#95a0aa"
    active-text-color="#6392fe">
    <template v-for="(item,index) in menuList">
      <el-submenu :index="index+''" v-if="item.childList" :key="index + 1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="(child,idx) in item.childList" :index="child.href" :key="idx + 1">{{child.name}}
        </el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.href" v-if="!item.childList || !item.childList.length" :key="index + 1">
        <i class="el-icon-menu"></i>
        <span slot="title">
        <el-badge :value="item.count">
          {{item.name}}
        </el-badge>
      </span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { menuList } from '@/services/LoginService'

export default {
  data () {
    return {
      openeds: [],
      menuList: []
    }
  },
  mounted () {
    this.getAsideData()
  },
  methods: {
    getAsideData () {
      menuList().then(res => {
        if (!res) return
        if (res.code === 0) {
          this.menuList = res.data.childList
        }
      })
    }
  }
}
</script>
<style lang="scss">
  $blue-color: #6392fe;
  .el-aside {
    width: 260px !important;
    position: fixed;
    top: 60px;
    bottom: 0;

    & > .el-menu {
      height: 100%;
      background-color: #ffffff !important;
      border-right: none;
    }
  }

  .el-submenu {
    width: 100%;

    .el-menu-item {
      text-align: left;
      padding-left: 60px !important;
    }
  }

  .el-submenu__title, .el-menu-item {
    text-align: left;
    padding-left: 30px !important;
  }

  .is-active {
    background-color: #eeeeee !important;
  }

  .el-menu-item.is-active {
    color: #95a0aa;
  }

  .el-submenu__icon-arrow {
    font-size: 16px !important;
    font-weight: 600;
  }

  .el-submenu__title:hover, .el-menu-item:hover {
    background-color: #eeeeee !important;
  }

  .el-badge__content.is-fixed {
    top: 8px;
  }
</style>
