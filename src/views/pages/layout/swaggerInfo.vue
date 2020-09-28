<!--
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 10:59:31
 * @Description  : 样式修改
 * @FilePath     : \think-swagger-ui-vuele-master\src\views\pages\layout\swaggerInfo.vue
-->
<template>
  <div class="outer-box">
    <tc-block title="访问地址">
      <div class="swagger-path-container">
        {{swaggerPath}}
      </div>
    </tc-block>
    <tc-block title="swagger信息" style="margin-top:10px;">
      <el-row>
        <el-col :span="12">
          <span class="left-field">标题</span>{{swaggerInfo.info.title}}
        </el-col>
        <el-col :span="12">
          <span class="left-field">版本</span>{{swaggerInfo.info.version}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="left-field">描述</span>{{swaggerInfo.info.description}}
        </el-col>
      </el-row>
    </tc-block>
    <tc-block title="作者信息" style="margin-top:10px;">
      <el-row>
        <el-col :span="12">
          <span class="left-field">作者</span>{{swaggerInfo.info.contact.name}}
        </el-col>
        <el-col :span="12">
          <span class="left-field">email</span>{{swaggerInfo.info.contact.email}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="left-field">主页</span><a target="_blank" :href="contactUrl">{{swaggerInfo.info.contact.url}}</a>
        </el-col>
      </el-row>
    </tc-block>
    <div class="box-link">
      本项目基于 
      <el-link 
        href="https://github.com/chfree/think-swagger-ui-vuele" 
        target="_blank" 
        type="primary"
      >think-swagger-ui-vuele</el-link>
      优化，项目地址
      <el-link type="primary">think-swagger-ui-vuele</el-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'swaggerPath',
      'swaggerInfo'
    ]),
    contactUrl() {
      console.log(this.swaggerInfo.info, 'this.swaggerInfo.info')
      const url = this.swaggerInfo.info.contact.url || ''
      return url.indexOf('http') === 0 ? url : 'http://' + url
    }
  }
}
</script>

<style lang="scss" scoped>
.outer-box{
  padding: 10px;
  line-height: 30px;
}
.swagger-path-container{
  font-size: 15px;
  font-weight: 600;
}
.left-field{
  font-size:14px;
  font-weight: 600;
  margin-right: 20px;
}
.box-link{
  text-align: center;
  margin-top: 15px;
}
</style>