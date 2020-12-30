<template>
  <div>
    <el-table :data="killlist" style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
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
            <el-button type="success" @click="killemit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="killdel(scope.row.id)"
              >删除</el-button
            >
          </el-row></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert, erroralert } from "../../../utils/alert";
import { seckEdit, seckDelete } from "../../../utils/http";
export default {
  props: ["killlist"],
  data() {
    return {};
  },
  methods: {
    killemit(id) {
      this.$emit("emit", id);
    },
    killdel(id){
        seckDelete(id).then((ww)=>{
      if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.$emit("init");
        }
})
    }
  },
};
</script>

<style>
</style>