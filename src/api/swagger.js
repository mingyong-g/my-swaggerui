/*
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 10:41:30
 * @Description  : 支持实例自定义响应头
 * @FilePath     : \think-swagger-ui-vuele-master\src\api\swagger.js
 */
import request from '@/components/util/http/request'
import store from '@/store'
import { resolveMenu } from '@/router/menu.load'

function reqSwagger(url) {
  return new Promise(function(resolve, reject) {
    request.get(url, {}, response => {
      const result = response.data
      resolve(result)
    })
  })
}

function reqAndResolveSwagger(url) {
  return new Promise(function(resolve, reject) {
    reqSwagger(url).then(result => {
      if (result.swagger !== undefined) {
        window.sessionStorage.swaggerPath = url
        store.commit('swaggerPath', url)
        store.commit('swaggerInfo', result)

        const menus = resolveMenu()
        result['menus'] = menus
      }
      resolve(result)
    })
  })
}

function resolveSwagger(swaggerJson) {
  store.commit('swaggerPath', null)
  window.sessionStorage.swaggerPath = null
  const result = JSON.parse(swaggerJson)
  return new Promise(function(resolve, reject) {
    if (result.swagger !== undefined) {
      store.commit('swaggerInfo', result)

      const menus = resolveMenu()
      result['menus'] = menus
    }
    resolve(result)
  })
}

function sendRequest(method, url, requestData,selfheaders) {
  return new Promise(function(resolve, reject) {
    request[method](url, requestData, response => {
      resolve(response)
    },selfheaders)
  })
}

const swaggerService = {
  reqSwagger,
  resolveSwagger,
  reqAndResolveSwagger,
  sendRequest
}

export default swaggerService
