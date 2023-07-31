import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    Router,
    RouteLocationNormalized,
    NavigationGuardNext
} from 'vue-router';


//动态导入所有modules下的路由信息
const modelsFile = import.meta.glob('./modules/*.ts', {eager: true})
//路由去中心化
const children = Object.keys(modelsFile)
    .map((key: string) => (modelsFile[key] as Record<any, any>).default)
    .flat(1) || []


// const routes: RouteRecordRaw[] = [
//     {
//         path: '/',
//         name: 'home',
//         component: () => import('@/views/login/login.vue'),
//         children: children
//     }
// ]
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        children: children
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export const defaultBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (['/404', '/403', '/500'].includes(to.path)) {
        next()
        return
    } else {
        next()
    }
}
/**
 * 路由守卫
 */
router.beforeEach(defaultBeforeEach)
/**
 * 获取路由信息
 */
export const getRouter = (): Router => {
    return router
}
export default router