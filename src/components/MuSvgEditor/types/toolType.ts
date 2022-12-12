import { IAttrParops, } from './attrType'

export interface IChildProps {
    type: string;
    name: string;
    icon?: string;
    path?: string;
    attr: IAttrParops;
    ctrl?: string;
    event: number;
    select?: boolean;
    template?: string;
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
    length?: number;
};

export interface IToolProps {
    title: string,
    child: Array<IChildProps>
    length?: number;
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

export default IToolProps;