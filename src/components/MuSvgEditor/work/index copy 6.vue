<script setup lang="ts" >
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue';
import { NS } from "../config";

import { getMousePos, getQuadrant, operate, scale } from "../hook";
import Components from './components.vue';

import style from './style.module.less';

const props: any = defineProps({
    prop: Object,
});
const { prop, prop: { canvas, svgData, nowTool } } = props;

const draw: any = <HTMLDivElement><unknown>ref(null);
const drop: any = <HTMLDivElement><unknown>ref(null);

const state = reactive({
    // 基于画布初始坐标x
    x: 0,
    // 基于画布初始坐标y
    y: 0,
    // 基于组件移动后的offsetX坐标
    x2: 0,
    // 基于组件移动后的offsetY坐标
    y2: 0,
    // 绘制状态
    status: 0,
    // 是否按下Alt键
    alt: false,
    // 是否按下Ctrl键
    ctrl: false,
    // 是否按下Shift键
    shift: false,
    // 画布背景显示设置
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

/**
 * 重置画布标尺刻度
 */
const rstate = ref();
watch(() => [canvas.width, canvas.height], (n1, n2) => {
    setTimeout(() => {
        rstate.value?.reset?.();
    }, 100);
}, { immediate: true });


/**
 * 显示基于世界坐标系中鼠标坐标的X和Y
 * @param{Object} e MouseEvent对象
 */
const onDrawMousemove = (e: MouseEvent): void => {
    if (!canvas.showLine) return;
    [canvas.lineX, canvas.lineY] = getMousePos(draw.value, e);
};

/**
 * 鼠标左键在画布/组件上抬起
 */
const onMouseup = (): Boolean => {
    state.status = 0;
    // 清除左侧工具状态
    if (prop.nowTool.event) {
        prop.nowTool = {};
    }
    return false;
};

/**
 * 在画布/组件上创建图形、生成SvgData数据
 * @param{object} e Event对象(MouseEvent | DragEvent)
 * @param{number} x offsetX
 * @param{number} y offsetY
 * @param{number} c 是否清除绘制状态
 */
const createSvgData = (e: MouseEvent | DragEvent, x: number = 0, y: number = 0, c: number = 0): void => {
    const { type, name, icon, attr, path, event, } = prop.nowTool,
        id = `${Date.now()}`,
        { offsetX, offsetY } = e,
        ox = offsetX - (attr?.style.width / 2),
        oy = offsetY - (attr?.style.height / 2),
        nowData: any = {
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
    // SvgData数据
    svgData.push(nowData);
    try {
        // 当前编辑状态中的组件(图形)
        prop.nowAttr = svgData.at(-1);
    } catch (error) {
        prop.nowAttr = svgData[svgData.length - 1];
    } finally {
        // 当前编辑状态中的组件(图形)索引
        prop.nowAttr.index = svgData.length;
        // 清除编辑状态
        c && onMouseup();
    }
    console.info('svgData', svgData)
};

/**
 * 删除Svg组件
 * @param{number} i 组件索引
 */
const removeSvgData = (i?: number): void => {
    svgData.splice(prop.nowAttr.index, 1);
    prop.nowAttr = {
        index: null,
        selected: null,
        attr: {}
    };
};

/**
 * 设置当前组件坐标
 * @param{number} x 组件x坐标 
 * @param{number} y 组件x坐标 
 */
const setNowCoordinate = (x: number = 0, y: number = 0) => {
    prop.nowAttr.attr.transform.x = x;
    prop.nowAttr.attr.transform.y = y;

    prop.nowAttr.attr.style.x = -(
        prop.nowAttr.attr.style.width ||
        prop.nowAttr.attr.style.x2 ||
        prop.nowAttr.attr.style.rx) / 2 || 0;

    prop.nowAttr.attr.style.y = -(
        prop.nowAttr.attr.style.height ||
        prop.nowAttr.attr.style.y2 ||
        prop.nowAttr.attr.style.ry) / 2 || 0;
};

/**
 * 左侧组件拖拽进入画布区域
 * @param{object} e DragEvent对象
 */
const onDragenter = (e: DragEvent): void => {
    e.preventDefault();
};

/**
 * 左侧组件在画布区域中拖拽
 * @param{object} e DragEvent对象
 */
const onDragover = (e: DragEvent): void => {
    e.preventDefault();
};

/**
 * 左侧组件在画布上拖拽结束
 * @param{object} e DragEvent对象
 */
const onDrop = (e: DragEvent): void | Boolean => {
    // 清空左侧工具选中
    canvas.showDrag = false;

    // 未选择任何组件
    if (!Object.keys(prop.nowTool).length) {
        return false;
    };

    // 渲染拖拽组件（无需拖拽绘制的组件）
    createSvgData(e, 0, 0, 1);
};

/**
 * 鼠标左键在Canvas画布上按下时
 * @param{object} e MouseEvent对象
 */
const onCanvasMousedown = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    // 记录初始坐标信息
    [state.x, state.y, state.x2, state.y2] = [
        ...getMousePos(drop.value, e),
        e.offsetX, e.offsetY
    ];

    // 取消组件选中状态
    if (prop.nowAttr.selected) {
        prop.nowAttr.selected = null;
    }

    // 渲染组件（需要拖拽绘制的组件）
    if (1 === prop.nowTool.event) {
        state.status = 1;
        createSvgData(e, e.offsetX, e.offsetY);
    };
};

/**
 * 鼠标左键在Svg组件上按下时
 * @param{object} e MouseEvent对象
 * @param{object} o 当前组件项
 * @param{number} i 当前组件索引
 */
const onSvgMousedown = (e: MouseEvent, o: any, i: number): void | Boolean => {
    e.preventDefault();
    e.stopPropagation();

    // 如果是在组件上拖拽绘制组件时
    if (prop.nowTool.event) {
        // 记录初始坐标信息
        [state.x, state.y, state.x2, state.y2] = [
            ...getMousePos(drop.value, e),
            e.offsetX, e.offsetY
        ];

        // 取消组件选中状态
        if (prop.nowAttr.selected) {
            prop.nowAttr.selected = null;
        }

        // 渲染组件（需要拖拽绘制的组件）
        state.status = 1;
        createSvgData(e, e.offsetX, e.offsetY);
        return false;
    };

    // 否则就记录初始坐标信息
    [state.x, state.y, state.x2, state.y2, state.status] = [
        o.attr.transform.x, o.attr.transform.y,
        e.clientX, e.clientY, 1
    ];

    // 并激活当前被点击的组件
    prop.nowAttr = o;
    prop.nowAttr.index = i;
    // 将当前组件设为选中状态
    prop.nowAttr.selected = o.id;
};

/**
 * 鼠标左键在按下之后，在画布上移动时
 * @param{object} e MouseEvent对象
 */
const onCanvasMousemove = (e: MouseEvent) => {
    if (!state.status || !prop.nowAttr?.id) return false;
    // 获取当前鼠标移动的坐标信息，获取之前记录的初始坐标信息
    const { clientX, clientY } = e, move = { ...state };

    //计算当前组件在画布上移动的坐标信息
    move.x += clientX - move.x2;
    move.y += clientY - move.y2;

    // draw（需要拖拽绘制的组件）
    if (1 === prop.nowAttr.event) {
        if (prop.nowAttr.selected) {
            setNowCoordinate(move.x, move.y);
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
        // drag（无需拖拽绘制的组件）
    } else if (2 === prop.nowAttr.event) {
        if (!prop.nowAttr.selected) return;
        setNowCoordinate(move.x, move.y);
    };

    return false;
};

/**
 * 当按下键盘上的按键时，收集按键信息
 * @param{object} e KeyboardEvent对象
 */
const onKeydown = (e: KeyboardEvent) => {
    if (!prop.nowAttr.selected || !prop.nowAttr.id) {
        try {
            switch (e.key) {
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

    /**
     * 相关操作的快捷键设置
     */
    try {
        const { key, ctrlKey } = e;
        switch (key) {
            // 删除组件
            case 'Delete':
                e.preventDefault();
                removeSvgData();
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
                operate.hookOpenSvg();
                break;
            // 保存为SVG文件
            case ctrlKey && 's':
                e.preventDefault();
                operate.hookExportSvg();
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

/**
 * 当从键盘的按键上抬起时，清除之前收集的按键信息
 * @param{object} e KeyboardEvent对象
 */
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
        <div :class="style.draw" ref="draw" @mousemove="onDrawMousemove">

            <div :class="style.scale" v-show="canvas.showScale">
                <div :class="style.scale_x">
                    <canvas></canvas>
                </div>
                <div :class="style.scale_y">
                    <canvas></canvas>
                </div>
            </div>

            <div ref="drop" :class="[style.canvas, canvas.showDrag && style.dragstart]" @dragenter="onDragenter"
                @dragover="onDragover" @drop="onDrop" @mousedown="onCanvasMousedown" @mousemove="onCanvasMousemove"
                @mouseup="onMouseup">
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
