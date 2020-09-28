<!--
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-27 14:39:53
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\views\pages\swagger\mdShow.vue
-->
<template>
  <div>
    <Markdown v-model="content"  isPreview :height="height" />
    <!-- <MarkdownPreview v-model="content" /> -->
  </div>
</template>

<script>
import Markdown from 'vue-meditor'
export default {
  components: {Markdown},
  props: {
    mdContent: {type: String, required: false, default: ''}
  },
  data() {
    return {
      content: null,
      height:window.innerHeight - 40
    }
  },
  created() {
    this.content = this.mdContent
  },
  watch: {
    'mdContent': function(newVal) {
      this.content = newVal
    }
  }
}
</script>

<style lang="scss" scoped>

</style>