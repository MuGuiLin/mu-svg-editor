import { IAttrParops } from '../types/attrType';
import { IToolProps } from '../types/toolType';

export const attr: IAttrParops = {
    id: '',
    text: '',
    status: 1,
    type: '',
    x: 0,
    y: 0,
    r: 0,
    x2: 0,
    y2: 0,
    cx: 0,
    cy: 0,
    width: 50,
    height: 50,
    icon: '',
    path: '',
    filter: '',
    points: '',
    class: '',
    scale: 0,
    style: {
        fill: '',
        stroke: '#00FFFF',
        stroke_width: 1,
        opacity: 1,
        font_size: 12,
        text_anchor: 'start',
        stroke_dasharray: '',
    },
    transform: '',
    is_show: true,
};

export const draw: IToolProps = {
    title: '基本绘制',
    child: [
        {
            type: 'select',
            name: '选择',
            icon: 'send-outlined',
            path: 'M17.15 20.76l-2.94 1.5-3.68-6-4.41 3V1.24l12.5 12.01-4.41 1.5 2.94 6z',
            attr: {
                ...attr
            },
            ctrl: '',
            event: 1,
            select: true,
            template: ''
        },
        {
            type: 'line',
            name: '直线',
            path: 'M 2 10 L 23 10 L 23 15 L 2 15 Z',
            icon: 'line-outlined',
            attr: {
                ...attr
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
        {
            type: 'line',
            name: '曲线',
            path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
            icon: 'stock-outlined',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
        {
            type: 'rect',
            name: '矩形',
            icon: 'border-outlined',
            path: 'M 3 4 L 3 21 L 22 21 L 22 4 L 0 4 Z',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
        {
            type: 'circle',
            name: '圆形',
            icon: 'loading3-quarters-outlined',
            path: 'M27,0H0v27h27 M13.25,7.617c6.742,0,12.207,3.846,12.207,8.59c0,4.745-5.465,8.591-12.207,8.591 S1.042,20.952,1.042,16.207C1.042,11.463,6.508,7.617,13.25,7.617z',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
        {
            type: 'path',
            name: '路径',
            icon: 'node-index-outlined',
            path: 'M12.2 1.9c0-.36.86 0 .86 0V14a1.3 1.3 0 10.88 0V1.9s.87-.36.87 0c0 6.81 5.22 11.68 5.22 11.68l-3.25 8.2h-6.55l-3.26-8.2s5.22-4.87 5.22-11.68zM7.83 25.26v-2.61h11.32v2.6H7.84z',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
        {
            type: 'text',
            name: '文本',
            icon: 'font-size-outlined',
            path: 'M5 4v3h5.5v12h3V7H19V4z',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
        {
            type: 'color',
            name: '填充',
            icon: 'bg-colors-outlined',
            path: 'M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 1,
            select: false,
            template: ''
        },
    ],
    forEach: function (arg0: (o: any) => any) {
        throw new Error('Function not implemented.');
    },
    filter: function (arg0: (o: any) => boolean) {
        throw new Error('Function not implemented.');
    }
};

export const topo: IToolProps = {
    title: '拓扑组件',
    child: [
        {
            type: 'internet',
            name: '互联网',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'visitor',
            name: '访问人',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'computer',
            name: 'PC端',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'phone',
            name: '移动端',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'switch',
            name: '交换机',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'core-switch',
            name: '核心交换机',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'firewall',
            name: '防火墙',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'flow-monitor',
            name: '流量监控',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'server',
            name: '服务器',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'virtual-machine',
            name: '虚拟机',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'load-balancing',
            name: '负载均衡',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'signal-link',
            name: '信号链路',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'system',
            name: '系统',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'tradition-device',
            name: '传统设备',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'serve',
            name: '服务',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'data-base',
            name: '数据库',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'redis',
            name: '缓存',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'storage',
            name: '存储',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'signal-flow',
            name: '信号流',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'colony',
            name: '集群',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'monomer',
            name: '单体',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
        },
        {
            type: 'redundancy-group',
            name: '冗余组',
            icon: '',
            attr: {
                ...attr,
            },
            ctrl: '',
            event: 2,
            template: ''
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
    topo,
    {
        title: '其他控件',
        child: [

        ],
    },
];