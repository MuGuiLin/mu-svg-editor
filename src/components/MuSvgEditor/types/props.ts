export interface Iprops {
    width?: number;
    height?: number;
    scale?: any;
    isLine?: boolean;
    isScale?: boolean;
    lineX?: number;
    lineY?: number;
    activeKey?: string | number; // 未设置默认值为undefined
    [key: string]: any;
};