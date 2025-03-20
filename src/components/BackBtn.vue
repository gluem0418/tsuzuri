<template>
  <img class="back" :src="imgBack" alt="back">
</template>

<script lang="ts" setup>
import imgBack from "@/assets/img/backButton.png"

</script>

<style scoped>
.required-tag {
  display: inline-block;
  background-color: #37E8F2;
  border-radius: 8px;
  padding: 2px 12px;
  margin-left: 16px;
  font-size: 14px;
}
</style>