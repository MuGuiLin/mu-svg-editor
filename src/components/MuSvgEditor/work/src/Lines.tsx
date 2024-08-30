import { defineComponent } from "vue";
import style from '../style.module.less'

export default defineComponent({
    name: 'Lines',
    props: {
        canvas: {
            type: Object,
            default: {
                lineY: 0,
                lineX: 0
            }
        },
    },
    setup({ canvas }) {
        return () => <div class={style.subs}>
            <div class={style.sub_x} style={{ transform: `translate3d(0, ${canvas.lineY}px, 0)` }}></div>
            <div class={style.sub_y} style={{ transform: `translate3d(${canvas.lineX}px, 0, 0)` }}></div>
        </div>
    }
});