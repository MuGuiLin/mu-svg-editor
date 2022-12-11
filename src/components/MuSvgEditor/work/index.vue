<script setup lang="ts" >
import { reactive, watch, onMounted, onUnmounted } from 'vue';
import { Iprops } from '../types/props'
import scale from "../hook/scale";

import style from './style.module.less'
import Components from './components.vue';


const props: any = defineProps({
    attr: {},
    mousemove: Function
});

const { attr }: any = props;

const state: Iprops = reactive({
    scale: null,
});

const svgData: any = reactive([]);

watch(() => [props.attr.width, props.attr.height], (n1, n2) => {
    setTimeout(() => {
        state.scale.reset();
    }, 100);
}, { immediate: true });

// 控件拖动进入画布区域
const ondragenter = (e: DragEvent) => {
    console.log('进入放置区域');
    // rightnav_open.value = false;
    e.preventDefault();
};

// 控件在画布区域拖动中
const ondragover = (e: DragEvent) => {
    e.preventDefault();
};

// 控件在画布上拖动结束
const ondrop = (e: DragEvent) => {
    props.attr.dragstart = false;

    // 未选择任何组件
    if (!Object.keys(props.attr.nowTool).length) {
        return false;
    }
    const { type, name, attr } = props.attr.nowTool;
    console.log(props.attr.nowTool)
    attr.x = e.offsetX;
    attr.y = e.offsetY;

    //在鼠标位置创建当前组件
    const ctrl: any = {
        id: `${new Date().getTime()}`,
        type,
        name,
        svgPositionX: e.offsetX,
        svgPositionY: e.offsetY,
        angle: 0,
        size: 1,
        attr: JSON.parse(JSON.stringify(attr))
    }
    svgData.push(ctrl);
    console.log('svgData', svgData)

    props.attr.nowAttr = ctrl;

    //清空左侧工具选中
    // select_lefttool.value = {};

};

onMounted(() => {
    state.scale = new scale({
        draw: `.${style.draw}`,
        canvas: `.${style.canvas}`,
        scale_x: `.${style.scale_x}`,
        scale_y: `.${style.scale_y}`
    });
});

onUnmounted(() => {
    window.onresize = null;
});



</script>

<template>
    <main :class="style.work">
        <div :class="style.draw" @mousemove="mousemove($event)">

            <div :class="style.scale" v-show="attr.isScale">
                <div :class="style.scale_x">
                    <canvas></canvas>
                </div>
                <div :class="style.scale_y">
                    <canvas></canvas>
                </div>
            </div>

            <div :class="[style.canvas, attr.dragstart && style.dragstart]" @drop="ondrop($event)"
                @dragenter="ondragenter($event)" @dragover="ondragover($event)">
        
                <svg :class="style.svg" id="svg" xmlns="http://www.w3.org/2000/svg" :width="attr.width"
                    :height="attr.height" :viewBox="`0 0 ${attr.width} ${attr.height}`">
                    <g v-for="(o, i) in svgData" >
                        <!-- <component is='image' src="@/assets/icon/tool/computer.webp" width="50px"></component> -->
                        <image :x="o.attr.x-25" :y="o.attr.y-25" href="@/assets/icon/tool/computer.webp" :width="o.attr.width"  />
                    </g>
                </svg>
            </div>
            <div :class="style.subline" v-show="attr.isLine">
                <div :class="style.subline_x" :style="[{ top: attr.lineY + 'px' }]"></div>
                <div :class="style.subline_y" :style="[{ left: attr.lineX + 'px' }]"></div>
            </div>

        </div>
    </main>
</template>