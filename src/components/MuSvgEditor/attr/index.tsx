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
//     arr: Array
// });

interface IProps {
    width: number;
    height: number; //未设置默认值为undefined
    arr?: Array<any>;
    eame: 'A' | 'B' | 'C' // 限定父组件传 eame 的值
}

interface IState {
    activeKey: string,
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
            activeKey: '1',
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
        const ctrl = {
            id: Math.random(),
            x: 0.00,
            y: 0.00,
            scale: 0.00,
            rotate: 0.00,
        }
        return (<aside class={style.attr}>
            <a-tabs v-model:activeKey={state.activeKey} centered>
                <a-tab-pane key="1" tab={[tabicon(1), '控件属性']}>
                    <a-form model={state}
                        name="cancaSetup"
                        layout="horizontal"
                        autocomplete="off"
                        onValuesChange={onValuesChange}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        {/* <a-row>
                            <a-col span="12">
                                <a-form-item label="坐标X" name="x">
                                    <a-input-number v-model:value={ctrl.x} prefix={<ColumnWidthOutlined />} />
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="坐标Y" name="y">
                                    <a-input-number v-model:value={ctrl.y} prefix={<ColumnHeightOutlined />} />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <a-form-item label="宽度" name="width">
                                    <a-input-number v-model:value={ctrl.x} prefix={<ColumnWidthOutlined />} />
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="高度" name="height">
                                    <a-input-number v-model:value={ctrl.y} prefix={<ColumnHeightOutlined />} />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <a-form-item label="缩放" name="scale">
                                    <a-input-number v-model:value={ctrl.scale} prefix={<expand-alt-outlined />} />
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="旋转" name="rotate">
                                    <a-input-number v-model:value={ctrl.rotate} prefix={<sync-outlined />} />
                                </a-form-item>
                            </a-col>
                        </a-row> */}
                        <a-form-item label="标识" name="id">
                            <a-input v-model:value={ctrl.id} prefix={<field-number-outlined />} placeholder="自动生成！" />
                        </a-form-item>
                        <a-form-item label="名称" name="name">
                            <a-input v-model:value={ctrl.id} prefix={<field-number-outlined />} placeholder="自动生成！" />
                        </a-form-item>
                        <a-form-item label="坐标X" name="x">
                            <a-input-number v-model:value={ctrl.x} prefix={<ColumnWidthOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="坐标Y" name="y">
                            <a-input-number v-model:value={ctrl.y} prefix={<ColumnHeightOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="宽度" name="width">
                            <a-input-number v-model:value={ctrl.x} prefix={<ColumnWidthOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="高度" name="height">
                            <a-input-number v-model:value={ctrl.y} prefix={<ColumnHeightOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="缩放" name="scale">
                            <a-input-number v-model:value={ctrl.scale} prefix={<expand-alt-outlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="旋转" name="rotate">
                            <a-input-number v-model:value={ctrl.rotate} prefix={<sync-outlined />} addon-after="px" />
                        </a-form-item>
                    </a-form>
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
