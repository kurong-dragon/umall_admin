<template>
  <div class="role">
    <el-dialog
      :title="info.isadd ? '角色添加' : '角色修改'"
      :visible.sync="info.isshow"
      @closed="cancell"
    >
      <el-form :model="user">
        <!-- 角色名称 -->
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menulist"
            show-checkbox
            :props="defaultProps"
            default-expand-all
            node-key="id"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancell">取 消</el-button>
        <el-button type="primary" @click="reloadd" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="resetrelo()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reloAdd, roleInfo, roleEdit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 接受添加状态
  props: ["info", "menulist"],
  data() {
    return {
      user: {
        id: "",
        rolename: "",
        menus: "",
        status: "",
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    // 点击取消按钮
    cancell() {
      this.setCheckedKeys();
      console.log(this.info);
      if (!this.info.isadd) {
        this.user = {
          id: "",
          rolename: "",
          menus: "",
          status: "",
        };
      }
      this.info.isshow = false;
      // this.info.isshow = true;
    },

    // 编辑某个
    changeOne(id) {
      roleInfo(id).then((ww) => {
        console.log(ww, "ww");
        this.user = ww.data.list;
        this.user.menus = JSON.parse(ww.data.list.menus);
        this.$refs.tree.setCheckedKeys(this.user.menus);
        this.user.id = id;
      });
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([]);
    },
    // 角色添加
    reloadd() {
      // 数组转化为字符串通过Josn
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reloAdd(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.cancell();
          this.$emit("init");
        }
      });
    },
    // 点击修改
    resetrelo() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleEdit(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.cancell();
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style scoped>
/* 盒子 */
.role {
  border: 1px solid;
}
.roleword1 {
  font: 14px "微软雅黑";
}
.roleinput {
  width: 80%;
}
</style>