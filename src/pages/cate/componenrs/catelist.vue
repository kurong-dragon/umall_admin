<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img !== 'null'"
            :src="$pre + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <el-row>
          <el-button type="primary">启用</el-button>
        </el-row>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqcateDel } from "../../../utils/http";
import {successalert} from "../../../utils/alert"
export default {
  props: ["list"],
  methods: {
    // 删除
    del(id) {
      reqcateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id) {
      //通知父组件有人点了编辑按钮
      this.$emit("edit", id);
    },
  },
};
</script>

<style  scoped>
img {
  width: 80px;
  height: 80px;
}
</style>