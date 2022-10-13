<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
    <h1>Hello SVG Editor！</h1>
    <a-button type="primary" shape="round" :size="'large'" @click="count++">
        <template #icon>
          <github-outlined />
        </template>
        count is {{ count }}
      </a-button>
</template>

<style scoped lang="scss" >

</style>