import { ccateList } from "../../utils/http"
// 搭了架子
let state = {
    //  初始值
    list: []
}
let mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    }
}
let getters = {
    // 导出list
    list(state) {
        return state.list;
    }
}
let actions = {
    // 处理list的逻辑
    reqList(context) {
        //发请求 成功之后 修改
        ccateList({ istree: true }).then(res => {
            if (res.data.code == 200) {
                context.commit("changeList", res.data.list)
            }
        })
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    //命名空间
    namespaced: true
}