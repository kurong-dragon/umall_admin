<template>
  <div class="main">
    <!-- 添加 -->
    <el-row>
      <el-button type="primary" @click="rolewilladd">添加</el-button>
    </el-row>

    <!-- 角色添加 -->
    <m-roleadd
      :info="info"
      :menulist="menulistz"
      @init="init"
      ref="add"
    ></m-roleadd>

    <!-- 角色列表  -->
    <m-rolelist
      :relolist="relolist"
      @init="init"
      @roleemit="roleemit"
    ></m-rolelist>
  </div>
</template>

<script>
import { reloAlllist, menuObtain } from "../../utils/http";
import mRoleadd from "./components/roleadd";
import mRolelist from "./components/rolelist";
export default {
  components: {
    mRoleadd,
    mRolelist,
  },
  data() {
    return {
      // 添加列表状态
      info: {
        isshow: false,
        isadd: true,
      },
      // 列表信息
      relolist: [],
      // 菜单列表详情
      menulistz: [],
    };
  },
  methods: {
    // 添加
    rolewilladd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },

    // 获取数据库角色列表
    init() {
      reloAlllist().then((ww) => {
        this.relolist = ww.data.list;
      });
    },
    // 数据库中取出菜单
    Obtainlist() {
      menuObtain().then((ww) => {
        this.menulistz = ww.data.list;
        console.log(this.menulistz);
      });
    },
    // 编辑页面
    roleemit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.changeOne(id);
    },
  },

  // 刷新页面
  mounted() {
    this.init();
    this.Obtainlist();
  },
};
</script>

<style scoped>

.main{
   margin-top: 20px;
}
</style>