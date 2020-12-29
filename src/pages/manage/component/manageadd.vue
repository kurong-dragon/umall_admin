<template>
  <div>
    <el-dialog title="用户添加" :visible.sync="info.isshow">
      <el-form :model="user" @closed="cancel">
        <!-- 所属角色 -->
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="user.roleid">
            <el-option label="--请选择" value="" disabled></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" active-value="1" inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="manageadd" v-if="info.issadd"
          >确 定</el-button
        >
        <el-button type="primary" @click="manageinfo" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { userAdd, userinfo, useredit } from "../../../utils/http";
export default {
  // 接受info是否出现
  props: ["info", "rolelist", "list"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: "2",
      },
    };
  },

  methods: {
    cancel() {
      if (!this.info.issadd) {
        this.user = {
          roleid: "",
          username: "",
          password: "",
          status: "2",
        };
      }
      this.info.isshow = false;
    },

    //   添加到数据库
    manageadd() {
      userAdd(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.cancel();
          this.$emit("init");
        }
      });
    },
    // 查找
    changeOne(uid) {
      userinfo(uid).then((ww) => {
        this.user = ww.data.list;
      });
    },
    // 点击修改
    manageinfo() {
      useredit(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.cancel();
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style  scoped>
</style>