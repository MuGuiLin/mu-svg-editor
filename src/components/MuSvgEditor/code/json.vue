<script setup lang="ts" name="Json">
import { ref, unref, watch, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';

import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const props: any = defineProps({
    prop: Object,
});

const { prop, prop: { svgCtrl, svgData } } = props;

const code = ref(``);

watch(() => unref(svgCtrl.showJson),
    (v) => {
        code.value = JSON.stringify(svgData);
    });

const change = (code) => {
    console.log(code);
};

const focus = (code) => {
    console.log(code);
};

const blur = (code) => {
    console.log(code);
};

// Codemirror EditorView instance ref
const view = shallowRef()
const ready = (payload) => {
    view.value = payload.view
};

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
    const state = view.value.state
    const ranges = state.selection.ranges
    const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
    const cursor = ranges[0].anchor
    const length = state.doc.length
    const lines = state.doc.lines
    // more state info ...
    // return ...
};

const ok = () => {
    const href = 'data:text;charset=utf-8,' + JSON.stringify(svgData);
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
            :indent-with-tab="true" :tab-size="2" :extensions="[javascript(), oneDark]" @ready="ready" @change="change"
            @focus="focus" @blur="blur" />

    </a-modal>
</template>
