<script setup lang="ts" name="a-color">
import { ref } from 'vue'
import { ColorPicker } from 'vue3-colorpicker';
import "vue3-colorpicker/style.css";

const props: any = defineProps({
    pureColor: {
        type: String,
        default: 'rgba(0%, 0%, 0%, 0)',
    },
    gradientColor: {
        type: String,
        default: ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)"),
    },
    format: {
        type: String,
        default: 'prgb',
        required: false, //是否必传
        validator: (value) => {
            return ["rgb", "prgb", "hex", "hex6", "hex3", "hex4", "hex8", "name", "hsl", "hsv"].includes(value);
        }
    },
    suffix: {
        type: String,
        default: 'rgba',    // 后缀名
    },
    allow_clear: {
        type: Boolean,
        default: true,  // 是否清除按扭？
    },
    change: {
        type: Function,
        default: () => { },
    },
    isWidget: {
        type: Boolean,
        default: false, // 是否为弹出式图层组件？
        required: false,
    }
});

// const change = defineEmits(["onChange"])

const update = (color: string) => {
    props.change(color);
    // change('onChange', color);
};

</script>

<template>
    <span class="ant-input-affix-wrapper">
        <span class="ant-input-prefix"><bg-colors-outlined /></span>
        <ColorPicker class="mupiao" :format="props.format" shape="square" useType="both"
            v-model:pureColor="props.pureColor" @update:pureColor="update" @update:gradientColor="update"
            v-model:gradientColor="props.gradientColor" />
        <span class="ant-input-suffix">
            <span tabindex="-1" v-if="props.allow_clear"
                class="anticon ant-input-clear-icon-has-suffix ant-input-clear-icon"
                @click="props.change('rgba(0%, 0%, 0%, 0)')">
                <close-circle-outlined />
            </span>
            {{ suffix }}</span>
    </span>
</template>

<style scoped lang="less" >
.ant-input-affix-wrapper {
    position: relative;

    :deep(.vc-color-wrap) {
        width: 100%;
    }
}
</style>