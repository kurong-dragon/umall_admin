import { reqgoodsCount, reqgoodslist } from "../../utils/http";

let state = {
    //列表
    list: [],
    //总数
    total: 0,
    //一页的数量
    size: 2,
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
    //获取list的action
    reqList(context, bool) {
        //商品规格是要分页的，商品管理，是不要分页的。所以多给一个参数，bool.
        //bool是true,就要全部；否则，就做分页
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        //发请求
        reqgoodslist(params).then(res => {
            if (res.data.code) {
                //删除的是最后一页的最后一条
                if (res.data.list.length === 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1)
                    context.dispatch("reqList")
                    return;
                }


                //修改list
                context.commit("changeList", res.data.list)
            }
        })
    },
    //获取总数
    reqTotal(context) {
        reqgoodsCount().then(res => {
            if (res.data.code == 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },
    //修改page
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