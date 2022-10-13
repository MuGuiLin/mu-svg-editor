import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

import routes from './modules'

const router = createRouter({
    history: createWebHashHistory(), 
    routes
});


// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // if (
    //     // 检查用户是否已登录,避免无限重定向
    //     !isAuthenticated && to.name !== 'Login'
    // ) {
    //     // 将用户重定向到登录页面
    //     return { name: 'Login' }
    // }

    // // 或用异步方式
    // const canAccess = await canUserAccess(to)
    // if (!canAccess) return '/login';


    // 如果用户未能验证身份，则 `next` 会被调用两次
    next();
});

export default router;