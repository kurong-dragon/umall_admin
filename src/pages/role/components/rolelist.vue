<template>
  <div>
    <el-table
      :data="relolist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <el-row>
          <el-button type="primary">启用</el-button>
        </el-row>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="success" @click="roleemit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="roledel(scope.row.id)"
              >删除</el-button
            >
          </el-row></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import { roleDelete } from "../../../utils/http";
export default {
  props: ["relolist"],
  methods: {
    //   删除按钮
    roledel(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then((ww) => {
        roleDelete(id).then((ww) => {
          if (ww.data.code == 200) {
            successalert(ww.data.msg);
            this.$emit("init");
          }
        });
      });
    },
    // 编辑按钮
    roleemit(id){
        this.$emit("roleemit",id)
    }
  },
};
</script>

<style>
</style>