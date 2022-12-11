<script setup lang="ts" >
const props = defineProps({
    is: {
        template: String as () => any,
        default: 'input',
    }
});
</script>

<template>
    <component :is="props.is"></component>
</template>


<style>

</style>