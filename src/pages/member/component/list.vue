<template>
  <div class="box">
    <!-- 管理员list -->
    <el-table :data="cmemberlist" style="width: 100%">
      <el-table-column prop="id" label="会员编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="180">
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
            <el-button type="success" @click="memberemit(scope.row.uid)"
              >编辑</el-button
            >
          </el-row></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
export default {
  props: ["cmemberlist"],
  data() {
    return {
      // user:{
      //   uid:0,
      //   nickname:"",
      //   phone:"",
      //   password:"",
      //   status:1,
      // }
    };
  },
  methods: {
    // 点击编辑
    memberemit(uid) {
      this.$emit("emit", uid);
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 500px;
}
</style>