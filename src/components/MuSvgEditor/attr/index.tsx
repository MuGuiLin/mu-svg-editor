import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, ref, reactive, onMounted, watch, defineEmits, defineExpose } from 'vue';
import { ColumnWidthOutlined, ColumnHeightOutlined } from '@ant-design/icons-vue';
import { canvasBackground } from '../config';

import styles from './style.module.less';

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

interface IState {
    activeKey: string,
    remember: boolean;
    color: string;
    about: string;
}

export default defineComponent({
    name: 'Attr',
    props: {
        prop: {
            type: Object,
            default: {}
        }
    },
    setup(props: { prop: any }) {
        const state = reactive<IState>({
            activeKey: Object.keys(props.prop.nowAttr.attr).length ? '1' : '2',
            color: '#1890FF',
            remember: true,
            about: 'Mu-SVG-Editor',
        });

        watch(() => props.prop?.nowAttr?.attr, (prop) => {
            state.activeKey = Object.keys(prop).length ? '1' : '2';
            // }, { deep: true, immediate: true });
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
        const { prop: { nowAttr: { id, attr, attr: { style, transform }, type, event, selected }, canvas }, state, tabicon, input, onFinish, onFinishFailed, onValuesChange }: any = this;
        return (<aside class={styles.attr}>
            <a-tabs v-model:activeKey={state.activeKey} centered>
                <a-tab-pane key="1" tab={[tabicon(1), '控件属性']} >
                    <a-form model={state} disabled={0 > selected}
                        name="controlAttr"
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
                        </a-row> */}
                        <a-form-item label="标识" name="id">
                            <a-input v-model:value={id} readonly prefix={<field-number-outlined />} placeholder="自动生成！" />
                        </a-form-item>
                        <a-form-item label="文本" name="text">
                            <a-input v-model:value={attr.text} prefix={<font-size-outlined />} placeholder="组件名称！" />
                        </a-form-item>
                        <a-form-item label="坐标X" name="x">
                            <a-input-number v-model:value={transform.x} prefix={<ColumnWidthOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="坐标Y" name="y">
                            <a-input-number v-model:value={transform.y} prefix={<ColumnHeightOutlined />} addon-after="px" />
                        </a-form-item>

                        {'ellipse' === type ? <>
                            <a-form-item label="宽度" name="width">
                                <a-input-number v-model:value={style.rx} prefix={<ColumnWidthOutlined />} min={1} addon-after="px" />
                            </a-form-item>
                            <a-form-item label="高度" name="height">
                                <a-input-number v-model:value={style.ry} prefix={<ColumnHeightOutlined />} min={1} addon-after="px" />
                            </a-form-item>
                        </> : <>{
                            style.width && <>
                                <a-form-item label="宽度" name="width">
                                    <a-input-number v-model:value={style.width} prefix={<ColumnWidthOutlined />} min={1} addon-after="px" />
                                </a-form-item>
                                <a-form-item label="高度" name="height">
                                    <a-input-number v-model:value={style.height} prefix={<ColumnHeightOutlined />} min={1} addon-after="px" />
                                </a-form-item>
                            </>
                        }</>}

                        <a-form-item label="旋转" name="rotate">
                            <a-input-number v-model:value={transform.rotate} prefix={<sync-outlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="缩放" name="scale">
                            <a-input-number v-model:value={transform.scale} prefix={<expand-alt-outlined />} min={0} step={0.01} addon-after="px" />
                        </a-form-item>
                        {
                            1 === event && <>
                                {
                                    'line' != type && <>
                                        <a-form-item label="填充" name="fill">
                                            <a-input type="color" v-model:value={style.fill} prefix={<bg-colors-outlined />} suffix="rgb" allow-clear />
                                        </a-form-item>
                                    </>
                                }
                                <a-form-item label="轮廓" name="stroke">
                                    <a-input type="color" v-model:value={style.stroke} prefix={<bg-colors-outlined />} suffix="rgb" allow-clear />
                                </a-form-item>
                                <a-form-item label="边框" name="stroke_width">
                                    <a-input-number v-model:value={style.stroke_width} prefix={<border-outlined />} min={0} addon-after="px" />
                                </a-form-item>
                                {'text' === type ? <>
                                    <a-form-item label="对齐" name="text_anchor">
                                        <a-select v-model:value={style.text_anchor} prefix={<bg-colors-outlined />}>
                                            <a-select-option value="start">start</a-select-option>
                                            <a-select-option value="middle">middle</a-select-option>
                                            <a-select-option value="end" >end</a-select-option>
                                            <a-select-option value="inherit">inherit</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="基线" name="dominant_baseline">
                                        <a-select v-model:value={style.dominant_baseline} >
                                            <a-select-option value="auto">auto</a-select-option>
                                            <a-select-option value="text-top">text-top</a-select-option>
                                            <a-select-option value="end" >end</a-select-option>
                                            <a-select-option value="text-bottom">text-bottom</a-select-option>
                                            <a-select-option value="alphabetic">alphabetic</a-select-option>
                                            <a-select-option value="ideographic">ideographic</a-select-option>
                                            <a-select-option value="middle">middle</a-select-option>
                                            <a-select-option value="central">central</a-select-option>
                                            <a-select-option value="mathematical">mathematical</a-select-option>
                                            <a-select-option value="hanging">hanging</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </> : <>
                                    <a-form-item label="线条" name="stroke_dasharray">
                                        <a-input-number v-model:value={style.stroke_dasharray} prefix={<dash-outlined />} min={0} addon-after="px" />
                                    </a-form-item>
                                    {'path' === type && <>
                                        <a-form-item label="路径" name={'path'}>
                                            <a-textarea v-model:value={attr.d} placeholder="path" />
                                        </a-form-item>
                                    </>
                                    }{'polyline' === type && <>
                                        <a-form-item label="路径" name={'polyline'}>
                                            <a-textarea v-model:value={attr.points} placeholder="path" />
                                        </a-form-item>
                                    </>
                                    }
                                </>}
                            </>
                        }

                    </a-form>
                </a-tab-pane>
                <a-tab-pane key="2" tab={[tabicon(2), '画布设置']}>
                    <a-form model={state}
                        name="canvasSetup"
                        layout="vertical"
                        autocomplete="off"
                        onValuesChange={onValuesChange}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <a-form-item label="画布宽度" name="width" rules={[{ required: false, message: '请输入画布宽度！' }]}>
                            <a-input-number v-model:value={canvas.width} prefix={<ColumnWidthOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="画布高度" name="height" rules={[{ required: false, message: '请输入画布高度！' }]}>
                            <a-input-number v-model:value={canvas.height} prefix={<ColumnHeightOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="画布背景" name="height" rules={[{ required: false, message: '请输选择画布背景！' }]}>
                            <a-select v-model:value={canvas.background} prefix={<ColumnHeightOutlined />} options={canvasBackground}></a-select>
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
