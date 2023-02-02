<script setup lang="ts">
import type IStateType from "./types/propsType";
import { reactive } from "vue";
import { canvasBackground, tool, attr } from "./config";

import Menu from "./menu";
import Tool from "./tool";
import Work from "./work";
import Attr from "./attr";
import Info from "./info";

import { Code, Json } from './code';
import { operate } from './hook';



const state: IStateType = reactive({
    // 画布属性
    canvas: {
        lineX: 730,
        lineY: 420,
        width: 1008,
        height: 567,
        showLine: true,
        showDrag: false,
        showScale: true,
        backsetup: 'auto',
        background: [canvasBackground[0].value],
    },

    // 组件数据
    svgData: [],
    svgCtrl: {
        showCode: false,
        showJson: false,
    },

    addImage: {},

    // 左侧组件集合
    tool,

    // 当前组件
    nowTool: {},

    // 当前组件属性
    nowAttr: {
        attr: {},
        index: null,
    },
});

const menu = {
    openSvg() {
        operate.hookOpenSvg().then((res: any) => {
            console.info(res, res.data.value);
        });
    },

    addImage() {
        operate.hookImportImage('Blob', true).then(({ base64, fileName, width, height }: any) => {
            state.addImage = {
                type: 'image',
                href: base64,
                name: fileName,
                attr: {
                    ...attr,
                    style: {
                        ...attr.style,
                        width: width >= state.canvas.width ? state.canvas.width : width,
                        height: height >= state.canvas.height ? state.canvas.height : height,
                    }
                },
                event: 2,
            };
        });
    }
};

</script>

<template>
    <section class="mu-svg-editor">
        <Menu :prop="state" :menu="menu" />
        <Tool :prop="state" />
        <Work v-bind:prop="state" />
        <Attr :prop="state" />
        <Info :prop="state" />
    </section>
    <Code :prop="state" />
    <Json :prop="state" />
</template>

<style scoped lang="less">
.mu-svg-editor {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: radial-gradient(#0229a0 -150%, rgb(30, 30, 30) 100%);
    overflow: hidden;
    box-sizing: border-box;
    display: grid;
    grid-gap: 0;
    grid-template-rows: 50px calc(100vh - 80px) 30px;
    grid-template-columns: 180px 1fr 260px;
    grid-template-areas: "menu menu menu" "tool work attr" "tool info info";
}

// ::-webkit-scrollbar {
//     width: 12px;
//     height: 12px;
// }

// ::-webkit-scrollbar-track {
//     background-color: #F5F5F5;
//     -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
// }

// ::-webkit-scrollbar-thumb {
//     outline: none;
//     border-radius: 2px;
//     outline-offset: -2px;
//     background-color: #555;
//     border: 1px solid wheat;
//     -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
// }
</style>
