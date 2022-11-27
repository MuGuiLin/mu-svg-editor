import { defineComponent, reactive, watch, onMounted, onUnmounted } from 'vue';
import { Iprops } from '../types/props'
import scale from "../hook/scale";

import style from './style.module.less'

export default defineComponent({
    props: {
        attr: {},
        mousemove: Function
    },

    setup(props: any, ctx) {
        console.log(props);

        const state: Iprops = reactive({
            scale: null,
        });

        watch(() => [props.attr.width, props.attr.height], (n1, n2) => {
            setTimeout(() => {
                state.scale.reset();
            }, 100);
        }, { immediate: true });

        onMounted(() => {
            state.scale = new scale({
                draw: `.${style.draw}`,
                canvas: `.${style.canvas}`,
                scale_x: `.${style.scale_x}`,
                scale_y: `.${style.scale_y}`
            });
        });

        onUnmounted(() => {
            window.onresize = null;
        });

        return {
            state
        };
    },
    render() {
        const { attr, state, mousemove }: any = this;

        return <main class={style.work}>
            <div class={style.draw} onmousemove={($event: Event) => mousemove($event)}>
                <div class={style.scale} v-show={attr.isScale}>
                    <div class={style.scale_x}>
                        <canvas></canvas>
                    </div>
                    <div class={style.scale_y}>
                        <canvas></canvas>
                    </div>
                </div>
                <div class={style.canvas}>
                    <svg class={style.svg} id="svg" xmlns="http://www.w3.org/2000/svg" width={attr.width} height={attr.height} viewBox={`0 0 ${attr.width} ${attr.height}`}></svg>
                </div>
                <div class={style.subline} v-show={attr.isLine}>
                    <div class={style.subline_x} style={{ top: attr.lineY + 'px' }}></div>
                    <div class={style.subline_y} style={{ left: attr.lineX + 'px' }}></div>
                </div>
            </div>
        </main>;
    }
});