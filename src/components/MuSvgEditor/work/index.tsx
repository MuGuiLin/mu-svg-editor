import { defineComponent } from 'vue';
import style from './style.module.less'

export default defineComponent({

    setup(this, props, ctx) {

    },
    render() {
        const { work }: any = this;
        return <main class="{style.work}">
            <div class="mu-svg-editor-work-draw" onmousemove={() => { work.mousemove(event) }}>
                <div class="mu-svg-scale" v-show={work.isScale}>
                    <div class="mu-svg-scale-x-box">
                        <canvas class="mu-svg-scale-x"></canvas>
                    </div>
                    <div class="mu-svg-scale-y-box">
                        <canvas class="mu-svg-scale-y"></canvas>
                    </div>
                </div>
                <div class="mu-svg-canvas">
                    <svg id="svg" xmlns="http://www.w3.org/2000/svg" width="{work.width}" height="{work.height}" viewBox="{`0 0 ${work.width} ${work.height}`}"></svg>
                </div>
                <div class="mu-svg-subline" v-show="{work.isLine}">
                    <div class="mu-svg-subline-x" style="{{top: work.lineY + 'px'}}"></div>
                    <div class="mu-svg-subline-y" style="{{left: work.lineX + 'px'}}"></div>
                </div>
            </div>
        </main >;
    }
});