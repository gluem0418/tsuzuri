<template>
  <nav>
    <button @click="navigateTo('Calendar')">カレンダー</button>
    <button @click="navigateTo('Create')">登録</button>
    <button @click="navigateTo('List')">一覧</button>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  padding: 10px 0;
}
</style>