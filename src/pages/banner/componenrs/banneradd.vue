<template>
  <div>
    <el-dialog title="轮播图添加" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" label-width="120px">
          <div class="catediv">
            <div class="add">+</div>
            <img :src="imgUrl" alt="" class="cateimg" />
            <input type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>
        <!-- 状态 -->
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cateadd" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { banneradd, bannerinfo, banneredit } from "../../../utils/http";
import path from "path";
import { erroralert, successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      //图片地址
      imgUrl: "",
      // 商品类型
      user: {
        title: "",
        img: null,
        status: "1",
      },
    };
  },

  methods: {
    // 清楚按钮
    cancel() {
      //45.编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    // 清空user
    empty() {
      this.imgUrl = "";
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    // 加入照片
    changeImg(e) {
      let file = e.target.files[0];

      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不t能超过2M");
        return;
      }
      // 判断后缀名
      let exname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === exname)) {
        erroralert("请输入图片");
        return;
      }
      // 生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    // 点击添加按钮
    cateadd() {
      banneradd(this.user).then((ww) => {
        if (ww.data.code == 200) {
          successalert(ww.data.msg);
          this.empty();
          this.cancel();
          this.$emit("init");
        }
      });
    },
    //获取详情
    getOne(id) {
      bannerinfo({ id: id }).then((ww) => {
        if (ww.data.code == 200) {
          this.user = ww.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    // 修改
    update() {
      banneredit(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style  scoped>
.catediv {
  /* 图片部分 */
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.catediv .add {
  /* 图片部分 */
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  font-size: 30px;
}
.cateimg {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
.catediv .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 50;
}
</style>