<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import HelloWorld from '@/components/HelloWorld.vue'

const is = Math.random() > 0.5 ? 'a' : 'router-link';

const linkProps = (to: string) => {
    return 'a' === is ? {
        href: to,
        target: '_blank',
        rel: 'noopener'
    } : {
        to: '/svgEditor'
    }
};

</script>

<template>

    <section id="root">
        <nav class="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/svgEditor">MuSvgEditor</router-link> |
            <router-link to="/404">404</router-link> |
            <component :is="is" v-bind="linkProps('https://demo.muguilin.com')">
                <slot /> Demo
            </component>
        </nav>
        <hr />
        <br />

        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="@/assets/svg/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
        <a href="https://www.tslang.cn/" target="_blank">
            <img src="@/assets/img/ts.webp" class="logo antdv" alt="TS logo" />
        </a>
        <a href="https://antdv.com/docs/vue/introduce-cn" target="_blank">
            <img src="/antdv.svg" class="logo antdv" alt="AntDV logo" />
        </a>

        <HelloWorld msg="Vite + Vue + Tsx + AntDV" />
    </section>
</template>

<style scoped lang="less">
// :root {
#root {
    margin: 0 auto;
    padding: 2rem;
    height: 100vh;
    text-align: center;

    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    // background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;


    .nav {
        padding: 30px;

        a {
            padding: 10px;
            font-size: 22px;
        }

        a.router-link-active {
            color: #08d308;
            font-size: 22px;
            font-weight: bold;
        }
    }

    .logo {
        // display: flex;
        place-items: center;
        height: 12em;
        padding: 2em;
        will-change: filter;
    }

    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }

    .logo.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    }

    .logo.antdv:hover {
        filter: drop-shadow(0 0 2em #1182ff);
    }

    @media (prefers-color-scheme: light) {
        :root {
            color: #213547;
            background-color: #ffffff;
        }

        a:hover {
            color: #747bff;
        }

        button {
            background-color: #f9f9f9;
        }
    }
}
</style>
