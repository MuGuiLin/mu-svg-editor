import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, ref, reactive, onMounted, defineEmits, defineExpose } from 'vue';
import { AndroidOutlined, AppleOutlined, ColumnWidthOutlined, ColumnHeightOutlined } from '@ant-design/icons-vue';
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

interface FormState {
    width: string | number;
    height: string | number;
    remember: boolean;
}

export default defineComponent({
    name: 'Attr',
    props: {
        attr: {}
    },
    setup(props) {
        const formState = reactive<FormState>({
            width: '',
            height: '',
            remember: true,
        });
        const onFinish = (values: any) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        
        const onValuesChange = (values: any) => {
            console.log('onValuesChange:', values);
        };
        return {
            formState,
            onFinish,
            onFinishFailed,
            onValuesChange
        };
    },

    render() {
        const { attr, formState, onFinish, onFinishFailed, onValuesChange }: any = this;
        return (<aside class={style.attr}>
            <a-tabs v-model:activeKey={attr.activeKey}>
                <a-tab-pane key="1" tab="控件属性">
                    单体
                </a-tab-pane>
                <a-tab-pane key="2" tab="画布设置">

                    <a-form-form model={formState}
                        name="basic"
                        layout="vertical"
                        label-col={{ span: 8 }}
                        wrapper-col={{ span: 16 }}
                        autocomplete="off"
                        onValuesChange={onValuesChange}
                        onFinish={() => onFinish()}
                        onFinishFailed={onFinishFailed}
                    >
                        <a-form-item label="画布宽度" name="width"
                            rules={[{ required: false, message: '请输入画布宽度！' }]}
                        >
                            <a-input defaultValue={attr.width} prefix={<ColumnWidthOutlined />} suffix="px" />
                        </a-form-item>

                        <a-form-item label="画布高度" name="height"
                            rules={[{ required: false, message: '请输入画布高度！' }]}
                        >
                            <a-input defaultValue={attr.height} prefix={<ColumnHeightOutlined />} suffix="px" />
                        </a-form-item>

                        <a-form-item label="主题颜色" name="color"
                            rules={[{ required: false, message: '请输入主题颜色！' }]}
                        >
                            <a-input type="color"  defaultValue={attr.height} prefix={<ColumnHeightOutlined />} suffix="px" />
                        </a-form-item>

                        <a-form-item name="remember" wrapper-col={{ offset: 8, span: 16 }}>
                            <a-checkbox checked={formState.remember}>Remember me</a-checkbox>
                        </a-form-item>
                        <a-form-item wrapper-col={{ offset: 8, span: 16 }}>
                            <a-button type="primary" html-type="submit">Submit</a-button>
                        </a-form-item>
                    </a-form-form>
                </a-tab-pane>
            </a-tabs>
        </aside >);
    }
});
