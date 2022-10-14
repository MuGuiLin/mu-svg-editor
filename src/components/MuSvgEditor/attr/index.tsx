import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, ref, reactive, onMounted, defineEmits, defineExpose } from 'vue';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons-vue';
import style from './style.module.less';

interface IState {
    color: string;
};

// const props = defineProps({
//     width: {
//         type: Number,
//         default: 1008,
//         required: true,
//         validator: (val: any) => val > 1008,
//     },
//     height: {
//         type: Number,
//         default: 567,
//     },
//     activeKey: String,
//     arr: Array
// });

interface IProps {
    width: number;
    height: number;
    activeKey?: string | number; //未设置默认值为undefined
    arr?: Array<any>;
    eame: 'A' | 'B' | 'C' // 限定父组件传 eame 的值
}

export default defineComponent({
    name: 'Attr',
    props: {
        attr: {}
    },
    setup(props) {

    },
    render() {
        const { attr }: any = this;
        return (<aside class={style.attr}>
            <a-tabs v-model:activeKey={attr.activeKey}>
                <a-tab-pane key="1" tab="控件属性">
                    单体
                </a-tab-pane>
                <a-tab-pane key="2" tab="画布设置">
                    画布宽度
                </a-tab-pane>
            </a-tabs>
        </aside >);
    }
});
