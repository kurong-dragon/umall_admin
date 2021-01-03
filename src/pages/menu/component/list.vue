<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="pid" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url  " label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态"
        ><el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { menuDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 子组件通过props接收
  props: ["list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1,
      },
    };
  },
  methods: {
    // 删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          menuDel(id).then((ww) => {
            if (ww.data.code === 200) {
              successalert(ww.data.msg);
              this.$emit("init");
            }
          });
        })
        .catch(() => {});
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>