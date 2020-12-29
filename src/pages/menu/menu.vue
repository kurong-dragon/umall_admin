<template>
  <div class="menu">
    <!-- 添加按钮 -->
    <el-row>
      <el-button type="primary" @click="willAdd">添加</el-button>
      <!-- 添加表格 -->
      <!-- 拿完数据之后传给子组件 -->
      <w-list :list="list" @init="init" @edit="edit"></w-list>
      <!-- 表格列表 -->
      <w-add :info="info" :list="list" @init="init" ref="add"></w-add>
    </el-row>
  </div>
</template>

<script>
import { menuObtain } from "../../utils/http";
import wList from "./component/list";
import wAdd from "./component/add";
export default {
  components: {
    wList,
    wAdd,
  },
  data() {
    return {
      // 定义添加的状态
      info: {
        isshow: false,
        // 编辑时的状态栏
        isadd: true,
      },
      list: [],
    };
  },

  methods: {
    // 添加
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      //请求数据
      menuObtain().then((ww) => {
        this.list = ww.data.list;
        console.log(this.list);
      });
    },
    // 编辑
    edit(id) {
      this.info.isadd = false;
      this.info.isshow = true;
      this.$refs.add.getOne(id);
    },
  },
  // 刷新网页
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
/* 上间距 */
.menu {
  margin-top: 20px;
}
</style>