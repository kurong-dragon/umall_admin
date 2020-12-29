import Vue from 'vue'
import Router from 'vue-router'




Vue.use(Router)

export let indexRoutes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单栏",

  },
  {
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色",

  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理者",

  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类",

  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格",

  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理",

  },
  {
    path: "member",
    component: () => import("../pages/member/member"),
    name: "会员",

  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图",

  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀",

  },

]

export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login/login"),
      name: "登录页",


    },
    {
      path: "/",
      component: () => import("../pages/index/index"),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home")
        },
        //12.恢复
        ...indexRoutes
      ]
    },
  ]
})

