<script setup lang="ts" name="HelloWorld">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);

</script>

<template>
  <div class="hello">
    <h1><a href="https://github.com/MuGuiLin" target="_blank">
        <logout-outlined style="color: lime; font-weight: bold;" /> mu-svg-editor
      </a></h1>

    <h1>{{ msg }}</h1>

    <div class="card">
      <a-button type="primary" shape="round" :size="'large'" @click="count++">
        <template #icon>
          <github-outlined />
        </template>
        count is {{ count }}
      </a-button>
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
      starter
    </p>
    <p>
      Install
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped lang="less">
.hello {
  text-align: center;

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

  h1 {
    font-size: 2em;
    line-height: 2;
    color: wheat
  }

  button {
    margin: 20px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: #646cff;
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  p {
    font-size: 16px;
  }

  .card {
    padding: 2em;
  }

  .read-the-docs {
    color: #888;
  }
}
</style>
