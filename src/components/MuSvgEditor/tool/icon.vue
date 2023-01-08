<script setup lang="ts" name="Icon">
const { path, state, index }: any = defineProps({
    path: {
        type: String,
        default: '',
    },
    fill: {
        type: String,
        default: '',
    },
    state: {
        type: Object,
        default: {},
    },
    index: {
        type: Number,
        default: 0,
    },

});
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" version="1.1">
        <path :fill="fill ? fill : index === state.clickDraw ? state.clickFill : '#FFF'" :d="path"></path>
    </svg>
</template>

<style>

</style>