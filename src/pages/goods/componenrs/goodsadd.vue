<template>
  <div>
    <el-dialog
      :title="info.issadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
      @opened="opened"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeImg"
            />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in showSpecsAttr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isshow"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addspecs" v-if="info.issadd"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { successalert, erroralert } from "../../../utils/alert";

import {
  ccateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/http";
export default {
  // 接受元素
  props: ["info"],

  data() {
    return {
      // 初始化数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //   新添加的属性规则
      imgUrl: "",
      //二级分类的列表
      secondCateList: [],
      //规格属性展示的所有选项的列表
      showSpecsAttr: [],
    };
  },

  computed: {
    ...mapGetters({
      //分类的list
      cateList: "cate/list",
      // 规格的list
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      //分类列表的获取
      ccateList: "cate/reqList",
      // 规格列表的获取
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
    }),
    //规格变了
    changeSpecsId() {
      this.user.specsattr = [];
      this.getShowSpecsAttr();
    },
    changeFirstCateId() {
      this.user.second_cateid = "";

      this.getSecondList();
    },
    //根据一级分类，计算出二级分类的list
    getSecondList() {
      ccateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    //获取规格属性的展示列表
    getShowSpecsAttr() {
      //
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      this.showSpecsAttr = obj ? obj.attrs : [];
    },
    // 弹窗
    cancel() {
      if (!this.info.issadd) {
        this.empty();
      }
      this.info.isshow = false;
    },

    //上传文件
    changeImg(e) {
      let file = e.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    //获取一条数据
    getOne(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.getSecondList();
          this.imgUrl = this.$pre + this.user.img;
          this.getShowSpecsAttr();
          this.user.specsattr = JSON.parse(this.user.specsattr);
          this.user.id = id;
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    //封装的验证
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid === "") {
          erroralert("一级分类不能为空");
          return;
        }

        if (this.user.second_cateid === "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          erroralert("商品名称不能为空");
          return;
        }

        if (this.user.price === "") {
          erroralert("商品价格不能为空");
          return;
        }

        if (this.user.market_price === "") {
          erroralert("商品市场价格不能为空");
          return;
        }

        if (!this.user.img) {
          erroralert("请上传图片");
          return;
        }
        if (this.user.specsid === "") {
          erroralert("商品规格不能为空");
          return;
        }

        if (this.user.specsattr.length === 0) {
          erroralert("请选择规格属性");
          return;
        }
        if (this.editor.txt.html() == "") {
          erroralert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    // 修改
    update() {
      this.checkProps().then(() => {
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };

        reqgoodsUpdate(data).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.empty();
            successalert(res.data.msg);
            this.reqList();
          }
        });
      });
    },
    //   清空
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";

      this.secondCateList = [];
      this.showSpecsAttr = [];
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
      this.checkProps().then(() => {
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        reqgoodsAdd(data).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.empty();
            successalert(res.data.msg);
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },
    //创建富文本编辑器
    opened() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.user.description);
    },
  },

  mounted() {
    //3.3如果没有请过分类数据，就发一下请求
    if (this.cateList.length === 0) {
      this.ccateList();
    }

    //7.3 请求规格list
    this.reqSpecsList(true);
  },
};
</script>

<style scoped>
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>