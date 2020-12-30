<template>
  <div class="member">
    <member-add
      :info="info"
      :cmemberlist="cmemberlist"
      @init="init"
      :list="list"
      ref="add"
    >
    </member-add>
    <!-- 管理员列表 -->
    <vmember-list
      :cmemberlist="cmemberlist"
      @emit="emit"
      @init="init"
    ></vmember-list>

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
import memberAdd from "./component/add";
import vmemberList from "./component/list";
import { memberList, memberInfo, memberEdit } from "../../utils/http";

export default {
  components: {
    memberAdd,
    vmemberList,
  },
  data() {
    // 会员添加页的状态
    return {
      info: {
        isshow: false,
        issadd: true,
      },
      // 会员列表
      vmemberlist: [],
      // 初始化页码数量
      page: 1,
      // 总数
      total: 0,
      // 一页的数量
      pageSize: 5,
      // 初始化管理员页表数据
      cmemberlist: [],

      // 修改的数据

      list: [],
    };
  },
  methods: {
    // 点击添加按钮状态
    willadd() {
      this.info.isshow = true;
      this.info.issadd = true;
    },

    // 接受点击了编辑按钮
    emit(uid) {
      this.info.isshow = true;
      this.info.issadd = false;
      this.$refs.add.changeOne(uid);
    },

    // 获取总数
    gettotal() {
      memberList().then((ww) => {
        this.total = ww.data.list[0].total;
      });
    },
    // 获取会员列表
    getuserlist() {
      memberList({ page: this.page, size: this.pageSize }).then((ww) => {
        if (ww.data.code == 200) {
          if (ww.data.list.length == 0 && this.page > 1) {
            this.page--;
            this.getuserlist();
            return;
          }
          this.cmemberlist = ww.data.list;
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
    memberList().then((ww) => {
      console.log(ww, "这是会员列表啊");
      this.cmemberlist = ww.data.list;
    });
  },
};
</script>

<style  scoped>
.member {
  padding-top: 20px;
}
</style>