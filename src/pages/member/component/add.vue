<template>
  <div>
    <el-dialog title="会员编辑" :visible.sync="info.isshow">
      {{ user }}
      <el-form :model="user" @closed="cancel">
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
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

        <el-button type="primary" @click="cmemberinfo">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { memberInfo, memberEdit } from "../../../utils/http";
export default {
  // 接受info是否出现
  props: ["info", "cmemberlist", "list"],
  data() {
    return {
      user: {
        uid: 0,
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },

  methods: {
    cancel() {
      if (!this.info.issadd) {
        this.user = {
          uid: 0,
          nickname: "",
          phone: "",
          password: "",
          status: 1,
        };
      }
      this.info.isshow = false;
    },
    // 查找
    changeOne(uid) {
      memberInfo({ uid }).then((ww) => {
        this.user = ww.data.list;
        this.user.password = ""
      });
    },
    // 点击修改
    cmemberinfo() {
      memberEdit(this.user).then((ww) => {
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