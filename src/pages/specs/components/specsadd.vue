<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      {{ user }}
      {{ attrsArr }}
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input v-model="item.value" class="line-ipt"></el-input>
            <el-button
              type="primary"
              class="line-btn"
              v-if="index == 0"
              @click="attrsarr"
              >新增规格属性</el-button
            >
            <el-button
              type="danger"
              class="line-btn"
              v-else
              @click="attrdel(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" active-value="2" inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="addspecs">添加</el-button>
        <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successalert, erroralert } from "../../../utils/alert";
import { specsAdd, specsinfo, specsedit } from "../../../utils/http";
export default {
  // 接受元素
  props: ["info"],

  data() {
    return {
      value: "100",

      // 初始化添加元素
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      //   新添加的属性规则
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList:"specs/reqList"
    }),
    //   弹窗小事
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //获取一条数据
    getOne(id) {
      specsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    // 修改
    update() {
      this.user.attrs = JSON.stringify(this.attrsArr.map(item => item.value));
      specsedit(this.user).then((ww) => {
        if (ww.data.code == 200) {
          this.cancel();
          this.empty();
          successalert(ww.data.msg);
          this.reqList();
        }
      });
    },
    //   清空
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    // 点击新增商品规则
    attrsarr() {
      this.attrsArr.push({ value: "" });
    },
    // 点击了删除
    attrdel(index) {
      this.attrsArr.splice(index, 1);
    },
    // 点击了最终的添加按钮
    addspecs() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));

      console.log(this.user, "zhanssss");
      specsAdd(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          //   清空
          this.empty();
          this.cancel();
          this.reqList();
        } else {
          erroralert(ww.data.msg);
        }
      });
    },
  },
};
</script>

<style  scoped>
.line {
  display: flex;
}
.line-btn {
  width: auto;
}
.line-ipt {
  flex: 1;
}
</style>