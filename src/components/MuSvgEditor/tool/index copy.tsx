import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
import { message } from 'ant-design-vue';
import style from './style.module.less'
import './style.module.less'

export default defineComponent({
    props: {
        attr: {
            type: Object,
        }
    },
    setup(props) {
        // const activeKey = ref({ activeKey: ['1', 2, 3] });
        let activeKey = ref([0, 1, 2]);
        const state = reactive({
            fill: '#2F2F2C', // 
        });


        const customStyle = 'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';

        watch(activeKey, val => {
            console.log(val);
        });

        const dragsvg = (e: DragEvent, o: any) => {
            state.fill = '#0092FF'
        };

        const ondragstart = (e: DragEvent, o: any) => {
            console.log(333, o);
            props.attr.dragstart = true;
            props.attr.nowTool = o;
        };

        const ondragend = (e: DragEvent, o: any) => {
            //拖动时记录拖动的svg信息
            if (e.dataTransfer?.dropEffect !== 'copy') {
                message.warning('请将组件拖到画布中！');
            props.attr.dragstart = false;
                //清空已选择的信息
                return;
            }
        };

        return {
            activeKey,
            dragsvg,
            ondragstart,
            ondragend,
            ...toRefs(state),
        };
    },
    render() {
        const { attr: { tool }, activeKey, dragsvg, ondragstart, ondragend, fill }: any = this;
        return (
            <aside class={style.tool}>
                <a-collapse v-model:activeKey={activeKey} bordered={false} expandIconPosition="left">
                    {
                        tool?.map((o: { title: any; child: any[]; }, i: number) => (
                            <a-collapse-panel key={i} header={o.title}>
                                {
                                    o?.child.map((m) => (
                                        (1 === m.draw) ? <div class={style.drag} onclick={(e: Event) => dragsvg(e, m)}>
                                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                                                <path fill={fill} d={m.path}></path>
                                            </svg>
                                            <b>{m.name}</b>
                                        </div> : <div class={style.drag}>
                                            <i class={`${style.drag}-${m.type}`} draggable ondragstart={(e: Event) => ondragstart(e, m)} ondragend={(e: Event) => ondragend(e, m)}></i>
                                            <b>{m.name}</b>
                                        </div>
                                    ))
                                }
                            </a-collapse-panel>
                        ))
                    }
                </a-collapse>
            </aside >
        );
    }
});