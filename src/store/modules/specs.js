import { specslist, specscount } from "../../utils/http"
let state = {
    // 列表
    list: [],
    //总数
    total: 0,
    //一页的数量
    size: 5,
    //当前的页码
    page: 1
}

let mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }
}
let getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}
let actions = {
    reqList(context) {
        specslist({ page: context.state.page, size: context.state.size }).then((ww) => {
            if (ww.data.code == 200) {
                //删除的是最后一页的最后一条
                if (ww.data.list.length === 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1)
                    context.dispatch("reqList")
                    return;
                }
                let list = ww.data.list

                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })
                context.commit("changeList", list)
            }
        })
    },
    //获取总数
    reqTotal(context) {
        specscount().then(ww => {
            if (ww.data.code == 200) {
                console.log(ww);
                context.commit("changeTotal", ww.data.list[0].total)
            }
        })
    },
    changePage(context, num) {
        //修改页码
        context.commit("changePage", num)
        //重新请求list
        context.dispatch("reqList")
    }
}
export default {
    state, mutations, getters, actions,
    namespaced: true
}