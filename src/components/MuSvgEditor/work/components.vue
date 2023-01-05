<script setup lang="ts" name="Components">
import { markRaw } from 'vue';
import { getLocalFile } from '@/utils';

const props = defineProps({
    info: {
        type: Object as () => any,
        default: {},
    }
});

const { info, info: { attr, attr: { style }, type } } = props;

console.info(props);

</script>

<!-- <KeepAlive>
    <component is="input"></component>
</KeepAlive> -->

<template>
    <template v-if="1 === info.event">
        <component :is="type" v-if="'line' === type" :x1="attr.x" :y1="attr.y" :x2="attr.x2" :y2="attr.y2"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray">
        </component>

        <component :is="type" v-else-if="'rect' === type" :x="attr.x" :y="attr.y" :width="attr.width"
            :height="attr.height" :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray"></component>

        <component :is="type" v-else-if="'ellipse' === type" :cx="attr.x" :cy="attr.y" :rx="attr.x2" :ry="attr.y2"
            :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray"></component>

        <component :is="type" v-else-if="'path' === type || 'polyline' === type" :d="attr.d" :fill="style.fill"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray">
        </component>

        <component :is="type" v-else-if="'text' === type" :x="attr.x" :y="attr.y" :fill="style.fill"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :text-anchor="style.text_anchor"
            :dominant-baseline="style.dominant_baseline">{{
                attr.text
            }}</component>
    </template>

    <template v-else-if="2 === info.event">
        <component :is="type" :x="attr.x" :y="attr.y" :width="attr.width" :height="attr.height"
            :href="getLocalFile(`icon/tool/${attr.icon}.webp`)"></component>
    </template>
</template>
