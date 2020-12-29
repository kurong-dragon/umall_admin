<template>
  <div class="manage">
    <!-- 添加按钮 -->
    <el-row>
      <el-button type="primary" @click="willadd">添加</el-button>
    </el-row>
    <!-- 管理员添加 -->
    <manage-add
      :info="info"
      :rolelist="rolelist"
      @init="init"
      :list="list"
      ref="add"
    ></manage-add>
    <!-- 管理员列表 -->
    <manage-list :managelist="managelist" @emit="emit"  @init="init"></manage-list>

    <!-- 翻页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePages"
    >
    </el-pagination>
  </div>
</template>

<script>
import manageAdd from "./component/manageadd";
import manageList from "./component/managelist";
import { reloAlllist, userAlllist, userlist } from "../../utils/http";

export default {
  components: {
    manageAdd,
    manageList,
  },
  data() {
    // 管理员添加页的状态
    return {
      info: {
        isshow: false,
        issadd: true,
      },
      // 角色列表
      rolelist: [],
      // 初始化页码数量
      page: 1,
      // 总数
      total: 0,
      // 一页的数量
      pageSize: 5,
      // 初始化管理员页表数据
      managelist: [],

      // 修改的数据

      list: [],
    };
  },
  methods: {
    // 点击添加按钮状态
    willadd() {
      this.info.isshow = true;
      this.info.issadd = true;
      console.log(this.info.isshow);
    },

    // 接受点击了编辑按钮
    emit(uid) {
      this.info.isshow = true;
      this.info.issadd = false;
      this.$refs.add.changeOne(uid);
    },

    // 获取总数
    gettotal() {
      userAlllist().then((ww) => {
        this.total = ww.data.list[0].total;
      });
    },
    // 获取管理员列表
    getuserlist() {
      userlist({ page: this.page, size: this.pageSize }).then((ww) => {
        if (ww.data.code == 200) {
          if (ww.data.list.length == 0 && this.page > 1) {
            this.page--;
            this.getuserlist();
            return;
          }
          this.managelist = ww.data.list;
        }
      });
    },
    changePages(e) {
      this.page = e;
      this.getuserlist();
    },
    // 添加重新获取列表
    init() {
      // 获取总数
      this.gettotal();
      // 获取管理员列表
      this.getuserlist();
    },
  },

  mounted() {
    this.init();
    // 从数据库里拿角色列表
    reloAlllist().then((ww) => {
      console.log(ww);
      this.rolelist = ww.data.list;
      console.log(this.rolelist);
    });
  },
};
</script>

<style  scoped>
.manage {
  padding-top: 20px;
}
</style>