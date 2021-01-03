
export let state = {
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export let getters={
    userInfo(state){
        return state.userInfo
    }
}
export let mutations={
    changeUserInfo(state,obj){ 
        state.userInfo=obj;
        //同步到本地存储
        if(obj.username){
            sessionStorage.setItem("userInfo",JSON.stringify(obj))
        }else{
            sessionStorage.removeItem("userInfo")
        }
        
    }
}