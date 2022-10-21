import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, ref, reactive, onMounted, defineEmits, defineExpose } from 'vue';
import { ColumnWidthOutlined, ColumnHeightOutlined } from '@ant-design/icons-vue';
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

interface IState {
    remember: boolean;
    color: string;
    about: string;
}

export default defineComponent({
    name: 'Attr',
    props: {
        attr: {}
    },
    setup(props) {
        const state = reactive<IState>({
            color: '#1890FF',
            remember: true,
            about: 'Mu-SVG-Editor'
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

        const tabicon = (tab = 1) => {
            return 1 === tab ? <control-outlined /> : <setting-outlined />;
        };
        const input = ({ target }: Event | any) => {
            state.color = target.value;

            console.log(ConfigProvider);
            // 注：只有在main.ts中使用了antd.variable.min.css这里才生效哦！！
            ConfigProvider.config({
                // prefixCls: 'mu-',
                theme: {
                    primaryColor: state.color, // 全局主色
                    successColor: `#52c41a`, // 成功色
                    warningColor: `#faad14`, // 警告色
                    errorColor: `#f5222d`, // 错误色
                    infoColor: `#1890ff`,
                    processingColor: `#1890ff`,
                },
            });
        }
        return {
            state,
            tabicon,
            input,
            onFinish,
            onFinishFailed,
            onValuesChange
        };
    },

    render() {
        const { attr, tabicon, input, state, onFinish, onFinishFailed, onValuesChange }: any = this;
        return (<aside class={style.attr}>
            <a-tabs v-model:activeKey={attr.activeKey} centered>
                <a-tab-pane key="1" tab={[tabicon(1), '控件属性']}>
                    单体
                </a-tab-pane>
                <a-tab-pane key="2" tab={[tabicon(2), '画布设置']}>
                    <a-form model={state}
                        name="cancaSetup"
                        layout="vertical"
                        autocomplete="off"
                        onValuesChange={onValuesChange}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <a-form-item label="画布宽度" name="width" rules={[{ required: false, message: '请输入画布宽度！' }]}>
                            <a-input v-model:value={attr.width} prefix={<ColumnWidthOutlined />} suffix="px" />
                        </a-form-item>
                        <a-form-item label="画布高度" name="height" rules={[{ required: false, message: '请输入画布高度！' }]}>
                            <a-input v-model:value={attr.height} prefix={<ColumnHeightOutlined />} suffix="px" />
                        </a-form-item>
                        <a-form-item label="主题颜色" name="color" rules={[{ required: false, message: '请输入主题颜色！' }]}>
                            <a-input type="color" v-model:value={state.color} onInput={input} prefix={<bg-colors-outlined />} suffix="rgb" allow-clear />
                        </a-form-item>
                        <a-form-item label="关于编辑器" name={'about'}>
                            <a-textarea v-model:value={state.about} placeholder="mu-sve-editor" />
                        </a-form-item>
                        <a-form-item name="remember" wrapper-col={{ offset: 8, span: 16 }}>
                            <a-checkbox v-model:checked={state.remember}>Remember me</a-checkbox>
                        </a-form-item>
                        <a-form-item wrapper-col={{ offset: 8, span: 16 }}>
                            <a-button type="primary" html-type="submit">确 定</a-button>
                        </a-form-item>
                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </aside >);
    }
});
