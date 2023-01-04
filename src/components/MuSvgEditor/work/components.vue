<script setup lang="ts" name="Components">
import { markRaw } from 'vue';
import { getLocalFile } from '@/utils';

const props = defineProps({
    info: {
        type: Object as () => any,
        default: {},
    }
});

const { info, info: { attr } } = props;

console.info(props);

</script>

<!-- <KeepAlive>
    <component is="input"></component>
</KeepAlive> -->

<template>
    <component :is="info.type" v-if="1 === info.event && 'line' === info.type" :x1="attr.x" :y1="attr.y" :x2="attr.x2"
        :y2="attr.y2" :stroke="attr.style.stroke" :stroke-width="attr.style.stroke_width">
        {{ attr.text }}
    </component>
    <component :is="info.type" v-if="1 === info.event && 'rect' === info.type" :x="attr.x" :y="attr.y" :width="attr.x2"
        :height="attr.y2" :fill="attr.style.fill" :stroke="attr.style.stroke" :stroke-width="attr.style.stroke_width">
        {{ attr.text }}
    </component>
    <component :is="info.type" v-if="1 === info.event && 'ellipse' === info.type" :cx="attr.x" :cy="attr.y"
        :rx="attr.x2" :ry="attr.y2" :fill="attr.style.fill" :stroke="attr.style.stroke"
        :stroke-width="attr.style.stroke_width">
        {{ attr.text }}
    </component>
    <component :is="info.type" v-else-if="1 === info.event" :x="attr.x" :y="attr.y" :stroke="attr.style.stroke"
        :stroke-width="attr.style.stroke_width">
        {{ attr.text }}
    </component>
    <component :is="info.type" v-else-if="2 === info.event" :x="attr.x" :y="attr.y" :width="attr.width"
        :height="attr.height" :href="getLocalFile(`icon/tool/${attr.icon}.webp`)"></component>
</template>


