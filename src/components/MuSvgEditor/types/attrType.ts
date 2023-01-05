export type TStatusType = 0 | 1 | 2 | 3;
export type TStrokeType = '#00FFFF' | '#FFCD2A' | '#ED5E44' | any;
export type TTextAnchorType = 'start' | 'middle' | 'end' | 'inherit';
export type TDominantBaselineType = 'auto' | 'text-top' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging';

export interface IBaseParops {
    [key: string]: any;
};

export interface IStyleParops extends IBaseParops {
    x?: number;
    y?: number;
    r?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    cx?: number;
    cy?: number;
    width?: number;
    height?: number;
    opacity?: number;
    fill?: string;
    fill_opacity?: number | string;
    stroke?: TStrokeType;
    stroke_width?: number | string;
    stroke_dasharray?: number | string;
    stroke_opacity?: number | string;
    font_size?: number | string;
    text_anchor?: TTextAnchorType;
    dominant_baseline?: TDominantBaselineType;
};
export interface ITransformParops extends IBaseParops {
    x?: number | string;
    y?: number | string;
    scale?: number | string;
    rotate?: number | string;
};
export interface IAttrParops extends IBaseParops {
    id?: string | Array<string>;
    text?: string;
    icon?: string;
    status?: TStatusType;
    filter?: string;
    points?: string;
    class?: string | [];
    style?: IStyleParops;
    hidden?: boolean;
    transform?: ITransformParops;
    [key: string]: any;
};

export default IAttrParops;