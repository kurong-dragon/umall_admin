<template>
  <div>
    <el-row>
      <el-button type="success" @click="willadd()">添加</el-button>
    </el-row>
    <v-list :killlist="killlist" @emit="emit" @init="init"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import { seckList } from "../../utils/http";
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        issadd: true,
      },
      killlist: [""],
    };
  },
  mounted() {
    this.getlist();
  },
  methods: {
    willadd() {
      (this.info.isshow = true), (this.info.issadd = true);
    },
    // 获取列表
    getlist() {
      seckList().then((ww) => {
        if (ww.data.code == 200) {
          this.killlist = ww.data.list;
        }
      });
    },
    // 接受点击了编辑按钮
    emit(id) {
      console.log(id, "这是id");
      this.info.isshow = true;
      this.info.issadd = false;
      this.$refs.add.changeOne(id);
    },
      // 添加重新获取列表
    init() {
      // 获取管理员列表
      this.getlist()
    },
   
  },
};
</script>

<style>
</style>