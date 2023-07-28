import {acceptHMRUpdate, defineStore} from "pinia";

interface RequestStore{
    //登录令牌
    cache:{[key:string]:string}
}
const STORY_KEY='request-store'
export const useRequestStore = defineStore(STORY_KEY,{
    state:()=><RequestStore>{
        cache:{}
    },
    actions: {
        save(key:string,data:string){
            this.$state.cache[key] = data
        }
    },
    //开启数据缓存
    persist:{
        enabled:true,
        strategies:[
            {
            key:STORY_KEY,
            storage:sessionStorage
        }
        ]
    }
})
//热更新实现
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useRequestStore,import.meta.hot))
}