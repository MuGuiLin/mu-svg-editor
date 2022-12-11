import { defineComponent, reactive, watch, onMounted, onUnmounted } from 'vue';
import { Iprops } from '../types/props'
import scale from "../hook/scale";

import style from './style.module.less'
import Components from './components.vue';

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

        const svgData: any = reactive([]);

        watch(() => [props.attr.width, props.attr.height], (n1, n2) => {
            setTimeout(() => {
                state.scale.reset();
            }, 100);
        }, { immediate: true });

        // 控件拖动进入画布区域
        const ondragenter = (e: DragEvent) => {
            console.log('进入放置区域');
            // rightnav_open.value = false;
            e.preventDefault();
        };

        // 控件在画布区域拖动中
        const ondragover = (e: DragEvent) => {
            e.preventDefault();
        };

        // 控件在画布上拖动结束
        const ondrop = (e: DragEvent) => {
            props.attr.dragstart = false;

            // 未选择任何组件
            if (!Object.keys(props.attr.nowTool).length) {
                return false;
            }
            const { type, name, attr } = props.attr.nowTool;
            console.log(props.attr.nowTool)
            attr.x = e.offsetX;
            attr.y = e.offsetY;

            //在鼠标位置创建当前组件
            const ctrl: any = {
                id: `${new Date().getTime()}`,
                type,
                name,
                svgPositionX: e.offsetX,
                svgPositionY: e.offsetY,
                angle: 0,
                size: 1,
                attr: JSON.parse(JSON.stringify(attr))
            }
            svgData.push(ctrl);

            props.attr.nowAttr = ctrl;

            //清空左侧工具选中
            // select_lefttool.value = {};

        };

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
            state,
            ondrop,
            ondragenter,
            ondragover
        };
    },
    render() {
        const { attr, state, mousemove, ondrop, ondragenter, ondragover }: any = this;
        var obj = {
            template
                :
                "<polygon  points=\"0,8 5,0 10,8\" :fill=\"prop_data.extend_attr.color.val\" :stroke=\"prop_data.extend_attr.color.val\" stroke-width=\"2\" transform=\"translate(-5,0)\"></polygon>"
        }
        return <main class={style.work}>
            <component is="input"></component>
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
                <component is='input'></component>
                <div class={[style.canvas, attr.dragstart && style.dragstart]} ondrop={(e: Event) => ondrop(e)} ondragenter={(e: Event) => ondragenter(e)} ondragover={(e: Event) => ondragover(e)} >
                    <svg class={style.svg} id="svg" xmlns="http://www.w3.org/2000/svg" width={attr.width} height={attr.height} viewBox={`0 0 ${attr.width} ${attr.height}`}>

                        <g>
                            <Components is={'input'} />
                        </g>

                        <g id="selectorGroup0" transform="" display="inline">
                            <path id="selectedBox0" fill="none" stroke="#4F80FF" shape-rendering="crispEdges" style="pointer-events:none" d="M387.625044659974,39.32717778101342 L466.37503444715003,39.32717778101342 466.37503444715003,120.0771671280991 387.625044659974,120.0771671280991z"></path>
                            <g display="inline">
                                <circle id="selectorGrip_rotate_nw" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="383.625044659974" cy="35.32717778101342"></circle>
                                <circle id="selectorGrip_rotate_ne" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="470.37503444715003" cy="35.32717778101342"></circle>
                                <circle id="selectorGrip_rotate_se" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="470.37503444715003" cy="124.0771671280991"></circle>
                                <circle id="selectorGrip_rotate_sw" fill="#000" r="8" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0" style="cursor:url(images/rotate.png) 12 12, auto;" cx="383.625044659974" cy="124.0771671280991"></circle>
                                <rect id="selectorGrip_resize_nw" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:nw-resize" pointer-events="all" x="384" y="35"></rect>
                                <rect id="selectorGrip_resize_n" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:n-resize" pointer-events="all" x="423" y="35"></rect>
                                <rect id="selectorGrip_resize_ne" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:ne-resize" pointer-events="all" x="462" y="35"></rect>
                                <rect id="selectorGrip_resize_e" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:e-resize" pointer-events="all" x="462" y="76"></rect>
                                <rect id="selectorGrip_resize_se" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:se-resize" pointer-events="all" x="462" y="116"></rect>
                                <rect id="selectorGrip_resize_s" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:s-resize" pointer-events="all" x="423" y="116"></rect>
                                <rect id="selectorGrip_resize_sw" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:sw-resize" pointer-events="all" x="384" y="116"></rect>
                                <rect id="selectorGrip_resize_w" width="8" height="8" fill="#4F80FF" stroke="rgba(0,0,0,0)" style="cursor:w-resize" pointer-events="all" x="384" y="76"></rect>
                            </g>
                        </g>

                        <g id="selectorParentGroup" transform="translate(0, 0)">
                            <g id="selectorGroup0" transform="rotate(0,0,0)" display="inline">
                                <path id="selectedBox0" fill="none" stroke="#0091f2" stroke-dasharray="5,5" style="pointer-events:none" d="M69,267 L201,267 201,407 69,407z"></path>
                                <g display="inline">
                                    <circle id="selectorGrip_resize_nw" fill="#0091f2" r="4" style="cursor:ne-resize" stroke-width="2" pointer-events="all" cx="69" cy="267"></circle>
                                    <circle id="selectorGrip_resize_n" fill="#0091f2" r="4" style="cursor:e-resize" stroke-width="2" pointer-events="all" cx="135" cy="267"></circle>
                                    <circle id="selectorGrip_resize_ne" fill="#0091f2" r="4" style="cursor:se-resize" stroke-width="2" pointer-events="all" cx="201" cy="267"></circle>
                                    <circle id="selectorGrip_resize_e" fill="#0091f2" r="4" style="cursor:s-resize" stroke-width="2" pointer-events="all" cx="201" cy="337"></circle>
                                    <circle id="selectorGrip_resize_se" fill="#0091f2" r="4" style="cursor:sw-resize" stroke-width="2" pointer-events="all" cx="201" cy="407"></circle>
                                    <circle id="selectorGrip_resize_s" fill="#0091f2" r="4" style="cursor:w-resize" stroke-width="2" pointer-events="all" cx="135" cy="407"></circle>
                                    <circle id="selectorGrip_resize_sw" fill="#0091f2" r="4" style="cursor:nw-resize" stroke-width="2" pointer-events="all" cx="69" cy="407"></circle>
                                    <circle id="selectorGrip_resize_w" fill="#0091f2" r="4" style="cursor:n-resize" stroke-width="2" pointer-events="all" cx="69" cy="337"></circle>
                                    <line id="selectorGrip_rotateconnector" stroke="#0091f2" x1="135" y1="267" x2="135" y2="247"></line>
                                    <circle id="selectorGrip_rotate" fill="#ff00ff" r="4" stroke="#0091f2" class={style.rotate} stroke-width="2" cx="135" cy="247"></circle>
                                </g>
                            </g>
                        </g>

                        {/* <g id="selectorParentGroup" transform="translate(640,480)"><g display="none"><circle id="selectorGrip_resize_nw" fill="#22C" r="4" style="cursor:nw-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_n" fill="#22C" r="4" style="cursor:n-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_ne" fill="#22C" r="4" style="cursor:ne-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_e" fill="#22C" r="4" style="cursor:e-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_se" fill="#22C" r="4" style="cursor:se-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_s" fill="#22C" r="4" style="cursor:s-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_sw" fill="#22C" r="4" style="cursor:sw-resize" stroke-width="2" pointer-events="all"></circle><circle id="selectorGrip_resize_w" fill="#22C" r="4" style="cursor:w-resize" stroke-width="2" pointer-events="all"></circle><line id="selectorGrip_rotateconnector" stroke="#22C"></line><circle id="selectorGrip_rotate" fill="lime" r="4" stroke="#22C" stroke-width="2" style="cursor:url(images/rotate.png) 12 12, auto;"></circle></g><rect id="selectorRubberBand" fill="#22C" fill-opacity="0.15" stroke="#22C" stroke-width="0.5" display="none" style="pointer-events:none"></rect></g> */}

                    </svg>
                </div>
                <div class={style.subline} v-show={attr.isLine}>
                    <div class={style.subline_x} style={{ top: attr.lineY + 'px' }}></div>
                    <div class={style.subline_y} style={{ left: attr.lineX + 'px' }}></div>
                </div>

            </div>
        </main >;
    }
});