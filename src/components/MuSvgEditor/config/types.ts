export type TStatusType = 0 | 1 | 2 | 3;
export type TStrokeType = '#00FFFF' | '#FFCD2A' | '#ED5E44' | any;
export type TTextAnchorType = 'start' | 'middle' | 'end';

export interface IBaseParops {
    [key: string]: any;
};

export interface IStyleParops extends IBaseParops {
    fill?: string;
    stroke?: TStrokeType;
    stroke_width?: number | string;
    opacity?: number;
    font_size?: number | string;
    text_anchor?: TTextAnchorType;
    stroke_dasharray?: string;
};

export interface IAttrParops extends IBaseParops {
    id: string | Array<string>;
    text?: string;
    status?: TStatusType;
    type: string;
    x: number;
    y: number;
    r?: number;
    x2?: number;
    y2?: number;
    cx?: number;
    cy?: number;
    width?: number;
    height?: number;
    icon?: string;
    path?: string;
    filter?: string;
    points?: string;
    class?: string | [];
    style?: IStyleParops;
    transform?: string;
    is_show: boolean;
};

export interface IChildProps {
    length: number;
    [index: number]: {
        type: string;
        name: string;
        icon?: string;
        path?: string;
        attr: IAttrParops;
        ctrl?: string;
        event: number;
        template?: string;
    }
};

export interface IToolProps {
    length: number;
    [index: number]: {
        title: string,
        child: Array<IChildProps>
        [key: string]: any;
    };

    forEach(arg0: (o: any) => any): any;
    filter(
        arg0: (o: any) => boolean,
    ):
        | unknown[]
        | Iterable<unknown>
        | import('d3-selection').ValueFn<
        SVGSVGElement,
        unknown,
        unknown[] | Iterable<unknown>
        >;
};