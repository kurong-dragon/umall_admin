import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'





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

let router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../pages/login/login.vue")
    },
    {
      path: "/",
      component: () => import("../pages/index/index.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home.vue")
        },
        //12.恢复
        ...indexRoutes
      ]
    },

  ]
})

//登录拦截
router.beforeEach((to, from, next) => {
  //如果去到是登录 next
  if (to.path === "/login") {
    next()
    return
  }
  //不是登录，判断是否登录，登录了，就next
  if (store.state.userInfo.id) {
    next()
    return;
  }
  //否则 next("/login")
  next("/login")
})

export default router
