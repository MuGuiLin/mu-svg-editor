
import { defineComponent } from 'vue';
import style from './style.module.less';

interface IProps {
    [key: string]: unknown
};

export default defineComponent({
    name: 'Info',
    props: {
        prop: {}
    },
    setup(props: IProps, stx) {

        const { prop: { canvas } }: any = props;

        return (a: any, b: any, c: any) => {
            // console.log(a, b, c);
            return <footer class={style.info}>
                <p>坐标信息 X：<b>{canvas.lineX}</b> px，Y：<b>{canvas.lineY}</b> px</p>
            </footer>
        };
    }
});