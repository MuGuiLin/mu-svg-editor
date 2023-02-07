import { ConfigProvider } from 'ant-design-vue';
import { defineComponent, ref, reactive, onMounted, watch, defineEmits, defineExpose } from 'vue';
import { ColumnWidthOutlined, ColumnHeightOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import Color from './color.vue'
import { canvasBackground, canvasBackSetup, strokeAnimations } from '../config';
import { getImageBase64 } from '../hook'

import styles from './style.module.less';
import './style.less';

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
    theme: string;
    about: string;
    update_loading?: boolean;
    background?: Array<any>;
    background_color?: string;
    background_image?: string;

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
            theme: '#1890FF',
            remember: true,
            about: 'Mu-SVG-Editor',
            update_loading: false,
            background: [],
            background_color: '',
            background_image: '',
        });

        watch(() => props.prop?.nowAttr?.attr, (prop) => {
            state.activeKey = Object.keys(prop).length ? '1' : '2';
            // }, { deep: true, immediate: true });
        });

        // 选项卡icon
        const tabicon = (tab = 1) => {
            return 1 === tab ? <control-outlined /> : <setting-outlined />;
        };
        // 主题色
        const input = ({ target }: Event | any) => {
            state.theme = target.value;
            console.log(ConfigProvider);
            // 注：只有在main.ts中使用了antd.variable.min.css这里才生效哦！！
            ConfigProvider.config({
                // prefixCls: 'mu-',
                theme: {
                    primaryColor: state.theme, // 全局主色
                    successColor: `#52c41a`, // 成功色
                    warningColor: `#faad14`, // 警告色
                    errorColor: `#f5222d`, // 错误色
                    infoColor: `#1890ff`,
                    processingColor: `#1890ff`,
                },
            });
        };
        const changeFill = (color: string) => {
            props.prop.nowAttr.attr.style.fill = color;
        };
        const changeStroke = (color: string) => {
            props.prop.nowAttr.attr.style.stroke = color;
        };
        const changeBackground = (color: string) => {
            console.log(color)
            props.prop.canvas.background = color;
        };
        const changeTheme = (color: string) => {
            state.theme = color;
        };
        // 画布背景图上传前检测
        const beforeUpload = (file: [any][number]) => {
            const type = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!type) {
                message.error('对不起：图片类型只能是.jpg、.png、.webp格式！');
            }
            const size = file.size / 1024 / 1024 < 2;
            if (!size) {
                message.error('对不起：图片大小不能超过2MB！');
            }
            return type && size;
        };
        // 画布背景图上传中检测
        const changeUpload = ({ file }: any) => {
            setTimeout(() => {
                if (file.status === 'uploading') {
                    state.update_loading = true;
                    return;
                }
                if (file.status === 'done') {
                    getImageBase64(file.originFileObj, (base64Url: string = file.thumbUrl) => {
                        state.background_image = base64Url || file.thumbUrl;
                        props.prop.canvas.background = `url(${base64Url || file.thumbUrl})`;
                        state.update_loading = false;
                    });
                }
                if (file.status === 'error') {
                    props.prop.canvas.background = `url(${file.thumbUrl})`;
                    state.update_loading = false;
                    // message.error('upload error');
                }
            }, 1000);
        };
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
            state,
            tabicon,
            input,
            changeFill,
            changeStroke,
            changeTheme,
            changeBackground,
            changeUpload,
            beforeUpload,
            onFinish,
            onFinishFailed,
            onValuesChange
        };
    },

    render() {
        const { prop: { nowAttr: { id, attr, attr: { style = { fill: '#FFFFFF' }, transform = { x: 0, y: 0, rotate: 0, scale: 1 } }, type, event, selected }, canvas }, state, tabicon, input, changeFill, changeStroke, changeBackground, changeTheme, changeUpload, beforeUpload, onFinish, onFinishFailed, onValuesChange }: any = this;
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
                        <a-form-item label="可见性" name="show">
                            <a-switch v-model:checked={attr.show} checked-children="在画布中显示" un-checked-children="在画布中隐藏" />
                        </a-form-item>
                        <a-form-item label="X坐标" name="x">
                            <a-input-number v-model:value={transform.x} prefix={<arrow-left-outlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="Y坐标" name="y">
                            <a-input-number v-model:value={transform.y} prefix={<arrow-up-outlined />} addon-after="px" />
                        </a-form-item>

                        {Reflect.has(style, 'x2') && <>
                            <a-form-item label="X终点" name="x2">
                                <a-input-number v-model:value={style.x2} prefix={<arrow-right-outlined />} addon-after="px" />
                            </a-form-item>
                            <a-form-item label="Y终点" name="y2">
                                <a-input-number v-model:value={style.y2} prefix={<arrow-down-outlined />} addon-after="px" />
                            </a-form-item>
                        </>}

                        {'rect' === type && <a-form-item label="圆角" name="rx">
                            <a-input-number v-model:value={style.rx} prefix={<radius-setting-outlined />} addon-after="px" />
                        </a-form-item>}

                        {'ellipse' === type ? <>
                            <a-form-item label="宽度" name="width">
                                <a-input-number v-model:value={style.rx} prefix={<ColumnWidthOutlined />} min={1} addon-after="px" />
                            </a-form-item>
                            <a-form-item label="高度" name="height">
                                <a-input-number v-model:value={style.ry} prefix={<ColumnHeightOutlined />} min={1} addon-after="px" />
                            </a-form-item>
                        </> : <>{style?.width && <>
                            <a-form-item label="宽度" name="width">
                                <a-input-number v-model:value={style.width} prefix={<ColumnWidthOutlined />} min={1} addon-after="px" />
                            </a-form-item>
                            <a-form-item label="高度" name="height">
                                <a-input-number v-model:value={style.height} prefix={<ColumnHeightOutlined />} min={1} addon-after="px" />
                            </a-form-item>
                        </>}</>}
                        <a-form-item label="旋转" name="rotate">
                            <a-input-number v-model:value={transform.rotate} prefix={<reload-outlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="缩放" name="scale">
                            <a-input-number v-model:value={transform.scale} prefix={<expand-alt-outlined />} min={0} step={0.01} addon-after="px" />
                        </a-form-item>
                        {'image' != type && <>{
                            'line' != type && <a-form-item label="填充" name="fill">
                                {/* <a-input type="color" v-model:value={style.fill} prefix={<bg-colors-outlined />} suffix="rgb" allow-clear /> */}
                                <Color v-model:pureColor={style.fill} change={changeFill} suffix="rgba" />
                            </a-form-item>
                        }
                            <a-form-item label="轮廓" name="stroke">
                                {/* <a-input type="color" v-model:value={style.stroke} prefix={<bg-colors-outlined />} suffix="rgb" allow-clear /> */}
                                <Color v-model:pureColor={style.stroke} change={changeStroke} suffix="rgba" />
                            </a-form-item>
                            <a-form-item label="边框" name="stroke_width">
                                <a-input-number v-model:value={style.stroke_width} placeholder="图形边框(轮廓)粗细！" prefix={<border-outlined />} min={0} addon-after="px" />
                            </a-form-item>
                            {'text' === type ? <>
                                <a-form-item label="字号" name="font_family">
                                    <a-select v-model:value={style.font_family} prefix={<bg-colors-outlined />}>
                                        <a-select-option value="黑体">黑体</a-select-option>
                                        <a-select-option value="宋体">宋体</a-select-option>
                                        <a-select-option value="楷体">楷体</a-select-option>
                                        <a-select-option value="NSimSun">新宋体</a-select-option>
                                        <a-select-option value="Segoe UI">微软雅黑</a-select-option>
                                        <a-select-option value="News706 BT">News706 BT</a-select-option>
                                        <a-select-option value="Times New Roman">Times New Roman</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="字号" name="font_size">
                                    <a-input-number v-model:value={style.font_size} placeholder="文字字号大小！" prefix={<font-size-outlined />} min={8} addon-after="px" />
                                </a-form-item>
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
                                {!style.stroke_animation && <a-form-item label="线形" name="stroke_dasharray">
                                    <a-input-number v-model:value={style.stroke_dasharray} placeholder="多个可用‘,’逗号隔开！" prefix={<dash-outlined />} min={0} addon-after="px" />
                                </a-form-item>
                                }

                                {style?.stroke_linecap && <a-form-item label="端点" name="stroke_linecap">
                                    <a-select v-model:value={style.stroke_linecap} >
                                        <a-select-option value="butt">butt</a-select-option>
                                        <a-select-option value="round">round</a-select-option>
                                        <a-select-option value="square" >square</a-select-option>
                                        <a-select-option value="inherit">inherit</a-select-option>
                                    </a-select>
                                </a-form-item>
                                }
                                <a-form-item label="动效" name="stroke_animation">
                                    <a-select v-model:value={style.stroke_animation} >
                                        {
                                            strokeAnimations.options.length && strokeAnimations.options.map((o) => <a-select-option value={o.value}>{o.label}</a-select-option>)
                                        }
                                    </a-select>
                                </a-form-item>
                                {'path' === type && <a-form-item label="路径" name={'path'}>
                                    <a-textarea v-model:value={attr.d} rows={6} placeholder="path" />
                                </a-form-item>
                                }
                                {'polyline' === type && <a-form-item label="路径" name={'polyline'}>
                                    <a-textarea v-model:value={attr.points} rows={6} placeholder="path" />
                                </a-form-item>
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
                        <a-divider style="margin: 0" >画布大小</a-divider>
                        <a-form-item label="画布宽度" name="width" rules={[{ required: false, message: '请输入画布宽度！' }]}>
                            <a-input-number v-model:value={canvas.width} prefix={<ColumnWidthOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-form-item label="画布高度" name="height" rules={[{ required: false, message: '请输入画布高度！' }]}>
                            <a-input-number v-model:value={canvas.height} prefix={<ColumnHeightOutlined />} addon-after="px" />
                        </a-form-item>
                        <a-divider orientation="center" style="margin: 0">背景设置</a-divider>
                        <a-form-item label="预设背景" name="background" rules={[{ required: false, message: '请输选择画布背景！' }]}>
                            <a-select v-model:value={canvas.background} options={canvasBackground}></a-select>
                        </a-form-item>
                        <a-form-item label="画布背景色" name="background_color" rules={[{ required: false, message: '请选择画布背景颜色！' }]}>
                            <Color pureColor={canvas.background} change={changeBackground} suffix="rgba" />
                        </a-form-item>
                        <a-form-item-rest label="画布背景图" name="background_image" rules={[{ required: false, message: '请上传画布背景图片！' }]}>
                            <a-upload v-model:file-list={state.background} max-count={1} name="background_image"
                                list-type="picture-card" class="avatar-uploader" show-upload-list="false"
                                action="http://localhost"
                                before-upload={beforeUpload}
                                onChange={changeUpload}>{
                                    state.background_image ? <img src={state.background_image} alt="avatar" /> : <div>
                                        {state.update_loading ? <loading-outlined /> : <picture-outlined />}
                                        <div class="ant-upload-text">选择背景图片</div>
                                    </div>}
                            </a-upload>
                            <a-select style="margin:5px 0 20px;width:100%;" v-model:value={canvas.backsetup} options={canvasBackSetup}></a-select>
                        </a-form-item-rest>
                        <a-form-item label="主题颜色" name="theme" rules={[{ required: false, message: '请选择主题颜色！' }]}>
                            <Color pureColor={state.theme} change={changeTheme} suffix="rgba" />
                            {/* <a-input type="color" v-model:value={state.theme} onInput={input} prefix={<bg-colors-outlined />} suffix="rgb" allow-clear /> */}
                        </a-form-item>
                        <a-form-item label="关于编辑器" name={'about'}>
                            <a-textarea v-model:value={state.about} placeholder="mu-sve-editor" />
                        </a-form-item>
                        {/* <a-form-item name="remember" wrapper-col={{ offset: 8, span: 16 }}>
                            <a-checkbox v-model:checked={state.remember}>Remember me</a-checkbox>
                        </a-form-item> */}
                        {/* <a-form-item wrapper-col={{ offset: 8, span: 16 }}>
                            <a-button type="primary" html-type="submit">确 定</a-button>
                        </a-form-item> */}
                    </a-form>
                </a-tab-pane>
            </a-tabs>
        </aside >);
    }
});
