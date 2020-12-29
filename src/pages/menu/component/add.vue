<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user" ref="user" label-width="100px">
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="user.pid" placeholder="请选择活动区域">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="user.type">
            <el-radio :label="1">目录</el-radio>
          </el-radio-group>
          <el-radio-group v-model="user.type">
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" prop="icon">
          <el-select v-model="user.icon">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->

        <el-form-item label="菜单地址" prop="url">
          <el-select v-model="user.url">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
            >
              <!-- <i :class="item"></i> -->
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="add" v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="update" v-else>修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { menuAdd, menuOnelist, menuedit } from "../../../utils/http";
import { indexRoutes } from "../../../router/index";
export default {
  props: ["info", "list"],

  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 2,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      indexRoutes,
    };
  },
  methods: {
    // 点击取消按钮
    cancel() {
      this.info.isshow = false;
      if (!this.info.isadd) {
        this.user = {
          pid: 0,
          title: "",
          icon: "",
          type: 1,
          url: "",
          status: 2,
        };
      }
    },
    // 点击添加按钮
    add() {
      console.log(this.user);
      menuAdd(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.cancel(), this.$emit("init"), this.user;
        }
      });
    },
    // 编辑
    getOne(id) {
      menuOnelist(id).then((ww) => {
        if (ww.data.code == 200) {
          this.user = ww.data.list;
          this.user.id = id;
        }
      });
    },
    // update修改
    update() {
      menuedit(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.cancel(), this.user, this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>