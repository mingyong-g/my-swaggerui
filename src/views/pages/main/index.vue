<!--
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 11:29:11
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\views\pages\main\index.vue
-->
<template>
  <div class="outer-box">
    <img src="@/assets/mylogo.jpg" alt="">
    <br>
    <el-link type="danger">
      <h1 >MY_SwaggerUI</h1>
    </el-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      'menus'
    ])
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>
.outer-box{
  text-align: center;
  margin-top: 25vh;
}
</style>