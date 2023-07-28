import {acceptHMRUpdate, defineStore} from "pinia";

interface RequestStore{
    //登录令牌
    token:string
}
const STORY_KEY='request-store'
export const useSystemStore = defineStore(STORY_KEY,{
    state:()=>
        <RequestStore>{
        token:''
    },
    getters:{
        //！！强制转换为布尔类型
        isLogin:state => !!state.token
    },
    actions: {
        setToken(token:string){
            this.$patch({token})
        }
    },
    //开启数据缓存
    persist:{
        enabled:true,
        strategies:[
            {
                key:STORY_KEY,
                storage:localStorage
            }
        ]
    }
})
//热更新实现
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useSystemStore,import.meta.hot))
}