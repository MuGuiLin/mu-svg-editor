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
                {/* <div style={{width:attr.width+'px',height:attr.height+'px'}}> </div> */}
                <div class={style.scale} v-show={attr.isScale}>
                    <div class={style.scale_x}>
                        <canvas></canvas>
                    </div>
                    <div class={style.scale_y}>
                        <canvas></canvas>
                    </div>
                </div>
                <div class={style.canvas}>
                    <svg class={style.svg} id="svg" xmlns="http://www.w3.org/2000/svg" width={attr.width} height={attr.height} viewBox={`0 0 ${attr.width} ${attr.height}`}>
                        <g id="selectorGroup0" transform="" display="inline"><path id="selectedBox0" fill="none" stroke="#4F80FF" shape-rendering="crispEdges" style="pointer-events:none" d="M387.625044659974,39.32717778101342 L466.37503444715003,39.32717778101342 466.37503444715003,120.0771671280991 387.625044659974,120.0771671280991z"></path><g display="inline"><circle id="selectorGrip_rotate_nw" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="383.625044659974" cy="35.32717778101342"></circle><circle id="selectorGrip_rotate_ne" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="470.37503444715003" cy="35.32717778101342"></circle><circle id="selectorGrip_rotate_se" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="470.37503444715003" cy="124.0771671280991"></circle><circle id="selectorGrip_rotate_sw" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="383.625044659974" cy="124.0771671280991"></circle><rect id="selectorGrip_resize_nw" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:nw-resize" pointer-events="all" x="384" y="35"></rect><rect id="selectorGrip_resize_n" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:n-resize" pointer-events="all" x="423" y="35"></rect><rect id="selectorGrip_resize_ne" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:ne-resize" pointer-events="all" x="462" y="35"></rect><rect id="selectorGrip_resize_e" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:e-resize" pointer-events="all" x="462" y="76"></rect><rect id="selectorGrip_resize_se" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:se-resize" pointer-events="all" x="462" y="116"></rect><rect id="selectorGrip_resize_s" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:s-resize" pointer-events="all" x="423" y="116"></rect><rect id="selectorGrip_resize_sw" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:sw-resize" pointer-events="all" x="384" y="116"></rect><rect id="selectorGrip_resize_w" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:w-resize" pointer-events="all" x="384" y="76"></rect></g></g>
                        <g id="selectorParentGroup" transform="translate(60,80)"><rect id="selectorRubberBand" fill="#22C" fill-opacity="0.15" stroke="#22C" stroke-width="0.5" display="none" style="pointer-events:none" x="168.5" y="230.5" width="18" height="96"></rect><g id="selectorGroup0" transform="rotate(90,135,337)" display="inline"><path id="selectedBox0" fill="none" stroke="#22C" stroke-dasharray="5,5" style="pointer-events:none" d="M69,267 L201,267 201,407 69,407z"></path><g display="inline"><circle id="selectorGrip_resize_nw" fill="#22C" r="4" style="cursor:ne-resize" stroke-width="2" pointer-events="all" cx="69" cy="267"></circle><circle id="selectorGrip_resize_n" fill="#22C" r="4" style="cursor:e-resize" stroke-width="2" pointer-events="all" cx="135" cy="267"></circle><circle id="selectorGrip_resize_ne" fill="#22C" r="4" style="cursor:se-resize" stroke-width="2" pointer-events="all" cx="201" cy="267"></circle><circle id="selectorGrip_resize_e" fill="#22C" r="4" style="cursor:s-resize" stroke-width="2" pointer-events="all" cx="201" cy="337"></circle><circle id="selectorGrip_resize_se" fill="#22C" r="4" style="cursor:sw-resize" stroke-width="2" pointer-events="all" cx="201" cy="407"></circle><circle id="selectorGrip_resize_s" fill="#22C" r="4" style="cursor:w-resize" stroke-width="2" pointer-events="all" cx="135" cy="407"></circle><circle id="selectorGrip_resize_sw" fill="#22C" r="4" style="cursor:nw-resize" stroke-width="2" pointer-events="all" cx="69" cy="407"></circle><circle id="selectorGrip_resize_w" fill="#22C" r="4" style="cursor:n-resize" stroke-width="2" pointer-events="all" cx="69" cy="337"></circle><line id="selectorGrip_rotateconnector" stroke="#22C" x1="135" y1="267" x2="135" y2="247"></line><circle id="selectorGrip_rotate" fill="lime" r="4" stroke="#22C" stroke-width="2" style="cursor:url(images/rotate.png) 12 12, auto;" cx="135" cy="247"></circle></g></g></g>
                    </svg>
                </div>
                <div class={style.subline} v-show={attr.isLine}>
                    <div class={style.subline_x} style={{ top: attr.lineY + 'px' }}></div>
                    <div class={style.subline_y} style={{ left: attr.lineX + 'px' }}></div>
                </div>

            </div>
        </main>;
    }
});