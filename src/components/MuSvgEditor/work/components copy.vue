<script setup lang="ts">
import { markRaw } from 'vue';
const { template, attr } = defineProps({
    template: {
        type: String as () => any,
        default: '',
    },
    attr: {
        type: Object as () => any,
        default: {},
    }
});
const is = markRaw({
    // props: ['propsAttr'],
    props: ['prop_data'],
    // emits: ['emitsPost'],
    template
});
console.info(is);
</script>

<template>
    <!-- <KeepAlive> -->
    <!-- <component :is="is" :props-attr="attr"></component> -->
    <component :is="is" :prop_data="attr"></component>
    <!-- </KeepAlive> -->
</template>
