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

// console.info(props);

</script>

<!-- <KeepAlive>
    <component is="input"></component>
</KeepAlive> -->

<template>
    <template v-if="1 === info.event">
        <line v-if="'line' === type" :class="[style.stroke_animation]" :x1="style.x" :y1="style.y" :x2="style.x2"
            :y2="style.y2" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray" :stroke-linecap="style.stroke_linecap">
        </line>

        <rect v-else-if="'rect' === type" :class="[style.stroke_animation]" :x="style.x" :y="style.y" :rx="style.rx"
            :ry="style.rx" :width="style.width" :height="style.height" :fill="style.fill" :stroke="style.stroke"
            :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray"></rect>

        <ellipse v-else-if="'ellipse' === type" :class="[style.stroke_animation]" :cx="style.x" :cy="style.y"
            :rx="style.rx" :ry="style.ry" :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray"></ellipse>

        <path v-else-if="'path' === type || 'pencil' === type" :class="[style.stroke_animation]" :d="attr.d"
            :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray" :stroke-linecap="style.stroke_linecap">
        </path>

        <polyline v-else-if="'polyline' === type" :class="[style.stroke_animation]" :points="attr.points"
            :fill="style.fill" :stroke="style.stroke" :stroke-width="style.stroke_width"
            :stroke-dasharray="style.stroke_dasharray" :stroke-linecap="style.stroke_linecap">
        </polyline>

        <text v-else-if="'text' === type" :x="style.x" :class="[style.stroke_animation]"
            :style="{ fontFamily: style.font_family }" :font-size="style.font_size" :y="style.y" :fill="style.fill"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :text-anchor="style.text_anchor"
            :dominant-baseline="style.dominant_baseline">{{
                attr.text
            }}</text>

        <component v-else :is="type" :class="[style.stroke_animation]" :fill="style.fill" :d="attr.d" :x="style.x"
            :y="style.y" :width="style.width" :height="style.height" :stroke="style.stroke"
            :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray"
            :stroke-linecap="style.stroke_linecap">
        </component>
    </template>

    <template v-else-if="2 === info.event">
        <path v-if="'path' === type" :class="[style.stroke_animation]" :d="attr.d" :fill="style.fill"
            :stroke="style.stroke" :stroke-width="style.stroke_width" :stroke-dasharray="style.stroke_dasharray"
            :stroke-linecap="style.stroke_linecap">
        </path>

        <component v-else :is="type" :class="[style.stroke_animation]" :x="style.x" :y="style.y" :width="style.width"
            :height="style.height" :href="getLocalFile(`icon/tool/${attr.icon}.webp`)"></component>
    </template>
</template>
