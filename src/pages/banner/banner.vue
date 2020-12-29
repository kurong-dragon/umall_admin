<template>
  <div>
    <!-- 添加按钮 -->
    <el-row>
      <el-button type="primary" @click="willAdd()">添加</el-button>
    </el-row>
   
    <!-- 商品添加 -->
    <banner-add :info="info" :list="list" @init="init" ref="add"></banner-add>

    <!-- 商品列表 -->
    <banner-list :list="list" @edit="edit" @init="init"> </banner-list>
  </div>
</template>

<script>
import { bannerlist } from "../../utils/http";
import bannerAdd from "./componenrs/banneradd";
import bannerList from "./componenrs/bannerlist";
export default {
  components: {
    bannerAdd,
    bannerList,
  },

  data() {
    return {
      info: {
        // 添加栏
        isshow: false,
        isadd: true,
      },
      // 获取列表
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 点击添加
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 商品重新获取
    init() {
      bannerlist().then((ww) => {
        if (ww.data.code == 200) {
          this.list = ww.data.list;
        }
      });
    },
    // 编辑触发
    edit(id) {
      //弹框出现
      this.info.isshow = true;

      //43.是编辑
      this.info.isadd = false;

      //触发add的getOne()
      this.$refs.add.getOne(id);
    },
  },
};
</script>

<style>
</style>