<template>
  <div class="box">
    <!-- 管理员list -->
    <el-table :data="managelist" style="width: 100%">
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="状态" sortable width="180">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </el-row></template
        >
      </el-table-column>
      <el-table-column prop="address" label="操作" 
        ><template slot-scope="scope">
          <el-row>
            <el-button type="success" @click="manageemit(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="roledel(scope.row.uid)"
              >删除</el-button
            >
          </el-row></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {userdelete} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
export default {
  props: ["managelist"],
  data() {
    return {
    
    };
  },
  methods: {
    // 点击编辑
  manageemit(uid){

    console.log(uid,"sdddddddddddddddddddddd")
    this.$emit("emit",uid)
  },
  // 点击删除
  roledel(uid){
userdelete(uid).then((ww)=>{
      if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.$emit("init");
        }
})
  }
  },
};
</script>

<style scoped>

.box{
  width: 100%;
  height: 500px;
}
</style>