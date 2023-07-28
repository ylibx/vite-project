/**
 * 状态管理
 */


import { createApp } from 'vue'
import './assets/scss/global.scss'
import App from './App.vue'
import { getRouter } from './router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/fonts/fonts.scss'

createApp(App)
    // 使用pinia代替vuex缓存
    .use(createPinia().use(piniaPluginPersist))
    .use(getRouter())
    .use(Antd)
    .use(ElementPlus)
    .mount('#app')