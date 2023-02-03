import ITool from './toolType';
import IAttr from './attrType';

export interface ICanvasType {
    lineX: number;
    lineY: number;
    width: number;
    height: number;
    showLine: boolean;
    showDrag: boolean;
    showScale: boolean;
    backsetup: string;
    background: string;
    [key: string]: any;

};

export interface IStateType {
    canvas: ICanvasType;

    svgData: Array<any>;
    svgCtrl: object | any;

    addImage: object | any;

    tool: Array<any>;

    nowTool: ITool | any;
    nowAttr: IAttr | any;

    [key: string]: any;
};

export default IStateType;