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
        <component :is="type" v-if="'line' === type" :x1="style.x" :y1="style.y" :x2="style.x2" :y2="style.y2"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray">
        </component>

        <component :is="type" v-else-if="'rect' === type" :x="style.x" :y="style.y" :width="style.width"
            :height="style.height" :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray"></component>

        <component :is="type" v-else-if="'ellipse' === type" :cx="style.x" :cy="style.y" :rx="style.rx" :ry="style.ry"
            :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray"></component>

        <component :is="type" v-else-if="'path' === type" :d="attr.d" :fill="style.fill" :stroke="style.stroke"
            :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray">
        </component>

        <component :is="type" v-else-if="'polyline' === type" :points="attr.points" :fill="style.fill"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray">
        </component>

        <component :is="type" v-else-if="'text' === type" :x="style.x" :y="style.y" :fill="style.fill"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :text-anchor="style.text_anchor"
            :dominant-baseline="style.dominant_baseline">{{
                attr.text
            }}</component>
    </template>

    <template v-else-if="2 === info.event">
        <component :is="type" :x="style.x" :y="style.y" :width="style.width" :height="style.height"
            :href="getLocalFile(`icon/tool/${attr.icon}.webp`)"></component>
    </template>
</template>
