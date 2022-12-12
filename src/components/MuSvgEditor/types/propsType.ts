import ITool from './toolType';
import IAttr from './attrType';
export interface IStateType {
    canvas: {
        width: number;
        height: number;
        lineX: number;
        lineY: number;
        isLine: boolean;
        isDrag: boolean;
        isScale: boolean;
    },
    tool: Array<any>;
    nowTool: ITool;
    nowAttr: IAttr;
};

export default IStateType;