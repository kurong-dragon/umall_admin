<template>
    <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <el-form :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            placeholder="请输入账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            placeholder="请输入密码"
            clearable
            show-password
          ></el-input>
        </el-form-item>

        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../utils/http";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      //规则
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    //登录
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code === 200) {
          //如果登录成功了，将用户的信息存入store
          this.changeUser(res.data.list);
          //跳转页面
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  width: 400px;
  background: #ffffff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.ipt {
  margin: 10px;
}
.center {
  text-align: center;
}
</style>