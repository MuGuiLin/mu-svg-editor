import { defineComponent, onMounted, nextTick } from "vue";
import style from '../style.module.less'

export default defineComponent({
    name: 'Scale',
    setup() {
        return () => <div class={style.scale}>
            <div class={style.scale_z}></div>
            <div class={style.scale_x}>
                <canvas></canvas>
            </div>
            <div class={style.scale_y} >
                <canvas></canvas>
            </div >
        </div >
    }
});

