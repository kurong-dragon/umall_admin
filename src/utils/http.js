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
        data:qs.stringify(user)
    })
}

// 商品规格总数(用于计算分页)
export let specscount = () => {
    return axios({
        url: baseUrl+"/api/specscount",
        method:"GET"
    })
}

// 商品规格列表(分页)
export let specslist = (p) => {
    return axios({
        url:baseUrl+ "/api/specslist",
        method: "GET",
        params:p
    })
}
// 获取一条规格列表
export let specsinfo = (id) => {
    return axios({
        url:baseUrl+ "/api/specsinfo",
        method: "GET",
        params:id
    })
}
// 商品修改
export let specsedit = (user) => {
    return axios({
        url:baseUrl+ "/api/specsedit",
        method: "POST",
        data:qs.stringify(user)
    })
}

// 商品规格删除
export let specsdelete = (id) => {
    return axios({
        url:baseUrl+ "/api/specsdelete",
        method: "POST",
        data:id
    })
}

