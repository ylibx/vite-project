import component from "*.vue";

export default [
    {
        path:'/:pathMatch(.*)*.',
        redirect:'/404'
    },
    {
        name:'403',
        path: '/403',
        component: () => import('@/views/exception/403.vue')
    },
    {
        name:'404',
        path: '/404',
        component: () => import('@/views/exception/404.vue')
    },
    {
        name:'500',
        path: '/500',
        component: () => import('@/views/exception/500.vue')
    },
]