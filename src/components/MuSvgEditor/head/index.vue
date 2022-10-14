<script setup lang="ts">
import { ref, reactive, onMounted, defineEmits, defineExpose } from 'vue';
interface IState {

};

const props = withDefaults(defineProps({
    width: {
        type: Number,
        default: 1008,
        required: true,
        validator: (val: any) => val > 1008,
    },
    msg: String,
    arr: Array,
    obj: Function,
}), {
    msg: 'hello',
    arr: () => ['one', 'two'],
    obj: () => { return { a: 1 } }
});

const state: IState = reactive({

});

const emit = defineEmits(['xxx']);

emit("xxx", 6666);

onMounted(() => {

});

defineExpose({

});
</script>

<template>

</template>

<style scoped lang="less">

</style>