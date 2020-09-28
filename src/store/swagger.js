/*
 * @Author       : mingyong.g
 * @Date         : 2020-09-24 18:52:48
 * @LastEditors  : mingyong.g
 * @LastEditTime : 2020-09-28 09:08:17
 * @Description  : 
 * @FilePath     : \think-swagger-ui-vuele-master\src\store\swagger.js
 */
const swagger = {
  state: {
    info: null,
    path: null,
    menus: null,
    headers: null
  },
  mutations: {
    swaggerPath: function(state, result) {
      state.path = result
    },
    swaggerInfo: function(state, result) {
      state.info = result
    },
    menus: function(state, result) {
      state.menus = result
    },
    headers: function(state, result) {
      // headerItem: {use: true, headerName: null, headerInfo: null}
      if(state.headers){
        state.headers.push(...result);
      }
      else{
        state.headers = result;
      }
      state.headers = [...new Set(state.headers)];
    }
  },
  actions: {
    path({ commit }, param) {
      commit('swaggerPath', param)
    },
    info({ commit }, param) {
      commit('swaggerInfo', param)
    },
    menus({ commit }, param) {
      commit('menus', param)
    },
    headers({ commit }, param) {
      commit('headers', param)
    }
  }
}

export default swagger
