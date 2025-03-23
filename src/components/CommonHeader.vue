<template>
  <div class="header">
    <h2>{{ inside }}</h2>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  inside: { type: String },
});


</script>

<style scoped>

.header {
  position: fixed;
  inset:0;
}
h2 {
  margin: 0;
  width: 100%;
  height: 48px;
  text-align: center;
  font-family: "ShipporiMincho-Bold";
  font-size: 24px;
  background: #BAFCFF;
  color: #1C2121;
}
</style>