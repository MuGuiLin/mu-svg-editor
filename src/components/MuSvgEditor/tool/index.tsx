import { defineComponent, ref, watch } from 'vue'
import style from './style.module.less'

export default defineComponent({
    props: {
        attr: {
            type: Object,
        }
    },
    setup(props) {
        // const activeKey = ref({ activeKey: ['1', 2, 3] });
        let activeKey = ref([0, 1, 2]);
        const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
        const customStyle =
            'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
        watch(activeKey, val => {
            console.log(val);
        });

        const dragstart = (e: DragEvent, o: any) => {

        };

        const dragend = (e: DragEvent, o: any) => {
            //拖动时记录拖动的svg信息
            if (e.dataTransfer?.dropEffect !== 'copy') {
                console.error('请将组件拖到画布中!');
                //清空已选择的信息
                return;
            }
        };

        return {
            activeKey,
            text,
            customStyle,
            dragstart,
            dragend
        };
    },
    render() {
        const { attr: { tool }, activeKey, text, customStyle, dragstart, dragend }: any = this;
        return (
            <aside class={style.tool}>
                <a-collapse v-model:activeKey={activeKey} bordered={false} expandIconPosition="left">
                    {
                        tool?.map((o, i: number) => (
                            <a-collapse-panel key={i} header={o.title}>
                                {
                                    o?.child.map((m) => (
                                        <div class={style.drag} draggable="true" dragstart={(e: Event) => dragstart(e, m)} dragend={(e: Event) => dragend(e, m)}>
                                            <i class={style.drag + '-' + m.draw}></i>
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