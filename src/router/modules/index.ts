import type { RouteRecordRaw } from 'vue-router';

import Home from '@/views/Home.vue';

// const reqFiles = require.context('./', true, /\.ts$/);

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "",
        component: Home,
        // children: []
    },
    {
        path: "/svgEditor",
        name: "SvgEditor",
        component: () => import("@/views/MuSvgEditor.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        // redirect: "/",
        component: () => import("@/views/404"),
        meta: {
            title: "404",
            noCache: true
        }
    },
];

export default routes;