<script setup lang="ts" name="Json">
import { ref, unref, watch, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';

import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';

const props: any = defineProps({
    prop: Object,
    check: Object,
});

const { prop, prop: { svgCtrl, svgData } } = props;

const code = ref(``);
const view = shallowRef();

watch(() => unref(svgCtrl.showJson),
    (v) => {
        code.value = JSON.stringify(svgData, null, 4);
    });

const focus = (code: string) => {
    // console.log(code);
};

const blur = (code: string) => {
    // console.log(code);
};

const ready = (payload: any) => {
    view.value = payload.view;
    console.log('codemirror实例对象', payload);
};

const ok = () => {
    const href = 'data:text/json;charset=utf-8,' + encodeURIComponent(code.value);
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('download', `${new Date().getTime()}.json`);
    a.click();
    a.remove();
};

</script>
<template>
    <a-modal v-model:visible="svgCtrl.showJson" title="JSON数据" width="100%" wrap-class-name="full-modal" cancelText="关闭"
        okText="下载" @ok="ok">
        <codemirror v-model="code" placeholder="暂无JSON数据！" :style="{ height: '560px' }" :autofocus="true"
            :indent-with-tab="true" :tab-size="4" :extensions="[json(), oneDark]" @ready="ready" @change="props.check.json"
            @focus="focus" @blur="blur" />

    </a-modal>
</template>
