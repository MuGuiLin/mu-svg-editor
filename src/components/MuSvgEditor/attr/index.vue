<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { log } from 'console';
import { ref, reactive, onMounted, defineEmits, defineExpose } from 'vue';

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

const props = withDefaults(defineProps<IProps>(), {
    width: 1008,
    height: 567,
    activeKey: '2',
    arr: () => [],
});

console.log(props);

const state: IState = reactive({
    color: '#1890FF'
});

const emit = defineEmits(['xxx']);

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

emit("xxx", 6666);

onMounted(() => {
    // console.log(props);
});

defineExpose({

});

</script>

<template>
    <aside class="mu-svg-editor-attr">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1">
                <template #tab>
                    <control-outlined />控件属性
                </template>
                单体
            </a-tab-pane>
            <a-tab-pane key="2">
                <template #tab>
                    <setting-outlined />画布设置
                </template>
                <a-form layout="vertical">
                    <a-form-item label="画布宽度" :rules="[{ required: true }]">
                        <a-input v-model:value="width" :rules="[{ type: 'number', min: 1, max: 1008 }]"
                            placeholder="画布宽度" allow-clear />
                    </a-form-item>
                    <a-form-item label="画布高度" :rules="[{ required: true }]">
                        <a-input v-model:value="height" :rules="[{ type: 'number', min: 1, max: 567 }]"
                            placeholder="画布高度" allow-clear />
                    </a-form-item>
                    <a-form-item label="主题颜色" :rules="[{ required: true }]">
                        <a-input type="color" :value="state.color" @input="input($event)" placeholder="主题颜色"
                            allow-clear />
                    </a-form-item>
                    <a-form-item :name="['user', 'about']" label="关于编辑器">
                        <a-textarea placeholder="mu-sve-editor" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{  span: 16 , offset: 8 }">
                        <a-button type="primary" html-type="submit">确 定</a-button>
                    </a-form-item>
                </a-form>
            </a-tab-pane>
        </a-tabs>
    </aside>
</template>

<style scoped lang="less">
.mu-svg-editor-attr {
    grid-area: attr;
    background-color: rgb(80, 80, 80);
    border-left: 1px solid rgb(100, 100, 100);
    box-shadow: -2px 0px 6px 0px rgba(30, 30, 30, .6);
    padding: 0 10px;
}
</style>