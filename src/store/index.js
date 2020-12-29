import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

// 导入store 
import { actions } from "./action"
import specs from "./modules/specs"
import cate from "./modules/cate"
import goods from "./modules/goods"
import banner from "./modules/banner"
import { state, getters, mutations } from "./mutation"
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    specs,
    cate,
    goods,
    banner
  }
})