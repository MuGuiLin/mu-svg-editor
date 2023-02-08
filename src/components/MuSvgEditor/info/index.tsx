
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
        const zoom: Array<number> = [8, 16, 25, 50, 75, 100, 125, 150, 200, 300, 400, 600, 800, 1000];
        const change = (up: number) => {
            let index = zoom.findIndex(size => size === canvas.zoom);
            if (up) {
                canvas.zoom = zoom[index === zoom.length - 1 ? zoom.length - 1 : ++index];
            } else {
                canvas.zoom = zoom[index === 0 ? 0 : --index];
            }
        };
        return (a: any, b: any, c: any) => {
            return <footer class={style.info}>
                <div class={style.seat}>
                    坐标信息
                    X：<b>{~~(180 + canvas.lineX - canvas.dropX)}</b> px，
                    Y：<b>{(51 + canvas.lineY - canvas.dropY) ^ 0}</b> px
                </div>
                <div class={style.zoom}>
                    <expand-outlined onClick={() => toggle()} title={isFullscreen ? '全屏显示' : '正常显示'} />
                    <minus-outlined title="减少缩放" onClick={() => change(0)} />
                    <a-select title="选择缩放" v-model:value={canvas.zoom} prefix={<bg-colors-outlined />}>
                        {zoom.map((size) => <a-select-option value={size}>{size} %</a-select-option>)}
                    </a-select>
                    <plus-outlined title="增加缩放" onClick={() => change(1)} />
                </div>
            </footer>
        };
    }
});