<template>
  <div class="box">
    <el-row>
      <el-button type="primary" @click="willisshow">添加</el-button>
    </el-row>
    <!-- 添加 -->
    <specs-add :info="info" ref="add"></specs-add>
    <!-- 列表 -->
    <specs-list @edit="edit"></specs-list>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import specsAdd from "./componenrs/goodsadd";
import specsList from "./componenrs/goodslist";
export default {
  // 引入子元素
  components: {
    specsAdd,
    specsList,
  },
  computed: {
   ...mapGetters({
      list: "cate/list"
    })
  },
  data() {
    return {
      info: {
        // 添加按钮状态
        isshow: false,
        issadd: true,
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    }),
    // 点击添加
    willisshow() {
      this.info.isshow = true;
      this.info.issadd = true;
    },
    // 编辑
    edit(id) {
      this.info.issadd = false;
      this.info.isshow = true;
      this.$refs.add.getOne(id);
    },
  },
};
</script>

<style scoped>
.box {
  padding-top: 20px;
}
</style>