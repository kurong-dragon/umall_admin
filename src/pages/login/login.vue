<template>
  <div class="login">
    <div class="box">
      <p class="box-words">登录</p>
      <el-input
        placeholder="请输入用户名"
        v-model="loginname"
        clearable
        class="mtop"
      >
      </el-input>
      <el-input
        placeholder="请输入密码"
        v-model="loginpassword"
        clearable
        show-password
        class="mtop"
      ></el-input>

      <el-button type="primary" @click="login()" class="mtop">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // login 首页登录用户名和密码
      loginname: "",
      loginpassword: "",
    };
  },
  methods:{
    login(){
        this.$router.push("/")
    }
  },
};
</script>

<style scoped>
/* 整体背景 */
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
/* 白框定位 */
.box {
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* 登录文字样式 */
.box-words {
  font: 22px "微软雅黑";
  text-align: center;
}
/* 输入框距上边距 */
.mtop {
  margin-top: 20px;
  width: 100%;
}
</style>