import { IAttrParops } from '../types/attrType';
import { IToolProps } from '../types/toolType';

export const attr: IAttrParops = {
    text: '',
    icon: '',
    class: '',
    style: {
        fill: '#FFFFFF',
        fill_opacity: 1,
        stroke: '#166FFF',
        stroke_width: 1,
        stroke_dasharray: 0,
        stroke_opacity: 1,
    },
    transform: {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
    },
    hidden: true,
};

const dragAttr = {
    ...attr,
    style: {
        ...attr.style,
        width: 50,
        height: 50,
    }
};

export const draw: IToolProps = {
    title: '基本绘制',
    child: [
        {
            type: 'select',
            name: '选择',
            icon: 'send-outlined',
            // path: 'M18 20.76l-2.94 1.5-3.68-6-4.41 3V1.24l12.5 12.01-4.41 1.5 2.94 6z',
            path: 'M13 3 l27 20 l-8 6 l8 14 l-6 4 l-7 -14 l-10 8 Z',
            attr: {},
            event: 1,
        },
        {
            type: 'line',
            name: '直线',
            tips: '按住"Ctrl"键绘制水平或垂直线条！',
            path: 'M4 20 L46 20 L46 30 L4 30 Z',
            icon: 'line-outlined',
            attr: {
                ...attr,
                style: {
                    ...attr.style,
                    // x1: 0,
                    // y1: 0,
                    x: 0,
                    y: 0,
                    x2: 50,
                    y2: 50,
                    stroke_width: 2,
                    stroke_linecap: 'butt',
                },
            },
            event: 1,
        },
        {
            type: 'polyline',
            name: '曲线',
            path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
            icon: 'stock-outlined',
            attr: {
                ...attr,
                points: '',
                stroke_linecap: 'butt',
            },
            event: 1,
        },
        {
            type: 'rect',
            name: '矩形',
            tips: '按住"Ctrl"键绘制正方形！',
            icon: 'border-outlined',
            path: 'M6 8 L44 8 L44 42 L6 42 Z',
            attr: {
                ...attr,
                style: {
                    ...attr.style,
                    x: 0,
                    y: 0,
                    width: 50,
                    height: 50,
                },
            },
            event: 1,
        },
        {
            // type: 'circle', 
            type: 'ellipse',
            name: '圆形',
            tips: '按住"Ctrl"键绘制正圆形！',
            icon: 'loading3-quarters-outlined',
            path: 'M5 5 m20 0 a 20 20 0 1 0 1 0 Z',
            attr: {
                ...attr,
                style: {
                    ...attr.style,
                    cx: 0,
                    cy: 0,
                    // r: 50,
                    rx: 50,
                    ry: 50,
                },
            },
            event: 1,
        },
        {
            type: 'path',
            name: '路径',
            icon: 'node-index-outlined',
            path: 'M11.5 1.9c0-.36.86 0 .86 0V14a1.3 1.3 0 10.88 0V1.9s.87-.36.87 0c0 6.81 5.22 11.68 5.22 11.68l-3.25 8.2h-6.55l-3.26-8.2s5.22-4.87 5.22-11.68zM7 24.5v-2h11.32v2z',
            attr: {
                ...attr,
                d: '',
                stroke_linecap: 'butt',
            },
            event: 1,
        },
        {
            type: 'text',
            name: '文本',
            icon: 'font-size-outlined',
            path: 'M8 8 h35 v8 h-13 v27 h-8 v-27 h-14 Z',
            attr: {
                ...attr,
                style: {
                    ...attr.style,
                    x: 0,
                    y: 0,
                    fill: '#166FFF',
                    stroke_width: 0,
                    text_anchor: 'middle',
                    dominant_baseline: 'auto'
                }
            },
            event: 1,
            // template: '<text x="0" y="0" :fill="attr.style.fill">{{attr.text}}</text>'
            // template: {
            //     template: '<text x="0" y="0" fill="red">文本文本文本</text>'
            // },
            template: '<text x="0" y="0" fill="red">文本文本文本</text>',
        },
        {
            type: 'color',
            name: '吸管',
            icon: 'bg-colors-outlined',
            path: 'M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z',
            attr: {
                ...attr,
            },
            event: 1,
        },
    ],
    forEach: function (arg0: (o: any) => any) {
        throw new Error('Function not implemented.');
    },
    filter: function (arg0: (o: any) => boolean) {
        throw new Error('Function not implemented.');
    }
};

export const shape = {
    title: '基本形状',
    child: [
        {
            type: 'path',
            name: '几何',
            icon: '',
            path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '星形',
                    icon: '',
                    path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
                {
                    type: 'path',
                    name: '三角形',
                    icon: '',
                    path: 'M2.47,44.11 L25.04,5.49 L47.61,44.11 L2.47,44.11 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
                {
                    type: 'path',
                    name: '直三角形',
                    icon: '',
                    path: 'M3.59,46.31 L3.59,3.31 L46.59,46.31 L3.59,46.31 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
                {
                    type: 'path',
                    name: '菱形',
                    icon: '',
                    path: 'M2.63,25.34 L24.63,3.34 L46.63,25.34 L24.63,47.34 L2.63,25.34 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
                {
                    type: 'path',
                    name: '五边形',
                    icon: '',
                    path: 'M3.60,20.22 L25.100605930486314,4.58 L46.60,20.22 L38.38,45.53 L11.81,45.53 L3.60,20.22 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
                {
                    type: 'path',
                    name: '六边形',
                    icon: '',
                    path: 'M2.86,25.23 L12.40,6.16 L37.82,6.16 L47.36,25.23 L37.82,44.30 L12.40,44.30 L2.86,25.23 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '物体',
            icon: '',
            path: 'M31.41,6.53 C30.36,9.11 27.84,10.94 24.89,10.94 C21.93,10.94 19.41,9.11 18.36,6.53 L2.39,13.31 L6.88,23.90 L11.82,21.81 L11.82,43.40 L38.13,43.40 L38.13,21.88 L42.89,23.90 L47.39,13.31 L31.41,6.53 L31.41,6.53 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '衣物',
                    icon: '',
                    path: 'M31.41,6.53 C30.36,9.11 27.84,10.94 24.89,10.94 C21.93,10.94 19.41,9.11 18.36,6.53 L2.39,13.31 L6.88,23.90 L11.82,21.81 L11.82,43.40 L38.13,43.40 L38.13,21.88 L42.89,23.90 L47.39,13.31 L31.41,6.53 L31.41,6.53 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '箭头',
            icon: '',
            path: 'M23.15,36.77 L30.41,29.49 L16.38,29.49 L2.36,29.49 L2.36,24.99 L2.36,20.48 L16.22,20.48 C23.85,20.48 30.09,20.25 30.09,19.97 C30.09,19.69 27.05,16.42 23.34,12.69 L16.59,5.92 L22.83,5.92 L29.06,5.92 L38.59,15.46 L48.11,25.00 L38.57,34.53 L29.03,44.05 L22.46,44.05 L15.90,44.05 L23.15,36.77 L23.15,36.77 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '向右',
                    icon: '',
                    path: 'M23.15,36.77 L30.41,29.49 L16.38,29.49 L2.36,29.49 L2.36,24.99 L2.36,20.48 L16.22,20.48 C23.85,20.48 30.09,20.25 30.09,19.97 C30.09,19.69 27.05,16.42 23.34,12.69 L16.59,5.92 L22.83,5.92 L29.06,5.92 L38.59,15.46 L48.11,25.00 L38.57,34.53 L29.03,44.05 L22.46,44.05 L15.90,44.05 L23.15,36.77 L23.15,36.77 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '标志',
            icon: '',
            path: 'M30.05,17.37 L25.15,16.50 L26.96,15.56 C27.95,15.04 28.85,14.54 28.95,14.45 C29.22,14.21 25.90,9.08 25.49,9.09 C25.30,9.09 24.03,11.08 22.65,13.50 C21.27,15.94 19.89,17.81 19.56,17.67 C15.69,16.11 12.53,14.53 12.538,14.15 C12.53,13.89 13.75,11.61 15.23,9.07 L17.93,4.45 L25.296,4.45 L32.65,4.45 L34.57,7.49 L36.49,10.52 L38.50,9.50 C39.88,8.78 40.41,8.68 40.22,9.167 C38.51,13.40 35.96,18.35 35.51,18.30 C35.20,18.26 32.74,17.85 30.05,17.37 L30.05,17.37 zM7.22,36.28 C5.36,33.08 3.69,30.07 3.51,29.61 C3.33,29.13 3.86,27.44 4.73,25.71 L6.28,22.66 L4.70,21.73 C2.60,20.49 3.38,20.10 8.95,19.65 L13.35,19.28 L15.07,23.84 C16.02,26.35 16.92,28.73 17.07,29.12 C17.22,29.54 16.48,29.26 15.33,28.48 L13.32,27.11 L11.92,29.82 C11.15,31.31 10.51,32.69 10.500,32.89 C10.48,33.100 12.85,33.33 15.756,33.41 L21.03,33.55 L21.38,37.42 C21.57,39.54 21.68,41.31 21.63,41.34 C21.59,41.38 19.09,41.57 16.08,41.76 L10.61,42.11 L7.22,36.28 L7.22,36.28 zM28.07,41.95 C24.87,37.12 24.81,37.48 29.57,32.27 L32.62,28.92 L32.29,31.37 L31.97,33.81 L35.39,33.81 C37.27,33.81 38.81,33.66 38.81,33.48 C38.81,33.29 37.76,31.23 36.49,28.89 C35.21,26.57 34.17,24.44 34.18,24.20 C34.19,23.66 40.88,19.23 41.19,19.54 C41.32,19.67 42.56,21.91 43.95,24.53 L46.48,29.28 L43.08,34.77 C41.21,37.78 39.41,40.55 39.08,40.91 C38.76,41.27 36.93,41.70 35.03,41.88 C31.40,42.22 31.50,42.14 30.97,45.24 C30.88,45.78 29.79,44.55 28.07,41.95 L28.07,41.95 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '回收利用',
                    icon: '',
                    path: 'M30.05,17.37 L25.15,16.50 L26.96,15.56 C27.95,15.04 28.85,14.54 28.95,14.45 C29.22,14.21 25.90,9.08 25.49,9.09 C25.30,9.09 24.03,11.08 22.65,13.50 C21.27,15.94 19.89,17.81 19.56,17.67 C15.69,16.11 12.53,14.53 12.538,14.15 C12.53,13.89 13.75,11.61 15.23,9.07 L17.93,4.45 L25.296,4.45 L32.65,4.45 L34.57,7.49 L36.49,10.52 L38.50,9.50 C39.88,8.78 40.41,8.68 40.22,9.167 C38.51,13.40 35.96,18.35 35.51,18.30 C35.20,18.26 32.74,17.85 30.05,17.37 L30.05,17.37 zM7.22,36.28 C5.36,33.08 3.69,30.07 3.51,29.61 C3.33,29.13 3.86,27.44 4.73,25.71 L6.28,22.66 L4.70,21.73 C2.60,20.49 3.38,20.10 8.95,19.65 L13.35,19.28 L15.07,23.84 C16.02,26.35 16.92,28.73 17.07,29.12 C17.22,29.54 16.48,29.26 15.33,28.48 L13.32,27.11 L11.92,29.82 C11.15,31.31 10.51,32.69 10.500,32.89 C10.48,33.100 12.85,33.33 15.756,33.41 L21.03,33.55 L21.38,37.42 C21.57,39.54 21.68,41.31 21.63,41.34 C21.59,41.38 19.09,41.57 16.08,41.76 L10.61,42.11 L7.22,36.28 L7.22,36.28 zM28.07,41.95 C24.87,37.12 24.81,37.48 29.57,32.27 L32.62,28.92 L32.29,31.37 L31.97,33.81 L35.39,33.81 C37.27,33.81 38.81,33.66 38.81,33.48 C38.81,33.29 37.76,31.23 36.49,28.89 C35.21,26.57 34.17,24.44 34.18,24.20 C34.19,23.66 40.88,19.23 41.19,19.54 C41.32,19.67 42.56,21.91 43.95,24.53 L46.48,29.28 L43.08,34.77 C41.21,37.78 39.41,40.55 39.08,40.91 C38.76,41.27 36.93,41.70 35.03,41.88 C31.40,42.22 31.50,42.14 30.97,45.24 C30.88,45.78 29.79,44.55 28.07,41.95 L28.07,41.95 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '棋牌',
            icon: '',
            path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '三角形',
                    icon: '',
                    path: 'M2.47,44.11 L25.04,5.49 L47.61,44.11 L2.47,44.11 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '音乐',
            icon: '',
            path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '三角形',
                    icon: '',
                    path: 'M2.47,44.11 L25.04,5.49 L47.61,44.11 L2.47,44.11 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '流程图',
            icon: '',
            path: 'M4.75,10.26 C18.32,-5.71 31.90,26.24 45.47,10.26 L45.47,39.03 C31.90,55.01 18.32,23.05 4.75,39.03 L4.75,10.26 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '波浪框',
                    icon: '',
                    path: 'M4.75,10.26 C18.32,-5.71 31.90,26.24 45.47,10.26 L45.47,39.03 C31.90,55.01 18.32,23.05 4.75,39.03 L4.75,10.26 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '对话框',
            icon: '',
            path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '三角形',
                    icon: '',
                    path: 'M2.47,44.11 L25.04,5.49 L47.61,44.11 L2.47,44.11 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '天气时间',
            icon: '',
            path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '三角形',
                    icon: '',
                    path: 'M2.47,44.11 L25.04,5.49 L47.61,44.11 L2.47,44.11 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
        {
            type: 'path',
            name: '交互界面',
            icon: '',
            path: 'M2.44,19.51 L19.24,19.51 L24.44,3.55 L29.63,19.51 L46.44,19.51 L32.84,29.38 L38.03,45.35 L24.44,35.48 L10.84,45.35 L16.03,29.38 L2.44,19.51 z',
            attr: {
                ...dragAttr,
            },
            event: 2,
            child: [
                {
                    type: 'path',
                    name: '三角形',
                    icon: '',
                    path: 'M2.47,44.11 L25.04,5.49 L47.61,44.11 L2.47,44.11 z',
                    attr: {
                        ...dragAttr,
                    },
                    event: 2,
                },
            ],
        },
    ],
};

export const topo: IToolProps = {
    title: '拓扑组件',
    child: [
        {
            type: 'image',
            name: '互联网',
            icon: 'internet',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
            // template: '<image href="icon/tool/internet.webp" width="50" height="50"></image>',
            // props: [
            //     'props_attr'
            // ],
        },
        {
            type: 'image',
            name: '访问人',
            icon: 'visitor',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: 'PC端',
            icon: 'computer',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '移动端',
            icon: 'phone',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '交换机',
            icon: 'switch',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '核心交换机',
            icon: 'core-switch',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '防火墙',
            icon: 'firewall',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '流量监控',
            icon: 'flow-monitor',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '服务器',
            icon: 'server',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '虚拟机',
            icon: 'virtual-machine',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '负载均衡',
            icon: 'load-balancing',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '信号链路',
            icon: 'signal-link',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '系统',
            icon: 'system',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '传统设备',
            icon: 'tradition-device',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '插头',
            icon: 'plug',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '电池',
            icon: 'battery',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '服务',
            icon: 'serve',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '数据库',
            icon: 'data-base',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '缓存',
            icon: 'redis',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '存储',
            icon: 'storage',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '信号流',
            icon: 'signal-flow',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '集群',
            icon: 'colony',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '单体',
            icon: 'monomer',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
        {
            type: 'image',
            name: '冗余组',
            icon: 'redundancy-group',
            path: '',
            attr: {
                ...dragAttr,
            },
            event: 2,
        },
    ],
    forEach: function (arg0: (o: any) => any) {
        throw new Error('Function not implemented.');
    },
    filter: function (arg0: (o: any) => boolean) {
        throw new Error('Function not implemented.');
    }
};

export default [
    draw,
    shape,
    topo,
    {
        title: '其他控件',
        child: [

        ],
    },
];