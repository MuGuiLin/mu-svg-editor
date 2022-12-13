<script setup lang="ts" >
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import stateType from '../types/propsType'
import scale from "../hook/scale";

import Components from './components.vue';

import style from './style.module.less'

const props: any = defineProps({
    prop: Object,
    // onMousemove: Function
});

const { prop, prop: { canvas } } = props;

const rstate = ref();

const state = reactive({
    event: 0
});

const svgData: any = ref([]);
const svgNows: any = reactive({
    index: 0,
    data: {}
});

watch(() => [canvas.width, canvas.height], (n1, n2) => {
    console.log(666666)
    setTimeout(() => {
        rstate.value.reset();
    }, 100);
}, { immediate: true });

// 左侧组件拖动进入画布区域
const onDragenter = (e: DragEvent) => {
    console.log('进入放置区域');
    // rightnav_open.value = false;
    e.preventDefault();
};

// 左侧组件在画布区域拖动中
const onDragover = (e: DragEvent) => {
    e.preventDefault();
};

// 左侧组件在画布上拖动结束
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

// 鼠标左键在画布中的组件上按下
const onMousedown = (e: MouseEvent, o: Object, i: number) => {
    e.stopPropagation();
    e.preventDefault();

    state.event = 1;
    prop.nowAttr = o;

    console.log(o, i);
    console.log(svgData)
};

// 鼠标坐标
// const onMousemove = ({ clientX, clientY }: Event | any): void => {
//     const { canvas } = props;
//     if (!canvas.isLine) return;
//     // canvas.lineX = clientX - 180;
//     // canvas.lineY = clientY - 50;
//     canvas.lineX = clientX + Number(canvas.width) - 1188;
//     canvas.lineY = clientY + Number(canvas.height) - 618;
// };

// 鼠标左键在画布中的组件上移动
const mouseMoveEvent = (e: MouseEvent, o: Object, i: number) => {
    if (state.event && prop.nowAttr.id) {
        const { clientX, clientY } = e;
        prop.nowAttr.attr.x = clientX + Number(canvas.width) - 1188;
        prop.nowAttr.attr.y = clientY + Number(canvas.height) - 618;
    }
    return false;
};

// 鼠标左键在画布中的组件上抬起
const onMouseup = (e: MouseEvent, o: Object, i: number) => {
    state.event = 0;
    return false;
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
            <!-- <div :class="style.draw"> -->

            <div :class="style.scale" v-show="canvas.isScale">
                <div :class="style.scale_x">
                    <canvas></canvas>
                </div>
                <div :class="style.scale_y">
                    <canvas></canvas>
                </div>
            </div>

            <div :class="[style.canvas, canvas.isDrag && style.dragstart]" @drop="onDrop($event)"
                @dragenter="onDragenter($event)" @dragover="onDragover($event)" @mousemove="mouseMoveEvent"
                @mouseup="onMouseup">

                <svg :class="style.svg" id="svg" xmlns="http://www.w3.org/2000/svg" :width="canvas.width"
                    :height="canvas.height" :viewBox="`0 0 ${canvas.width} ${canvas.height}`">
                    <g v-for="(o, i) in svgData" :key="i" @mousedown="onMousedown($event, o, i)">
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