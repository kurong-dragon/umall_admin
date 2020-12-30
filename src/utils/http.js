import axios from "axios"
import qs from "qs"
import Vue from "vue"

// 开发环境使用
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

// 生产环境使用
// let baseUrl = ""
// Vue.prototype.$pre = ""

// 相应拦截
axios.interceptors.response.use(res => {
    console.group("本此请求的地址是" + res.config.url)
    console.log(res)
    console.groupEnd()
    return res
})



// 菜单添加
export let menuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "POST",
        data: qs.stringify(user)
    })
}
// 菜单数据获取全部 
export let menuObtain = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "GET",
        params: {
            istree: true
        }
    })
}
// 菜单点击删除
export let menuDel = (id
) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "POST",
        data: {
            id
        }
    })
}
// 获取单条信息
export let menuOnelist = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "GET",
        params: {
            id: id
        }
    })

}
// 菜单修改
export let menuedit = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "POST",
        data: qs.stringify(user)


    })
}

// 角色列表
export let reloAlllist = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "GET",
    })
}

// 角色添加
export let reloAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "POST",
        data: qs.stringify(user)
    })
}
// 角色删除
export let roleDelete = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "POST",
        data: {
            id
        }
    })
}
// 编辑角色
export let roleInfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "GET",
        params: {
            id
        }
    })
}
// 修改角色
export let roleEdit = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data:
            qs.stringify(user)

    })
}


//登录
export let reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}


// 管理员添加
export let userAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "POST",
        data:
            qs.stringify(user)
    })
}
// 获取管理员总数
export let userAlllist = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "GET",
    })
}
// 获取管理员列表
export let userlist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "GET",
        params: obj
    })
}
// 获取管理员列表一条
export let userinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "GET",
        params: { uid }
    })
}
// 修改管理员列表一条
export let useredit = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "POST",
        data: qs.stringify(user)
    })
}
//删除管理员列表一条
export let userdelete = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "POST",
        data: {
            uid
        }
    })
}
// 将数据加入文件
function fileToDataForm(file) {
    let data = new FormData();
    for (let i in file) {
        data.append(i, file[i]);
    }
    return data;
}

// 商品分类添加A
export let cateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "POST",
        data: fileToDataForm(user)
    })
}
// 获取商品列表
export let ccateList = (user) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "GET",
        params: user
    })
}
// 获取商品单个
export let reqcateDetail = (user) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: user
    })
}
//修改 user={id:"必填",img:file,catename:""}
export let reqcateUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: fileToDataForm(user)
    })
}
//删除 user={id:1}
export let reqcateDel = (user) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(user)
    })
}
// 轮播图添加
export let banneradd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: fileToDataForm(user)

    })
}
// 轮播图列表
export let bannerlist = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "GET",
    })
}
// 轮播图列表一条
export let bannerinfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "G ET",
        params:
            id

    })
}
// 轮播图删除
export let bannerdelete = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "POST",
        data:
            id

    })
}
// 轮播图修改
export let banneredit = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "POST",
        data:
            fileToDataForm(user)

    })
}


// **************************   商品   ******************************



// 商品规格添加

export let specsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "POST",
        data: qs.stringify(user)
    })
}

// 商品规格总数(用于计算分页)
export let specscount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "GET"
    })
}

// 商品规格列表(分页)
export let specslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "GET",
        params: p
    })
}
// 获取一条规格列表
export let specsinfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "GET",
        params: id
    })
}
// 商品修改
export let specsedit = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "POST",
        data: qs.stringify(user)
    })
}

// 商品规格删除
export let specsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "POST",
        data: id
    })
}

// -----------------------------------商品管理

// // 将数据加入文件
// function fileToDataForm(file) {
//     let data = new FormData();
//     for (let i in file) {
//         data.append(i, file[i]);
//     }
//     return data;
// }

// 商品添加
export let goodsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "POST",
        data: fileToDataForm(user)
    })
}

// 商品总数 
export let goodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "GET"
    })
}
// 商品分页
export let goodsList = (a) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "GET",
        params: a
    })
}
// 商品获取（一条）
export let goodsInfo = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "GET",
        params: {
            id
        }
    })
}
// 商品修改
export let goodsEdit = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "POST",
        data: fileToDataForm(user)
    })
}
// 商品删除
export let goodsDelete = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "POST",
        data:
            id

    })
}

//************商品管理 

//添加 
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: fileToDataForm(user)
    })
}

//列表
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: p
    })
}

//详情 
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

// --------------------------会员管理
// 会员列表
export let memberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "GET",

    })
}

// 会员获取(一条)

export let memberInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "GET",
        params: obj
    })
}

// 会员修改

export let memberEdit = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "POST",
        data: qs.stringify(user)
    })
}


// --------------限时秒杀

// 秒杀添加
export let secKadd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "POST",
        data: qs.stringify(user)
    })
}
// 限时秒杀列表
export let seckList = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "GET",
    })
}
// 限时秒杀获取（一条）
export let seckInfo = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "GET",
        params: {
            id
        }
    })
}
// 限时秒杀修改
export let seckEdit = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "POST",
        data: qs.stringify(user)
    })
}
// 秒杀删除
export let seckDelete = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "POST",
        data: {id}

    })
}