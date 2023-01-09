<script setup lang="ts" >
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue';
import stateType from '../types/propsType';
import scale from "../hook/scale";
import { getMousePos, getQuadrant } from "../hook";
import { hookOpenSvg, hookSeveSvg } from "../hook/operate";
import { NS } from "../config";

import Components from './components.vue';

import style from './style.module.less';

const props: any = defineProps({
    prop: Object,
});
const { prop, prop: { canvas, svgData } } = props;

const draw: any = <HTMLDivElement>ref(null);
const drop: any = <HTMLDivElement>ref(null);

const state = reactive({
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    event: 0,
    alt: false,
    ctrl: false,
    shift: false,
    backsetup: computed(() => {
        switch (canvas.backsetup) {
            case 'center':
                return {
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                }
            case 'cover':
                return {
                    'background-size': '100% 100%'
                }
            case 'contain':
                return {
                    'background-size': 'contain',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                }
            default:
                return {
                    'background-size': 'auto'
                }
                break;
        }
    })
});
const rstate = ref();

const canvasEvent = ref();

// 画布宽高改变，更新标尺刻度
watch(() => [canvas.width, canvas.height], (n1, n2) => {
    setTimeout(() => {
        rstate.value?.reset?.();
    }, 100);
}, { immediate: true });



/**
 * 鼠标左键在画布/组件上抬起
 */
const onMouseup = () => {
    state.event = 0;
    if (prop.nowTool.event) {
        prop.nowTool = {};
    }
    return false;
};

// 
/**
 * 左侧组件拖动进入画布区域
 * @param e 
 */
const onDragenter = (e: DragEvent) => {
    e.preventDefault();
};

// 左侧组件在画布区域拖动中
const onDragover = (e: DragEvent) => {
    e.preventDefault();
};

const setSegData = (e: DragEvent, x: number = 0, y: number = 0, c = 0) => {
    // 在画布中创建组件
    const { type, name, icon, attr, path, event, } = prop.nowTool, id = `${Date.now()}`, { offsetX, offsetY } = e, ox = offsetX - (attr?.style.width / 2), oy = offsetY - (attr?.style.height / 2), d = path ?? {}, nowData: any = {
        id,
        type,
        attr: {
            ...JSON.parse(JSON.stringify(attr)),
            icon,
            d: path,
            text: name,
            style: {
                ...attr.style,
                x: -attr.style.width / 2 || 0,
                y: -attr.style.height / 2 || 0,
            },
            transform: {
                x: x || ox,
                y: y || oy,
                scale: 1,
                rotate: 0,
            }
        },
        event,

    };
    svgData.push(nowData);
    try {
        prop.nowAttr = svgData.at(-1);
    } catch (error) {
        prop.nowAttr = svgData[svgData.length - 1];
    } finally {
        prop.nowAttr.index = svgData.length;
    }
    if(c) {
        onMouseup();
    }
    console.info('svgData', svgData)
};



// 鼠标左键在画布上按下
const onCanvasMousedown = (e: MouseEvent | any) => {
    e.preventDefault();
    e.stopPropagation();
    canvasEvent.value = e;
    [state.x, state.y, state.x2, state.y2] = [
        ...getMousePos(drop.value, e),
        e.offsetX, e.offsetY
    ];
    // 取消组件选中状态
    if (prop.nowAttr.selected) {
        prop.nowAttr.selected = null;
    }

    // 需要拖拽绘制的组件
    if (1 === prop.nowTool.event) {
        state.event = 1;
        setSegData(e, e.offsetX, e.offsetY);
    };
};

// 左侧组件在画布上拖动结束
const onDrop = (e: DragEvent) => {
    // 清空左侧工具选中
    canvas.showDrag = false;

    // 未选择任何组件
    if (!Object.keys(prop.nowTool).length) {
        return false;
    };

  
    // 直接渲染的组件
    setSegData(e, 0, 0, 1);
};

// 鼠标左键在组件上按下
const onSvgMousedown = (e: MouseEvent, o: any, i: number) => {
    e.preventDefault();
    e.stopPropagation();

    // 在组件上拖拽绘制
    if (prop.nowTool.event) {
        [state.x, state.y, state.x2, state.y2] = [
            ...getMousePos(drop.value, e),
            e.offsetX, e.offsetY
        ];
        // 取消组件选中状态
        if (prop.nowAttr.selected) {
            prop.nowAttr.selected = null;
        }
        state.event = 1;
        setSegData(e, e.offsetX, e.offsetY);
        return;
    };

    [state.x, state.y, state.x2, state.y2, state.event] = [
        o.attr.transform.x, o.attr.transform.y,
        e.clientX, e.clientY, 1
    ];
    prop.nowAttr = o;
    prop.nowAttr.index = i;
    prop.nowAttr.selected = o.id;
    console.info(o, i, svgData);

};

// 鼠标坐标
const onMousemove = (e: Event | any): void => {
    if (!canvas.showLine) return;
    [canvas.lineX, canvas.lineY] = getMousePos(draw.value, e);
};

const nowAttrMove = (x: number = 0, y: number = 0) => {
    prop.nowAttr.attr.transform.x = x;
    prop.nowAttr.attr.transform.y = y;

    prop.nowAttr.attr.style.x = -(prop.nowAttr.attr.style.width || prop.nowAttr.attr.style.x2 || prop.nowAttr.attr.style.rx) / 2 || 0;
    prop.nowAttr.attr.style.y = -(prop.nowAttr.attr.style.height || prop.nowAttr.attr.style.y2 || prop.nowAttr.attr.style.ry) / 2 || 0;
};

// 鼠标左键在画布中的组件上移动
const mouseMoveEvent = (e: MouseEvent) => {
    if (!state.event || !prop.nowAttr?.id) return false;
    const { clientX, clientY } = e, move = { ...state };
    move.x += clientX - move.x2;
    move.y += clientY - move.y2;

    // draw
    if (1 === prop.nowAttr.event) {
        if (prop.nowAttr.selected) {
            nowAttrMove(move.x, move.y);
            return false;
        }
        let [mx = 0, my = 0] = getMousePos(drop.value, e), [x = 0, y = 0] = [mx - state.x, my - state.y];

        switch (prop.nowAttr.type) {
            case 'line':
                [prop.nowAttr.attr.style.x2, prop.nowAttr.attr.style.y2] = state.shift ? getQuadrant(x, y) : [x, y];
                break;

            case 'rect':
                [prop.nowAttr.attr.style.width, prop.nowAttr.attr.style.height] = state.shift ? [x, x] : [x, y];
                break;

            case 'ellipse':
                [prop.nowAttr.attr.style.rx, prop.nowAttr.attr.style.ry] = state.shift ? [x, x] : [x, y];
                break;

            default:
                break;
        };
        // drag
    } else if (2 === prop.nowAttr.event) {
        if (!prop.nowAttr.selected) return;
        nowAttrMove(move.x, move.y);
    };

    return false;
};



// 键盘按下事件
const onKeydown = (e: KeyboardEvent) => {
    if (!prop.nowAttr.selected || !prop.nowAttr.id) {
        try {
            const { key, ctrlKey } = e;
            switch (key) {
                // 按下Alt键
                case 'Alt':
                    e.preventDefault();
                    state.alt = true;
                    break;
                // 按下Shift键
                case 'Shift':
                    e.preventDefault();
                    state.shift = true;
                    break;
                // 按下Ctrl键
                case 'Control':
                    e.preventDefault();
                    state.ctrl = true;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        } finally {
            return false;
        };
    };
    try {
        const { key, ctrlKey } = e;
        switch (key) {
            // 删除组件
            case 'Delete':
                e.preventDefault();
                svgData.splice(prop.nowAttr.index, 1);
                prop.nowAttr = {
                    index: null,
                    selected: null,
                    attr: {}
                };
                break;
            // 组件向上移动
            case !ctrlKey && 'ArrowUp':
                e.preventDefault();
                prop.nowAttr.attr.transform.y--;
                break;
            // 组件向下移动
            case !ctrlKey && 'ArrowDown':
                e.preventDefault();
                prop.nowAttr.attr.transform.y++;
                break;
            // 组件向左移动
            case !ctrlKey && 'ArrowLeft':
                e.preventDefault();
                prop.nowAttr.attr.transform.x--;
                break;
            // 组件向右移动
            case !ctrlKey && 'ArrowRight':
                e.preventDefault();
                prop.nowAttr.attr.transform.x++;
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

// 键盘抬起事件
const onKeyup = (e: KeyboardEvent) => {
    e.preventDefault();
    state.alt = false;
    state.ctrl = false;
    state.shift = false;
    return false;
};
onMounted(() => {
    rstate.value = new scale({
        draw: `.${style.draw}`,
        canvas: `.${style.canvas}`,
        scale_x: `.${style.scale_x}`,
        scale_y: `.${style.scale_y}`
    });
    document.addEventListener('keydown', onKeydown, false);
    document.addEventListener('keyup', onKeyup, false);
});

onUnmounted(() => {
    window.onresize = null;
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('keyup', onKeyup);
});

</script>

<template>
    <main :class="style.work">
        <div :class="style.draw" ref="draw" @mousemove="onMousemove">

            <div :class="style.scale" v-show="canvas.showScale">
                <div :class="style.scale_x">
                    <canvas></canvas>
                </div>
                <div :class="style.scale_y">
                    <canvas></canvas>
                </div>
            </div>

            <div :class="[style.canvas, canvas.showDrag && style.dragstart]" ref="drop" @drop="onDrop($event)"
                @dragenter="onDragenter($event)" @dragover="onDragover($event)" @mousedown="onCanvasMousedown"
                @mousemove="mouseMoveEvent($event)" @mouseup="onMouseup">
                <svg :class="style.svg" :style="{ background: canvas.background, ...state.backsetup }" id="svg"
                    :xmlns="NS.SVG" :width="canvas.width" :height="canvas.height"
                    :viewBox="`0 0 ${canvas.width} ${canvas.height}`">
                    <g v-for="(o, i) in svgData" :key="i" :class="o.id === prop.nowAttr.selected ? style.selected : ''"
                        @mousedown="onSvgMousedown($event, o, i)" @mouseup="onMouseup"
                        :transform="`translate(${o.attr.transform.x},${o.attr.transform.y}) rotate(${o.attr.transform.rotate}) scale(${o.attr.transform.scale})`">
                        <Components :info="o"></Components>
                    </g>
                </svg>
            </div>
            <div :class="style.subline" v-show="canvas.showLine">
                <div :class="style.subline_x" :style="[{ top: canvas.lineY + 'px' }]"></div>
                <div :class="style.subline_y" :style="[{ left: canvas.lineX + 'px' }]"></div>
            </div>

        </div>
    </main>
</template>