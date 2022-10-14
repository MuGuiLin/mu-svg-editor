
import { defineComponent } from 'vue';
import style from './style.module.less';

interface IProps {
    [key: string]: unknown
};

export default defineComponent({
    name: 'Info',
    props: {
        info: {}
    },
    setup(props: IProps, stx) {

        const { info }: any = props;

        return (a: any, b: any, c: any) => {
            // console.log(a, b, c);
            return <footer class={style.info}>
                <p>坐标信息 X：<b>{info.lineX}</b> px，Y：<b>{info.lineY}</b> px</p>
            </footer>
        };
    }
});