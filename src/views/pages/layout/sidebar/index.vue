<!--
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 11:33:29
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\views\pages\layout\sidebar\index.vue
-->
<template>
  <el-scrollbar :wrap-class="wrapClass">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
    >
      <sidebar-item v-for="route in menus" :key="route.key" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import sidebarItem from './sidebar-item'
import { mapGetters } from 'vuex'
export default {
  components: { sidebarItem },
  data: () => ({
  }),
  computed: {
    isCollapse() {
      return false
    },
    ...mapGetters(['menus', 'theme']),
    backgroundColor: function() {
      if (this.theme === 'admin') {
        return '#394A60'
        // return '#409EFF'
        // return '#60A3FE'
      } else if (this.theme === 'simple') {
        return '#fff'
      }
    },
    textColor: function() {
      if (this.theme === 'admin') {
        return '#fff'
      } else if (this.theme === 'simple') {
        return '#333'
      }
    },
    activeTextColor: function() {
      if (this.theme === 'admin') {
        // return '#fff'
        return "#1BBC9B"
      } else if (this.theme === 'simple') {
        return '#333'
      }
    },
    wrapClass: function() {
      return 'scrollbar-wrapper ' + this.theme
    }
  }
}
</script>
<style lang="scss">
.admin{
  .router-link-active{
    li.is-active{
      background-color: #283443 !important;
      // background-color: #999 !important;
    }
  }
}

.simple{
  .router-link-active{
    li.is-active{
      background-color: #ecf5ff !important;
    }
  }
}

</style>
