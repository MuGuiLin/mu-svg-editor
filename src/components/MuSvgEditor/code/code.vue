<script setup lang="ts" name="Code">

import { ref, unref, watch, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';

import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

import { hookSeveSvg } from '../hook/operate';

const props: any = defineProps({
    prop: Object,
});

const { prop: { svgCtrl } } = props;
const code = ref(``);
const view = shallowRef();

const style = {
    width: '100%',
    height: '560px',
    wordBreak: 'normal',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap !important'
};

watch(() => unref(svgCtrl.showCode),
    (v) => {
        code.value = `<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
 <g>
  <title>background</title>
  <rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
  <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
  </g>
 </g>
 <g>
  <title>Layer 1</title>
 </g>
</svg>`;
    });

const change = (code: string) => {
    console.log(code);
};

const focus = (code: string) => {
    console.log(code);
};

const blur = (code: string) => {
    console.log(code);
};

const ready = (payload: any) => {
    view.value = payload.view;
    console.log('codemirror实例对象', payload);
};

const ok = () => {
    hookSeveSvg();
};

</script>
<template>
    <a-modal v-model:visible="svgCtrl.showCode" title="SVG代码" width="100%" wrap-class-name="full-modal" cancelText="关闭"
        okText="下载" @ok="ok">
        <codemirror v-model="code" placeholder="暂无SVG代码！" :style="style" :disabled="true" :indent-with-tab="true"
            :tab-size="4" :extensions="[html(), oneDark]" @ready="ready" @change="change" @focus="focus" @blur="blur" />
    </a-modal>
</template>
