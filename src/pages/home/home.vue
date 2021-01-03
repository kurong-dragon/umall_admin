<template>
  <div>
    <div id="main"></div>
    <div id="title">
      <p>商城管理情况图</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },

  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },

  mounted() {
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          let mychart = require("echarts").init(
            document.getElementById("main")
          );
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "分类数量",
            },
            tooltip: {},
            legend: {
              data: ["分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename.substring(0, 5)),
            },
            yAxis: {},
            // series:数据
            series: [
              {
                name: "分类数量",
                type: "bar",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };
          mychart.setOption(option);
        }
      },
      deep: true,
    },
  },
};
</script>

<style  scoped>
#main {
  /* width: 1000px; */
  height: 400px;
  margin: 0 auto;
}
#title {
  width: 1000px;
  height: 50px;
  margin: 0 auto;
  font: bold 30px "微软雅黑";
  text-align: center;
  color: dimgrey;
}
</style>