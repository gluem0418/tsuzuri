<template>
  <span class="emotion-tag">{{ inside }}</span>
</template>

<script lang="ts" setup>

const props = defineProps({
  inside: { type: String },
});


</script>

<style scoped>
.emotion-tag {
  display: inline-block;
  background-color: #F4BAAA;
  border-radius: 8px;
  padding: 2px 12px;
  margin-right: 8px;
  font-size: 14px;
}
</style>