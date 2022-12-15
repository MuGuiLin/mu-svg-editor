<script setup lang="ts" >
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue';
import stateType from '../types/propsType';
import scale from "../hook/scale";
import { isEmptyObj } from "../hook";
import { hookOpenSvg, hookSeveSvg } from "../hook/operate";
import { NS } from "../config";
import { getLocalFile } from '@/utils';
import Components from './components.vue';

import style from './style.module.less';

const props: any = defineProps({
    prop: Object,
    // onMousemove: Function
});

const { prop, prop: { canvas } } = props;

const rstate = ref();
const svgData: any = ref([]);
const state = reactive({
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    event: 0,
});

// 画布宽高改变，更新标尺刻度
watch(() => [canvas.width, canvas.height], (n1, n2) => {
    setTimeout(() => {
        rstate.value?.reset?.();
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

const setSegData = (e: DragEvent) => {

    // 在画布中创建组件
    const { type, name, icon, attr, event, template } = prop.nowTool, id = `${Date.now()}`, { offsetX, offsetY } = e, nowData: any = {
        id,
        type,
        attr: {
            ...JSON.parse(JSON.stringify(attr)),
            id,
            icon,
            text: name,
            x: offsetX - (attr.width / 2),
            y: offsetY - (attr.height / 2),
        },
        event,
        template,
    };
    svgData.value.push(nowData);
    try {
        prop.nowAttr = svgData.value.at(-1);
    } catch (error) {
        prop.nowAttr = svgData.value[svgData.value.length - 1];
    } finally {
        prop.nowAttr.index = svgData.value.length;
    }
    console.info('svgData', svgData)
};

// 鼠标左键在画布上按下
const onCanvasMousedown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { clientX, clientY } = e;
    state.x = clientX;
    state.y = clientY;
    state.event = 1;
    if (1 === prop.nowTool.event) {
        setSegData(e);
    };

    // 取消组件选中状态
    if (prop.nowAttr.selected) {
        prop.nowAttr.selected = null;
    }
};

// 左侧组件在画布上拖动结束
const onDrop = (e: DragEvent) => {
    // 清空左侧工具选中
    canvas.isDrag = false;

    // 未选择任何组件
    if (!Object.keys(prop.nowTool).length) {
        return false;
    };

    setSegData(e);
};

// 鼠标左键在组件上按下
const onSvgMousedown = (e: MouseEvent, o: any, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    state.event = 1;
    prop.nowAttr = o;
    prop.nowAttr.index = i;
    prop.nowAttr.selected = o.id;
    console.info(o, i, svgData);
};

// 鼠标坐标
const onMousemove = ({ clientX, clientY }: Event | any): void => {
    if (!canvas.isLine) return;
    // canvas.lineX = clientX - 180;
    // canvas.lineY = clientY - 50;
    // canvas.lineX = clientX + Number(canvas.width) - 1188;
    // canvas.lineY = clientY + Number(canvas.height) - 618;
};

// 鼠标左键在画布中的组件上移动
const mouseMoveEvent = (e: MouseEvent, o: Object, i: number) => {
    console.info(state.event, prop.nowAttr?.id, !state.event || !prop.nowAttr?.id)
    if (!state.event || !prop.nowAttr?.id) {

        return false;
    }
    const { clientX, clientY } = e;


    switch (prop.nowAttr.event) {
        // draw
        case 1:
            prop.nowAttr.attr.x2 = clientX - (state.x || 0);
            prop.nowAttr.attr.y2 = clientY - (state.y || 0);
            break;
        // drag
        case 2:
            prop.nowAttr.attr.x = clientX - 438;
            prop.nowAttr.attr.y = clientY - 220
            break;
        default:
            break;
    }
    return false;
};






// 鼠标左键在画布中的组件上抬起
const onCanvasMouseup = (e: MouseEvent, o: Object, i: number) => {
    state.event = 0;
    if (1 === prop.nowTool.event) {
        prop.nowTool = {};;
    }

    return false;
};

// 监听键盘事件
const onKeydown = (e: KeyboardEvent) => {
    if (0 > prop.nowAttr.selected || !prop.nowAttr.id) {
        return false;
    }
    try {
        const { key, ctrlKey } = e;
        switch (key) {
            // 删除组件
            case 'Delete':
                e.preventDefault();
                svgData.value.splice(prop.nowAttr.index, 1);
                prop.nowAttr = {
                    index: null,
                    selected: null,
                    attr: {}
                };
                break;
            // 组件向上移动
            case !ctrlKey && 'ArrowUp':
                e.preventDefault();
                prop.nowAttr.attr.y--;
                break;
            // 组件向下移动
            case !ctrlKey && 'ArrowDown':
                e.preventDefault();
                prop.nowAttr.attr.y++;
                break;
            // 组件向左移动
            case !ctrlKey && 'ArrowLeft':
                e.preventDefault();
                prop.nowAttr.attr.x--;
                break;
            // 组件向右移动
            case !ctrlKey && 'ArrowRight':
                e.preventDefault();
                prop.nowAttr.attr.x++;
                break;
            // 置上一层
            case ctrlKey && 'ArrowUp':
                e.preventDefault();
                alert('置上一层！');
                break;
            // 置下一层
            case ctrlKey && 'ArrowDown':
                e.preventDefault();
                alert('置下一层！');
                break;
            // 置于顶层
            case ctrlKey && 'ArrowRight':
                e.preventDefault();
                alert('置于顶层！');
                break;
            // 置于底层
            case ctrlKey && 'ArrowLeft':
                e.preventDefault();
                alert('置于底层！');
                break;
            // 打开SVG文件
            case ctrlKey && 'o':
                e.preventDefault();
                hookOpenSvg();
                break;
            // 保存为SVG文件
            case ctrlKey && 's':
                e.preventDefault();
                hookSeveSvg();
                break;
            // 剪切组件
            case ctrlKey && 'x':
                e.preventDefault();
                alert('对不起：不能剪切！');
                break;
            // 复制组件
            case ctrlKey && 'c':
                e.preventDefault();
                alert('对不起：不能复制！');
                break;
            // 粘贴组件
            case ctrlKey && 'v':
                e.preventDefault();
                alert('对不起：粘贴板是空的！');
                break;
            default:
                break;
        }
    } catch (error) {
        console.error(error);
    } finally {
    };
};

onMounted(() => {
    rstate.value = new scale({
        draw: `.${style.draw}`,
        canvas: `.${style.canvas}`,
        scale_x: `.${style.scale_x}`,
        scale_y: `.${style.scale_y}`
    });
    document.addEventListener('keydown', onKeydown, false);
});

onUnmounted(() => {
    window.onresize = null;
    document.removeEventListener('keydown', onKeydown);
});

</script>

<template>
    <main :class="style.work">
        <div :class="style.draw" @mousemove="onMousemove">
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
                @dragenter="onDragenter($event)" @dragover="onDragover($event)" @mousedown="onCanvasMousedown"
                @mousemove="mouseMoveEvent($event)" @mouseup="onCanvasMouseup($event)">

                <svg :class="style.svg" :style="{ background: canvas.background }" id="svg" :xmlns="NS.SVG"
                    :width="canvas.width" :height="canvas.height" :viewBox="`0 0 ${canvas.width} ${canvas.height}`">
                    <g v-for="(o, i) in svgData" :key="i" :class="o.id === prop.nowAttr.selected ? style.selected : ''"
                        @mousedown="onSvgMousedown($event, o, i)">
                        <!-- <KeepAlive> -->
                        <!-- <component :is='o'></component> -->
                        <component :is='o.type' :x="o.attr.x" :y="o.attr.y" :x1="o.attr.x" :y1="o.attr.y"
                            :x2="o.attr.x2" :y2="o.attr.y2" :stroke="o.attr.style.stroke"
                            :stroke-width="o.attr.style.stroke_width"
                            :href="getLocalFile(`icon/tool/${o.attr.icon}.webp`)" :width="o.attr.width"
                            :height="o.attr.height">{{ o.attr.text }}</component>

                            
                        <!-- </KeepAlive> -->
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