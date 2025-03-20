<template>
  <button :type="btnType" class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>

// type btnType = "button" | "anchor-link" | "nuxt-link";

const props = defineProps({
  btnType: {
    type: String as () => "submit" | "button",
    default: 'submit'
  }
});


</script>

<style scoped>
button {
  /* width: 100%; */
  width: 224px;
  height: 40px;
  font-size: 16px;
  background: #FFF2F2;
  border-radius: 16px;
  color: #1C2121;
  box-shadow: 0px 4px 4px #1C212150;
}
</style>