/*
 * @Author       : mingyong.g
 * @Date         : 2020-10-06 14:53:54
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-10-06 15:58:32
 * @Description  : 生成API导出
 * @FilePath     : \my-swaggerui\src\views\pages\swagger\assist\apiexport.js
 */
import { isEmptyObject } from 'tennetcn-ui/lib/utils'
export default {
  data() {
    return {
    }
  },
  methods: {
    apiexport: function() {
      let arrMds = []
      const basePath = this.swaggerInfo.basePath === '/' ? '' : this.swaggerInfo.basePath
      console.log('this.swaggerInfo: ', this.swaggerInfo);
      // const requestUrl = this.methodForm.requestProtocol + this.swaggerInfo.host + basePath
      const reqMethod = this.menuInfo.reqMethod[this.activeName] || {}
      const apiUrl = basePath + "/" + this.menuInfo.path
      const apiName = apiUrl.split("/").pop()
      console.log('this.parameters: ', this.parameters);
      console.log('this.menuInfo: ', this.menuInfo);
      arrMds.push("/*********************************")
      arrMds.push(" # ")
      arrMds.push(' # 描述: ' + reqMethod.summary)
      arrMds.push(" # ")
      arrMds.push(' # 请求方式: ' + this.activeName)
      arrMds.push(' # 响应Content-Type: ' + this.methodForm.contentType)
      arrMds.push(' # 请求参数: ')
      this.parameters.forEach(item => {
        if(item.type=="json"){
          arrMds.push(JSON.stringify(item.schemaDescription, null, '\t'))
        }
        else{
          let type = item.type||item.schema.type
          console.log('type: ', type);
          arrMds.push(' # ' + item.name + ' | ' + (item.description || '') + ' | ' + `${item.required?"必填":"非必填"}` + ' | ' + item.in + ' | ' +  type)
        }
      })
      arrMds.push(" # ")
      arrMds.push(" ********************************/")
      arrMds.push(`export async function ${apiName}(params){ `)
      arrMds.push(`   let url = "${apiUrl}"`)
      arrMds.push(`   let method = "${this.activeName}"`)
      arrMds.push(`   return await myRequest( { url,method,params } )`)
      arrMds.push(`}`)
      return arrMds.join('\r\n')
    }
  }
}
