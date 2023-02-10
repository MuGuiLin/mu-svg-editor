<script setup lang="ts" name="Text">
const props = defineProps({
  attr: {
    type: Object as () => any,
    default: {},
  },
});

const {
  attr,
  attr: { style },
} = props;

</script>
<template>
  <text
    :x="style.x"
    :y="style.y"
    :class="[style.stroke_animation]"
    :font-family="style.font_family"
    :font-size="style.font_size"
    :font-weight="style.font_weight"
    :font-style="style.font_style"
    :fill="style.fill"
    :stroke="style.stroke"
    :stroke-width="style.stroke_width"
    :text-anchor="style.text_anchor"
    :dominant-baseline="style.dominant_baseline"
  >
    {{ attr.text }}
  </text>
</template>