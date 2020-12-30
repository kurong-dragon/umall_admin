<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form :model="user">
        {{ user }}
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="shopTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changetime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" disabled value="shanghai"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" disabled value="shanghai"></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" disabled value="shanghai"></el-option>
            <el-option
              v-for="item in shopCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="killadd">确 定</el-button>

        <el-button type="primary" @click="killemit">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successalert, erroralert } from "../../../utils/alert";
import { ccateList, secKadd, seckInfo, seckEdit } from "../../../utils/http";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类的list
      cateList: "cate/list",
    }),
  },
  methods: {
    // 弹窗
    cancel() {
      if (!this.info.issadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //   清空
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 2,
      };
    },
    ...mapActions({
      //分类列表的获取
      ccateList: "cate/reqList",
    }),
    // 改变了一级分类二级分类清零
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
      this.getshopList();
    },
    getSecondList() {
      this.user.second_cateid = "";
      ccateList({ pid: this.user.second_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    getshopList() {
      this.user.second_cateid = "";
      ccateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.shopCateList = res.data.list;
          console.log(this.shopCateList);
        }
      });
    },
    // killemit编辑
    killemit() {
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr),
      };
      seckEdit(data).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
        }
      });
    },
    // 查找
    changeOne(id) {
      seckInfo(id).then((ww) => {
        this.user = ww.data.list;
        //转换  把时间戳换成日期
        console.log(typeof this.user.begintime);
        let a = new Date(parseInt(this.user.begintime));
        let b = a.getFullYear();
        let c = a.getMonth() + 1;
        let d = a.getDate();
        let e = a.getHours();
        let f = a.getMinutes();
        let z = new Date(parseInt(this.user.endtime));
        let b1 = z.getFullYear();
        let c1 = z.getMonth() + 1;
        let d1 = z.getDate();
        let e1 = z.getHours();
        let f1 = z.getMinutes();
        this.shopTime = [new Date(b, c, d, e, f), new Date(b1, c1, d1, e1, f1)];

        this.user.id = id;
        this.ccateList();
        this.getSecondList()
        this.getshopList()
        this.changeFirstCateId()
      });
    },
    // 点击了添加
    killadd() {
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr),
      };
      secKadd(data).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
        }
      });
    },
    // 时间改变
    changetime() {
      this.user.begintime = new Date(this.shopTime[0]).getTime();
      this.user.endtime = new Date(this.shopTime[1]).getTime();
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.ccateList();
    }
  },
  data() {
    return {
      // 限时秒杀user
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 2,
      },
      //   二级分类的列表
      secondCateList: [],
      // 商品
      shopCateList: [],
      //   时间
      shopTime: [],
    };
  },
};
</script>

<style>
</style>