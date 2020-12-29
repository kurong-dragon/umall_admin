import Vue from "vue"
let vm=new Vue()

//成功
export let successalert = (msg) => {
    vm.$message({
        message: msg,
        type: "success"
    });
}
//错误
export let erroralert = msg => {
    vm.$message({
        message: msg,
        type: 'warning'
    });
}