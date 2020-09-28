<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="name in tabs" :label="tabName(name)" :name="name" :key="name">
        <!-- <div class="swagger-title">{{reqMethod.summary}}</div> -->
        <el-divider>请 求</el-divider>
        <el-card shadow="hover" :body-style="{padding:'40px'}">
          <!-- <div slot="header">请求</div> -->
          <tc-form label-width="150px" size="small">
           <el-row>              
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="20">
                  <tc-form-item label="请求地址">
                    <!-- <tc-input v-model="methodForm.requestPath" readonly /> -->
                    <el-input v-model="methodForm.requestPath" readonly>
                      <i slot="suffix" 
                        class="el-input__icon el-icon-document-copy"
                        v-clipboard:copy="methodForm.requestPath"
                        v-clipboard:success="onCopySuccess" 
                        v-clipboard:error="onCopyError"
                      ></i>
                    </el-input>    
                  </tc-form-item>
                </el-col>
                <el-col :span="2">
                  <el-tag
                    sizi="mini"
                    :type="activeName|handleMethodsType"
                    effect="dark">
                    {{ activeName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <tc-form-item label="响应Content-Type">
                <tc-select v-model="methodForm.contentType" :providers="producesProviders" />
              </tc-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <!-- <el-row>
                <el-col :span="12">
                  <div style="margin-bottom:10px;margin-top:10px;">
                    <tc-button v-if="!isPostJson" type="primary" @click="addParam" size="small">新增</tc-button>
                    <tc-button type="primary" @click="selMdShow" size="small">查看md</tc-button>
                  </div>
                </el-col>
              </el-row> -->
              <tc-edit-table editmode="multi" :data="parameters" :columns="paramColumn">
                <template slot="editable" slot-scope="{ value, columnName, rowData, column, scope }"> 
                  <div v-if="columnName === 'value'">
                    <div v-if="rowData.type === 'json'">
                      <!-- 取消格式化编辑功能 -->
                      <!-- <tc-button type="primary" size="mini" @click="formatJson(value)">格式化编辑</tc-button> -->
                      <tc-input :rows="8" v-model="scope.row[columnName]" type="textarea" class="input-value" clearable size="mini"></tc-input>
                    </div>
                    <tc-input v-else v-model="scope.row[columnName]" type="text" clearable size="mini"></tc-input>
                  </div>
                  <div v-else-if="columnName === 'name'">
                    <tc-input v-if="rowData['category'] === 'custom'" v-model="scope.row[columnName]" type="text" clearable size="mini"></tc-input>
                    <span v-else>{{value}}</span>
                  </div>
                </template>
                <template slot-scope="{ value, columnName, rowData, column, scope }"> 
                  <div v-if="columnName === 'description'">
                    <span v-if="rowData.type === 'json'">
                      <!-- 原是通过弹窗查看描述，现在直接查看描述并复制 -->
                      <!-- <span>
                        <tc-button  
                          type="primary" 
                          size="mini" 
                          @click="openReqJsonView(rowData)"
                        >{{value}}</tc-button>
                        <tc-button  
                          type="primary" 
                          size="mini" 
                          v-clipboard:copy="JSON.stringify(rowData.schemaDescription)"
                          v-clipboard:success="onCopySuccess" 
                          v-clipboard:error="onCopyError"
                        >复制</tc-button>
                        <pre class="pre-desc">{{rowData.schemaDescription}}</pre>
                      </span> -->
                      <json-viewer 
                        class="pre-desc"
                        :value="rowData.schemaDescription"
                        :expand-depth=5
                        copyable
                      ></json-viewer>
                    </span>
                    <span v-else>
                      {{value}}
                    </span>
                  </div>
                </template>
              </tc-edit-table>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;text-align:center;">
            <el-col>
              <tc-button 
                v-if="!isPostJson" 
                type="primary" 
                @click="addParam" 
                size="small"
              >新增</tc-button>
              <tc-button type="primary" size="small" @click="sendRequest">试一试</tc-button>
              <tc-button type="primary" size="small" @click="fillData">随机数据</tc-button>
              <tc-button type="primary" size="small" @click="resetData">重置</tc-button>
              <tc-button 
                v-show="!mdShowForm.show" 
                type="primary" 
                @click="selMdShow" 
                size="small"
              >查看md</tc-button>
              <tc-button 
                v-show="mdShowForm.show" 
                type="warning" 
                @click="selMdShow" 
                size="small"
              >关闭md</tc-button>
            </el-col>
          </el-row>
        </tc-form>
        </el-card>
        <el-divider >响应</el-divider>
        <!-- <tc-block> -->
          <el-row class="time-block">
            <el-col :span="3">
              请求时间
            </el-col>
            <el-col :span="5">
              <el-tag type="success" v-show="responseTimeInfo.requestTime"
              >{{responseTimeInfo.requestTime}}</el-tag>
              <!-- <span>{{responseTimeInfo.requestTime}}</span> -->
            </el-col>
            <el-col :span="3">
              响应时间
            </el-col>
            <el-col :span="5">
              <el-tag type="success" v-show="responseTimeInfo.responseTime"
              >{{responseTimeInfo.responseTime}}</el-tag>
              <!-- <span>{{responseTimeInfo.responseTime}}</span> -->
            </el-col>
            <el-col :span="3">
              相差毫秒
            </el-col>
            <el-col :span="5" >
              <el-tag type="danger" v-show="responseTimeInfo.diffTime"
              >{{responseTimeInfo.diffTime}}</el-tag>
              <!-- <span>{{responseTimeInfo.diffTime}}</span> -->
            </el-col>
          </el-row>
        <!-- </tc-block> -->
        <el-tabs v-model="respActiveName">
          <el-tab-pane label="响应数据" name="resp">
              <json-viewer v-if="responseResult"
                :value="responseResult"
                :expand-depth=5
                copyable
                boxed
                sort></json-viewer>
          </el-tab-pane>
          <el-tab-pane label="示例描述" name="respDesc">
            <json-viewer v-if="respJson"
                :value="respJson"
                :expand-depth=5
                copyable
                boxed
                sort></json-viewer>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <tc-dialog 
      loading title="编辑json" 
      :visible.sync="jsonEditForm.show" 
      width="800px" 
      height="600px"
      style="font-size:25px;" 
    >
      <jsonedit :json="jsonEditForm.json" @save-json="saveJson"/>
    </tc-dialog>
    <!-- <tc-dialog
      loading title="查看md" 
      :visible.sync="mdShowForm.show" 
      width="500px" 
      height="600px"
    >
      <md-show :mdContent="mdShowForm.content" />
    </tc-dialog> -->
    <md-show class="fixed-md-show" v-show="mdShowForm.show" :mdContent="mdShowForm.content" />
     <tc-dialog 
      loading title="查看请求" 
      :visible.sync="reqJsonView.show" 
      width="800px" 
      height="600px"
    >
      <req-json-view :json="reqJsonView.json" />
    </tc-dialog>
  </div>
</template>

<script>
import queryParams from "@/utils/queryParams.js";
import { isEmpty } from 'tennetcn-ui/lib/utils'
import { mapGetters } from 'vuex'
import store from '@/store'
import mock from 'mockjs'
import swaggerService from '@/api/swagger'
import swaggerHelper from './assist/swagger.helper'
import buildmd from './assist/buildmd'
import jsonViewer from 'vue-json-viewer'

const path = require('path')
const files = require.context('./', false, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  modules[name] = files(key).default || files(key)
})
modules.jsonViewer = jsonViewer

export default {
  mixins: [swaggerHelper, buildmd],

  // components: { jsonViewer, jsonedit, mdShow, reqJsonView,paramsTable },
  components:modules,
  data() {
    return {
      respActiveName: 'resp',
      jsonEditForm: {
        show: false,
        json: null
      },
      mdShowForm: {
        show: false,
        content: null
      },
      reqJsonView: {
        show: false,
        json: null
      },
      isPostJson: false,
      activeName: '',
      respJson: {}
    }
  },
  mounted() {

  },
  filters:{
    handleMethodsType(method){
      let type = '';
      switch (method){
        case 'get': type = "primary";
        break;
        case 'post':type = "success";
          break;
        case 'put':type = "warning";
          break;
        case 'delete':type = "danger";
          break;
        default:type = "info";
          break;
      }
      return type;
    }
  },
  watch: {
    '$route.query.path': function(newVal) {
      this.mdShowForm.show = false;
      this.methodForm.requestPath = newVal
      this.responseResult = {}
      this.customParam = []
      this.respActiveName = 'resp'
      this.resetResponseTime()
    },
    'activeName': function(newVal) {
      this.methodForm.requestMethod = newVal
      this.respActiveName = 'resp'
      this.resetResponseTime()
    },
    'respActiveName': function(newVal) {
      this.respJson = {}
      if (newVal === 'respDesc') {
        this.respJson = this.calcComplexParamResp()
      }
    }
  },
  computed: {
    ...mapGetters([
      'menus',
      'swaggerInfo',
      'theme',
      'headers'
    ])
  },
  methods: {
    onCopySuccess(){
      this.$message.success("内容已复制到剪切板！")
    },
    onCopyError(){
      this.$message.error("复制失败！请手动操作！")
    },
    openReqJsonView(rowData) {
      this.reqJsonView.show = true
      this.reqJsonView.json = rowData.schemaDescription
    },
    selMdShow() {
      // this.mdShowForm.show = true
      this.mdShowForm.show = !this.mdShowForm.show
      this.mdShowForm.content = this.buildMd()
    },
    resetResponseTime() {
      this.responseTimeInfo.requestTime = null
      this.responseTimeInfo.responseTime = null
      this.responseTimeInfo.diffTime = null
    },
    formatJson(json) {
      this.jsonEditForm.json = json
      this.jsonEditForm.show = true
    },
    saveJson(json) {
      
      this.$set(this.parameters[0], 'value', JSON.stringify(json))
      this.jsonEditForm.show = false
    },
    addParam() {
      this.customParam.push(Object.assign({}, this.customParamItem))
    },
    sendRequest() {
      this.respActiveName = 'resp'
      const basePath = this.swaggerInfo.basePath === '/' ? '' : this.swaggerInfo.basePath
      let requestUrl = this.methodForm.requestProtocol + this.swaggerInfo.host + basePath + this.methodForm.requestPath
      var method = this.methodForm.requestMethod
      var requestData = {}
      var querys = {}
      var selfheaders = []
      if (this.isPostJson) {
        method = 'postJson'
        this.parameters.forEach(item => {
          if(item.type=="json"){
            requestData = JSON.parse(item.value)
          }
          else if(item.in=='header'){
            let header = {
              use: true, 
              headerName: item.name, 
              headerInfo: item.value === undefined ? null : item.value
            }
            selfheaders.push(header)
          }
          else{
            querys[item.name] = item.value === undefined ? null : item.value
          }
        })
      } else {
        this.parameters.forEach(item => {
          if(item.open &&item.in=='header'){
            let header = {
              use: true, 
              headerName: item.name, 
              headerInfo: item.value === undefined ? null : item.value
            }
            selfheaders.push(header)
          }
          else if(item.open && !isEmpty(item.name)) {
            requestData[item.name] = item.value === undefined ? null : item.value
          }
        })
      }
      const reqData = new Date()
      this.responseTimeInfo.requestTime = this.$moment.formatDateTime(reqData)
      requestUrl = this.urlFormat(requestUrl, requestData)
      if(method==='postJson'&&Object.keys(querys).length>0){
          requestUrl += queryParams(querys);
      }
      swaggerService.sendRequest(method, requestUrl, requestData,selfheaders).then(result => {
        const respData = new Date()
        this.responseTimeInfo.responseTime = this.$moment.formatDateTime(respData)
        this.responseTimeInfo.diffTime = respData.getTime() - reqData.getTime()
        this.responseResult = result.data
      })
    },
    urlFormat(url, params) {
      if (!new RegExp('\\{(.*?)\\}').test(url)) {
        return url
      }
      const pathVars = url.match(new RegExp('\\{(.*?)\\}', 'g'))
      for (var key of pathVars) {
        url = url.replace(new RegExp(key, 'g'), params[key.match(/{(.*?)}/)[1]])
      }
      return url
    },
    fillData() {
      const random = mock.Random
      this.parameters.forEach(item => {    
        if (isEmpty(item.name)) {
          return true
        }
        if (item.type === 'string') {
          this.$set(item, 'value', random.word(1, 10))
        } else if (item.type === 'integer' || item.type === 'int') {
          this.$set(item, 'value', random.integer(1, 99))
        }
      })
    },
    resetData() {
      this.customParam = []
      this.parameters.forEach(item => {
        this.$set(item, 'value', item.defaultValue)
      })
      this.responseResult = {}
      this.resetResponseTime()
    }
  }
}
</script>

<style lang="scss" scoped>
.jv-node {
  span.jv-toggle.open{
    transform: rotate(90deg) !important;
  }
}
.jv-container .jv-code {
  overflow: auto;
}
.time-block{
  width: 100%;
  margin: 20px auto;
  padding: 15px;
  background-color: #C6E2FF;
}
.input-value{
  margin-top:5px;
  font-size:16px;
}
.pre-desc{
  text-align-last: left;
  border: none;
}
.fixed-md-show{
  width: 500px;
  position: fixed;
  top: 10px;
  bottom: 30px;
  right: 0;
  z-index: 5;
  box-shadow: -2px 4px 2px 1px #ddd;
}
</style>