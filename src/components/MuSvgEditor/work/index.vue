<script setup lang="ts" >
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import stateType from '../types/propsType'
import scale from "../hook/scale";

import Components from './components.vue';

import style from './style.module.less'

const props: any = defineProps({
    prop: Object,
    onMousemove: Function
});

const { prop, prop: { canvas } } = props;

const rstate = ref();

const svgData: any = ref([]);

watch(() => [canvas.width, canvas.height], (n1, n2) => {
    console.log(666666)
    setTimeout(() => {
        rstate.value.reset();
    }, 100);
}, { immediate: true });

// 控件拖动进入画布区域
const onDragenter = (e: DragEvent) => {
    console.log('进入放置区域');
    // rightnav_open.value = false;
    e.preventDefault();
};

// 控件在画布区域拖动中
const onDragover = (e: DragEvent) => {
    e.preventDefault();
};

// 控件在画布上拖动结束
const onDrop = (e: DragEvent) => {
    // 清空左侧工具选中
    canvas.isDrag = false;

    // 未选择任何组件
    if (!Object.keys(prop.nowTool).length) {
        return false;
    };

    // 在画布中创建组件
    const { type, name, attr } = prop.nowTool, id = `${new Date().getTime()}`, nowData: any = {
        id,
        type,
        attr: {
            ...JSON.parse(JSON.stringify(attr)),
            id,
            text: name,
            x: e.offsetX,
            y: e.offsetY,
        }
    };
    svgData.value.push(nowData);
    prop.nowAttr = svgData.value.at(-1);

    console.log('svgData', svgData)
};

onMounted(() => {
    rstate.value = new scale({
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
        <div :class="style.draw" @mousemove="onMousemove($event)">

            <div :class="style.scale" v-show="canvas.isScale">
                <div :class="style.scale_x">
                    <canvas></canvas>
                </div>
                <div :class="style.scale_y">
                    <canvas></canvas>
                </div>
            </div>

            <div :class="[style.canvas, canvas.isDrag && style.dragstart]" @drop="onDrop($event)"
                @dragenter="onDragenter($event)" @dragover="onDragover($event)">

                <svg :class="style.svg" id="svg" xmlns="http://www.w3.org/2000/svg" :width="canvas.width"
                    :height="canvas.height" :viewBox="`0 0 ${canvas.width} ${canvas.height}`">
                    <g v-for="(o, i) in svgData" :key="i">
                        <!-- <component is='image' src="@/assets/icon/tool/computer.webp" width="50px"></component> -->
                        <image :x="o.attr.x - 25" :y="o.attr.y - 25" href="@/assets/icon/tool/computer.webp"
                            :width="o.attr.width" />
                    </g>
                </svg>
            </div>
            <div :class="style.subline" v-show="canvas.isLine">
                <div :class="style.subline_x" :style="[{ top: canvas.lineY + 'px' }]"></div>
                <div :class="style.subline_y" :style="[{ left: canvas.lineX + 'px' }]"></div>
            </div>

        </div>
    </main>
</template>