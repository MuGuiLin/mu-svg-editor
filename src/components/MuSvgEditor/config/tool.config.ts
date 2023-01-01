import { IAttrParops } from '../types/attrType';
import { IToolProps } from '../types/toolType';

export const attr: IAttrParops = {
    id: '',
    text: '',
    status: 1,
    type: '',
    width: 60,
    height: 60,
    icon: '',
    path: '',
    filter: '',
    points: '',
    class: '',
    scale: 0,
    style: {
        fill: '#00FFFF',
        fill_opacity: 1,
        stroke: '#166FFF',
        stroke_width: 1,
        stroke_dasharray: '',
        stroke_opacity: 1,
    },
    transform: '',
    hidden: true,
};

export const draw: IToolProps = {
    title: '基本绘制',
    child: [
        {
            type: 'select',
            name: '选择',
            icon: 'send-outlined',
            path: 'M18 20.76l-2.94 1.5-3.68-6-4.41 3V1.24l12.5 12.01-4.41 1.5 2.94 6z',
            attr: {},
            event: 1,
            template: '<line :x1=\"prop_data.extend_attr.startpoint_x.val\" :y1=\"prop_data.extend_attr.startpoint_y.val\" :x2=\"prop_data.extend_attr.endpoint_x.val\" :y2=\"prop_data.extend_attr.endpoint_y.val\" :fill=\"prop_data.extend_attr.color.val\" :stroke=\"prop_data.extend_attr.color.val\"  stroke-width=\"2\" :class=\"prop_data.extend_attr.svg_line_ani.val.selectval\"></line>'
        },
        {
            type: 'line',
            name: '直线',
            path: 'M 2 10 L 23 10 L 23 15 L 2 15 Z',
            icon: 'line-outlined',
            attr: {
                ...attr,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
            },
            event: 1,
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
            event: 1,
            template: ''
        },
        {
            type: 'rect',
            name: '矩形',
            icon: 'border-outlined',
            path: 'M 3 4 L 3 21 L 22 21 L 22 4 L 0 4 Z',
            attr: {
                ...attr,
                x: 0,
                y: 0,
            },
            event: 1,
            template: ''
        },
        {
            type: 'circle',
            name: '圆形',
            icon: 'loading3-quarters-outlined',
            path: 'M 22.1, 2.5, m -10, 0 a 10, 10 0 1, 0 1, 0 Z',
            attr: {
                ...attr,
                cx: 0,
                cy: 0,
                r: 50
            },
            event: 1,
            template: ''
        },
        {
            type: 'path',
            name: '路径',
            icon: 'node-index-outlined',
            path: 'M11.5 1.9c0-.36.86 0 .86 0V14a1.3 1.3 0 10.88 0V1.9s.87-.36.87 0c0 6.81 5.22 11.68 5.22 11.68l-3.25 8.2h-6.55l-3.26-8.2s5.22-4.87 5.22-11.68zM7 24.5v-2h11.32v2z',
            attr: {
                ...attr,
                d: ''
            },
            event: 1,
            template: ''
        },
        {
            type: 'text',
            name: '文本',
            icon: 'font-size-outlined',
            path: 'M 5 4 v 3 h 6 v 14 h 3 V 7 H 20 V 4 Z',
            attr: {
                ...attr,
                text_anchor: 'middle',
                x: 0,
                y: 0
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
            type: 'image',
            name: '互联网',
            icon: 'internet',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: '<image href="icon/tool/internet.webp" width="50" height="50"></image>',
            props: [
                'props_attr'
            ],
        },
        {
            type: 'image',
            name: '访问人',
            icon: 'visitor',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: 'PC端',
            icon: 'computer',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '移动端',
            icon: 'phone',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '交换机',
            icon: 'switch',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '核心交换机',
            icon: 'core-switch',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '防火墙',
            icon: 'firewall',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '流量监控',
            icon: 'flow-monitor',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '服务器',
            icon: 'server',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '虚拟机',
            icon: 'virtual-machine',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '负载均衡',
            icon: 'load-balancing',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '信号链路',
            icon: 'signal-link',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '系统',
            icon: 'system',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '传统设备',
            icon: 'tradition-device',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '插头',
            icon: 'plug',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '电池',
            icon: 'battery',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '服务',
            icon: 'serve',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '数据库',
            icon: 'data-base',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '缓存',
            icon: 'redis',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '存储',
            icon: 'storage',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '信号流',
            icon: 'signal-flow',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '集群',
            icon: 'colony',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '单体',
            icon: 'monomer',
            path: '',
            attr: {
                ...attr,
            },
            event: 2,
            template: ''
        },
        {
            type: 'image',
            name: '冗余组',
            icon: 'redundancy-group',
            path: '',
            attr: {
                ...attr,
            },
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