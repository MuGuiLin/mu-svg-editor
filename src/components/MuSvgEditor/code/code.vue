<script setup lang="ts" name="Code">
import { ref } from 'vue';
import { hookSeveSvg } from '../hook/operate'
const props: any = defineProps({
    prop: Object,
});

const { prop, prop: { svgCtrl } } = props;

const ok = (e) => {
    hookSeveSvg();
};

const href = document.querySelector('#svg').outerHTML;

</script>
<template>
    <a-modal v-model:visible="svgCtrl.showCode" title="SVG代码" width="100%" wrap-class-name="full-modal" cancelText="关闭"
        okText="下载" @ok="ok">
        {{ href }}
    </a-modal>
</template>
