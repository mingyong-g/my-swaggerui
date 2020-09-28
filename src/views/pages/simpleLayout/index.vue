<!--
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 14:12:54
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\views\pages\simpleLayout\index.vue
-->
<template>
  <div>
    <div class="top-main">
      <topbar />
      <left-menu class="sidebar-container" />
      <div class="main-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '../layout/topbar'
import appMain from './app-main'
import leftMenu from '../layout/sidebar'
export default {
  components: {topbar, appMain, leftMenu}
}
</script>

<style lang="scss" scoped>
.top-main{
  width: 1250px;
  margin: 0 auto;
  .sidebar-container{
    padding-right: 50px;
    left: auto !important;
  }
  .el-submenu__title{
    background-color: #fff !important;
    color: #333 !important;
  }
}
</style>