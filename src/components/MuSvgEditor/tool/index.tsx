import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
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
        const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
        const customStyle =
            'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
        watch(activeKey, val => {
            console.log(val);
        });

        const dragsvg = (e: DragEvent, o: any) => {
            state.fill = '#0092FF'
        };

        const onDragstart = (e: DragEvent, o: any) => {
            console.log(333, o);
            props.attr.nowTool = o;
        };

        const onDragend = (e: DragEvent, o: any) => {
            //拖动时记录拖动的svg信息
            if (e.dataTransfer?.dropEffect !== 'copy') {
                alert('请将组件拖到画布中！');
                //清空已选择的信息
                return;
            }
        };

        return {
            activeKey,
            text,
            customStyle,
            dragsvg,
            onDragstart,
            onDragend,
            ...toRefs(state),
        };
    },
    render() {
        const { attr: { tool }, activeKey, text, customStyle, dragsvg, onDragstart, onDragend, fill }: any = this;
        return (
            <aside class={style.tool}>
                <a-collapse v-model:activeKey={activeKey} bordered={false} expandIconPosition="left">
                    {
                        tool?.map((o, i: number) => (
                            <a-collapse-panel key={i} header={o.title}>
                                {
                                    o?.child.map((m) => (
                                        (1 === m.draw) ? <div class={style.drag} onClick={(e: Event) => dragsvg(e, m)}>
                                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
                                                <path fill={fill} d={m.path}></path>
                                            </svg>
                                            <b>{m.name}</b>
                                        </div> : <div class={style.drag}>
                                            <i class={`${style.drag}-${m.type}`} draggable onDragstart={(e: Event) => onDragstart(e, m)} onDragend={(e: Event) => onDragend(e, m)}></i>
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