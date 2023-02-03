
import { defineComponent } from 'vue';
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen();

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
            return <footer class={style.info}>
                <div class={style.seat}>坐标信息 X：<b>{canvas.lineX}</b> px，Y：<b>{canvas.lineY}</b> px</div>
                <div class={style.zoom}><expand-outlined onClick={() => toggle()} title={isFullscreen ? '全屏显示' : '正常显示'} /> <minus-outlined title="减小缩放" /> 100% <plus-outlined title="增加缩放" /></div>
            </footer>
        };
    }
});