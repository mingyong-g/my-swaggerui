/*
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-25 08:41:34
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\router\menu.load.js
 */
/* eslint-disable */

import store from '@/store'
import { isEmpty } from 'tennetcn-ui/lib/utils'
/*
*{name:name,desc:desc,children:[{path:'/login',reqMethod:[]}]}
*/

const resolveMenu = function() {
  var menus = []
  const swaggerInfo = store.getters.swaggerInfo
  console.log(swaggerInfo, 'swaggerInfo')
  const rootPath = getRootPath()
  const paths = swaggerInfo.paths
  var tagMap = {}
  Array.from(Object.keys(paths)).forEach(path => {
    const reqMethod = paths[path]
    const firstMethod = reqMethod[Object.keys(reqMethod)[0]]
    const firstTag = firstMethod.tags[0]
    const title = isEmpty(firstMethod.summary) ? path : firstMethod.summary
    var children = []
    children.push({path: path.substr(1, path.length - 1), key: path, reqMethod: reqMethod, meta: {icon: '', title: title}, routeParam: {firstTag: firstTag, path: path}})

    tagMap[firstTag] = (tagMap[firstTag] || []).concat(children)
  })

  Array.from(swaggerInfo.tags).forEach((tag, pindex) => {
    // const hidden = tag.name === 'basic-error-controller'

    /* 当前标签无匹配数据则隐藏 */
    const hidden = tagMap[tag.name]==undefined ? true : false;
    const children = tagMap[tag.name]||[];

    // console.log('tag: ', tag);
    // console.log('tagMap: ', tagMap);
    // console.log('children: ', children);

    children.forEach((child, index) => {
      child.routeParam.pindex = pindex
      child.routeParam.index = index
    })
    
    
    console.log(rootPath, 'rootPath')
    const menu = Object.assign({meta: {icon: '', title: tag.description }, path: rootPath, key: tag.name, hidden: hidden}, tag, {children: children, routeParam: {}})
    menus.push(menu)
  })
  store.commit('menus', menus)

  return menus
}

function getRootPath() {
  const theme = store.getters.theme
  if (theme === 'admin') {
    return '/swagger'
  } else if (theme === 'simple') {
    return '/simpleSwagger'
  }
}

export { resolveMenu }
