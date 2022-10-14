<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue';

import Attr from './attr';

import scale from "./hook/scale";

interface IState {
    width: number;
    height: number;
    scale: any;
    isLine: boolean;
    isScale: boolean;
    lineX: number;
    lineY: number;
    activeKey: string;
};

const state = <IState>reactive({
    width: 1008,
    height: 567,
    // width: 1920,
    // height: 1080,
    isLine: true,
    isScale: true,
    lineX: 100,
    lineY: 100,
    scale: null,
    activeKey: '1',
});

const resize = ({ target }: Event | any) => {
    if ('width' === target.name) {
        state.width = target.value;
    } else if ('height' === target.name) {
        state.height = target.value;
    }
    setTimeout(() => {
        state.scale.reset();
    }, 300);
};

const mousemove = ({ clientX, clientY }: Event | any) => {
    if (state.isLine) {
        state.lineX = clientX - 180;
        state.lineY = clientY - 50;
    } else {
        return false;
    }
}


onMounted(() => {
    state.scale = new scale({
        draw: '.mu-svg-editor-work-draw',
        canvas: '.mu-svg-canvas',
        scale_x: '.mu-svg-scale-x',
        scale_y: '.mu-svg-scale-y'
    });
});

onUnmounted(() => {
    window.onresize = null;
});

</script>

<template>
    <section class="mu-svg-editor">
        <header class="mu-svg-editor-menu">
            <label>
                显示标尺：
                <a-switch v-model:checked="state.isScale" checked-children="开启" un-checked-children="关闭" />
            </label>，
            <label>
                坐标辅助：
                <a-switch v-model:checked="state.isLine" checked-children="开启" un-checked-children="关闭" />
            </label>
        </header>

        <aside class="mu-svg-editor-tool">
            <h3>基础控件</h3>
        </aside>
        <main class="mu-svg-editor-work">
            <div class="mu-svg-editor-work-draw" @mousemove="mousemove">
                <div class="mu-svg-scale" v-show="state.isScale">
                    <div class="mu-svg-scale-x-box">
                        <canvas class="mu-svg-scale-x"></canvas>
                    </div>
                    <div class="mu-svg-scale-y-box">
                        <canvas class="mu-svg-scale-y"></canvas>
                    </div>
                </div>
                <div class="mu-svg-canvas">
                    <svg id="svg" xmlns="http://www.w3.org/2000/svg" :width="state.width" :height="state.height"
                        :viewBox="`0 0 ${state.width} ${state.height}`"></svg>
                </div>
                <div class="mu-svg-subline" v-show="state.isLine">
                    <div class="mu-svg-subline-x" :style="{top: state.lineY + 'px'}"></div>
                    <div class="mu-svg-subline-y" :style="{left: state.lineX + 'px'}"></div>
                </div>
            </div>
        </main>
        <Attr/>
        <footer class="mu-svg-editor-info">
            <p>坐标信息 X：<b>{{state.lineX}}</b> px，Y：<b>{{state.lineY}}</b> px</p>
        </footer>

    </section>
</template>

<style scoped lang="less">
.mu-svg-editor {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: radial-gradient(#250058 -100%, rgb(30, 30, 30) 100%);
    overflow: hidden;
    box-sizing: border-box;
    display: grid;
    grid-gap: 0;
    grid-template-rows: 50px calc(100vh - 80px) 30px;
    grid-template-columns: 180px 1fr 280px;
    grid-template-areas: "menu menu menu" "tool work attr" "tool info info";

    &-menu {
        grid-area: menu;
        background-color: rgb(60, 60, 60);
        border-bottom: 1px solid rgb(100, 100, 100);
        line-height: 50px;
    }


    &-tool {
        grid-area: tool;
        background-color: rgb(45, 45, 45);
        border-right: 1px solid rgb(100, 100, 100);
    }

    &-work {
        grid-area: work;
        box-sizing: border-box;
        display: flex;
        overflow: hidden;

        &-draw {
            box-sizing: border-box;
            position: relative;
            flex: 1;
            overflow: auto;
            cursor: crosshair;

            .mu-svg-scale {
                position: relative;
                z-index: 1;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 18px;
                    height: 18px;
                    background: rgb(70, 70, 70);
                    box-shadow: 2px 6px 12px 4px rgba(30, 30, 30, .6);
                }

                &-x-box {
                    position: sticky;
                    top: 0;
                    left: 0;
                    // width: 100%;
                    height: 18px;
                    background: rgb(80, 80, 80);

                    &>canvas {
                        background: rgb(80, 80, 80);
                        box-shadow: 0px 2px 6px 0px rgba(30, 30, 30, .6);
                    }
                }

                &-y-box {
                    position: sticky;
                    top: 0;
                    left: 0;
                    width: 18px;
                    // height: 100%;
                    background: rgb(80, 80, 80);

                    &>canvas {
                        position: relative;
                        top: -17px;
                        background: rgb(80, 80, 80);
                        box-shadow: 2px 0px 6px 0px rgba(30, 30, 30, .6);
                    }
                }
            }

            .mu-svg-canvas {
                box-sizing: border-box;
                position: absolute;
                top: 50%;
                left: 50%;
                background-image: url(data:image/png;base64,R0lGODlhEAAQAIAAAP///9bW1iH5BAAAAAAALAAAAAAQABAAAAIfjG+gq4jM3IFLJgpswNly/XkcBpIiVaInlLJr9FZWAQA7);
                transform: translate(-50%, -50%);

                #svg {
                    transition: all 500ms cubic-bezier(0.16, 0.66, 0.28, 0.96);
                }
            }

            .mu-svg-subline {
                user-select: none;

                &>div {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: blueviolet;
                }

                &-x {
                    top: 0;
                    height: 1px;
                    background-image: linear-gradient(to right, blueviolet, deepskyblue);
                }

                &-y {
                    left: 0;
                    width: 1px;
                    background-image: linear-gradient(deeppink, deepskyblue);
                }
            }
        }
    }

    &-attr {
        grid-area: attr;
        background-color: rgb(80, 80, 80);
        border-left: 1px solid rgb(100, 100, 100);
        box-shadow: -2px 0px 6px 0px rgba(30, 30, 30, .6);
        padding: 0 10px;
    }

    &-info {
        grid-area: info;
        background: rgb(60, 60, 60);
        border-top: 1px solid rgb(100, 100, 100);

        p {
            line-height: 28px;
            text-align: center;
        }
    }
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