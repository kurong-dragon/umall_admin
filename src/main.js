// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 清除样式
import "./assets/css/reset.css"

// 挂在跟实际上
import store from "./store"

// 过滤器
import "./filter"

// 公共组件
import "./components"

// element-ui 安装引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// -----图标插件




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

  // 挂在跟实例
  store,
})
