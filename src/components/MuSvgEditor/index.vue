<script setup lang="ts">
import { reactive } from 'vue';
import tool from './config/tool';
import {} from './utils/draw';

import { Iprops } from './types/props'

import Menu from './menu';
import Tool from './tool';
import Work from './work';
import Attr from './attr';
import Info from './info';

const state = <Iprops>reactive({
    width: 1008,
    height: 567,
    isLine: true,
    isScale: true,
    lineX: 730,
    lineY: 430,
    tool
});

const mousemove = ({ clientX, clientY }: Event | any) => {
    if (!state.isLine) return;
    // state.lineX = clientX - 180;
    // state.lineY = clientY - 50;
    state.lineX = clientX + Number(state.width) - 1188;
    state.lineY = clientY + Number(state.height) - 618;
};

</script>

<template>
    <section class="mu-svg-editor">
        <Menu :attr="state" />
        <Tool :attr="state" />
        <Work v-bind:attr="state" :mousemove="mousemove" />
        <Attr :attr="state" />
        <Info :attr="state" />
    </section>
</template>

<style scoped lang="less">
.mu-svg-editor {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: radial-gradient(#0229A0 -150%, rgb(30, 30, 30) 100%);
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