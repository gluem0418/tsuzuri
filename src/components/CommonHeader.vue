<template>
  <h2>{{ inside }}</h2>
</template>

<script lang="ts" setup>

const props = defineProps({
  inside: { type: String },
});


</script>

<style scoped>
h2 {
  margin: 0;
  /* padding-top:5px; */
  width: 100%;
  height: 48px;
  text-align: center;
  font-family: "ShipporiMincho-Bold";
  font-size: 24px;
  background: #B9EDF0;
  color: #1C2121;
}
</style>