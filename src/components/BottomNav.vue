<template>
  <nav>
    <img class="calendar" :src="imgCalendar" alt="calendar" @click="navigateTo('Calendar')">
    <img class="write" :src="imgWrite" alt="write" @click="navigateTo('Create')">
    <img class="note" :src="imgNote" alt="note" @click="navigateTo('List')">
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import imgCalendar from "@/assets/img/calendar.svg"
import imgWrite from "@/assets/img/write.svg"
import imgNote from "@/assets/img/note.svg"

const router = useRouter();

const navigateTo = (routeName: string) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /* height: 64px; */
  display: flex;
  justify-content: space-around;
  background-color: #BAFCFF;
  padding: 8px 0;
}

img {
  height:48px;
}
</style>