/*
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 10:47:04
 * @Description  : 支持实例自定义响应头
 * @FilePath     : \think-swagger-ui-vuele-master\src\components\util\http\request.js
 */
import axios from 'axios'
import store from '@/store'
import { isEmpty } from 'tennetcn-ui/lib/utils'

axios.defaults.baseURL = ''
axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('token')
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.withCredentials = false

const http = axios.create({
  transformRequest: [function(data) {
    let newData = ''
    for (const k in data) {
      if (data.hasOwnProperty(k) === true && data[k] !== null && data[k] !== undefined) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})
http.interceptors.request.use(setConfig)
const httpJson = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

httpJson.interceptors.request.use(setConfig)

function setConfig(config) {
  
  let selfheaders = config.selfheaders;
  let headers = [].concat(store.state.swagger.headers || [])
  headers = headers.concat(selfheaders||[])
  headers.forEach(item => {
    if (item.use && !isEmpty(item.headerInfo)) {
      config.headers[item.headerName] = item.headerInfo
    }
  })
  return config
}

function apiAxios(method, url, params, success, selfheaders,error) {
  console.log('method: ', method);
  console.log('url: ', url);
  console.log('params: ', params);
  console.log('success: ', success);
  console.log('error: ', error);
  console.log('selfheaders: ', selfheaders);
  execRequest(http({
    selfheaders,
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }), success, error)
}

function apiJsonAxios(method, url, params, success, selfheaders,error) {
  execRequest(httpJson({
    selfheaders,
    method: method,
    url: url,
    data: params
  }), success, error)
}

function execRequest(httpRequest, success, error) {
  httpRequest.then(function(res) {
    success(res)
  }).catch(function(err) {
    console.log(err, 'err')
    if (error || error === undefined) {
      success(err.response)
    } else {
      error(err.response)
    }
  })
}

export default {
  get: function(url, params, response,selfheaders) {
    return apiAxios('GET', url, params, response,selfheaders)
  },
  post: function(url, params, response,selfheaders) {
    return apiAxios('POST', url, params, response,selfheaders)
  },
  put: function(url, params, response,selfheaders) {
    return apiAxios('PUT', url, params, response,selfheaders)
  },
  delete: function(url, params, response,selfheaders) {
    return apiAxios('DELETE', url, params, response,selfheaders)
  },
  postJson: function(url, params, response,selfheaders) {
    return apiJsonAxios('POST', url, params, response,selfheaders)
  }
}