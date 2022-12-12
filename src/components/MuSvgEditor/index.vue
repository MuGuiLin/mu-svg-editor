<script setup lang="ts">
import { reactive } from "vue";
import type IStateType from "./types/propsType";
import tool from "./config/tool.config";

import Menu from "./menu";
import Tool from "./tool";
import Work from "./work";
import Attr from "./attr";
import Info from "./info";

import { } from "./utils/draw";

const state = <IStateType>reactive({
    canvas: {
        lineX: 730,
        lineY: 430,
        width: 1008,
        height: 567,
        isLine: true,
        isDrag: false,
        isScale: true,
    },
    tool,
    nowTool: {},
    nowAttr: {},
});

// 鼠标坐标
const onMousemove = ({ clientX, clientY }: Event | any): void => {
    const { canvas } = state;
    if (!canvas.isLine) return;
    // canvas.lineX = clientX - 180;
    // canvas.lineY = clientY - 50;
    canvas.lineX = clientX + Number(canvas.width) - 1188;
    canvas.lineY = clientY + Number(canvas.height) - 618;
};
</script>

<template>
    <section class="mu-svg-editor">
        <Menu :attr="state" />
        <Tool :prop="state" />
        <Work v-bind:prop="state" :onMousemove="onMousemove" />
        <Attr :prop="state" />
        <Info :attr="state" />
    </section>
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
