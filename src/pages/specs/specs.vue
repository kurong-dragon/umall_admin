<template>
  <div class="box">
    <el-row>
      <el-button type="primary" @click="willisshow">添加</el-button>
    </el-row>
    <!-- 添加 -->
    <specs-add :info="info" ref="add"></specs-add>
    <!-- 列表 -->
    <specs-list @edit="edit"></specs-list>
    <!-- 翻页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      t
      otal="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import specsAdd from "./components/specsadd";
import specsList from "./components/specslist";
export default {
  // 引入子元素
  components: {
    specsAdd,
    specsList,
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      //总数
      total: "specs/total",
      //一页的数量
      size: "specs/size",
    }),
  },
  data() {
    return {
      info: {
        // 添加按钮状态
        isshow: false,
        issadd: true,
      },
      size: 2,
    };
  },
  methods: {},

  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
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
    changePage(v) {},
  },
};
</script>

<style scoped>
.box {
  padding-top: 20px;
}
</style>