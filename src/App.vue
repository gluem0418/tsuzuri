<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
});
</script>

<style>

</style>