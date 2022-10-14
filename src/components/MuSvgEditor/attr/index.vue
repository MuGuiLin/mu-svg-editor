<script setup lang="ts">
import { log } from 'console';
import { ref, reactive, onMounted, defineEmits, defineExpose } from 'vue';
interface IState {
    a: string;
};

// const props = withDefaults(defineProps({
//     width: {
//         type: Number,
//         default: 1008,
//         required: true,
//         validator: (val: any) => val > 1008,
//     },
//     height: Number,
//     activeKey: String,
// }), {
//     activeKey: '1',
//     height: 567,
// });

const state: IState = reactive({
    a: ''
});

const emit = defineEmits(['xxx']);

emit("xxx", 6666);

onMounted(() => {
    // console.log(props);
});

defineExpose({

});
</script>

<template>
    <aside class="mu-svg-editor-attr">
        
        <a-tabs >
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
                <a-form>
                    <a-form-item label="画布宽度" :rules="[{ required: true }]">
                        <a-input  :rules="[{ type: 'number', min: 1, max: 1008 }]"
                            placeholder="画布宽度" allow-clear />
                    </a-form-item>
                    <a-form-item label="画布高度" :rules="[{ required: true }]">
                        <a-input  :rules="[{ type: 'number', min: 1, max: 567 }]"
                            placeholder="画布高度" allow-clear />
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

</style>