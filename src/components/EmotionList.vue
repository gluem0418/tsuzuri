<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>感情を選択して下さい（複数可）</h2>
      <div class="emotion-groups">
        <div class="emotion-group">
          <h3>ポジティブ</h3>
          <div v-for="id in positiveEmotionIds" :key="id">
            <label>
              <input type="checkbox" :value="id" v-model="selected" />
              {{ getEmotionName(id) }}
            </label>
          </div>
        </div>
        <div class="emotion-group">
          <h3>ネガティブ</h3>
          <div v-for="id in negativeEmotionIds" :key="id">
            <label>
              <input type="checkbox" :value="id" v-model="selected" />
              {{ getEmotionName(id) }}
            </label>
          </div>
        </div>
      </div>
      <div class="btnSec">
        <CommonBtn3 class='selectBtn' @click="selectAndClose" :btnType="'button'">選択</CommonBtn3>
        <CommonBtn3 class='cancelBtn' @click="close" :btnType="'button'">キャンセル</CommonBtn3>
      </div>
      <!-- <button @click="selectAndClose">選択</button>
      <button @click="close">キャンセル</button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { type EmotionId, getEmotionName, emotions } from '@/utils/emotions';

import CommonBtn3 from '@/components/CommonBtn3.vue'

const props = defineProps({
  show: Boolean,
  selectedEmotions: Array as () => EmotionId[],
});

const emit = defineEmits(['close', 'select']);

const emotionIds = Object.keys(emotions).map(Number) as EmotionId[];
// const selected = ref([...props.selectedEmotions]);

const selected = ref<EmotionId[]>([]); // 初期化を修正

onMounted(() => {
  // selected.value = [...props.selectedEmotions]; // 初期値を設定
  selected.value = [...(props.selectedEmotions || [])]; // props.selectedEmotions が undefined の場合に空の配列を代入
});

const positiveEmotionIds = computed(() => {
  return emotionIds.filter((id) => id < 100);
});

const negativeEmotionIds = computed(() => {
  return emotionIds.filter((id) => id >= 100);
});

const selectAndClose = () => {
  emit('select', selected.value);
  emit('close');
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 80%;
  /* モーダルの幅を調整 */
  max-width: 800px;
  /* 最大幅を設定 */
}

.emotion-groups {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
}

.emotion-group {
  width: 48%;
  /* 各グループの幅を調整 */
}

h2 {
  margin: 0;
  border-radius: 8px;
  padding-top: 5px;
  width: 100%;
  height: 40px;
  text-align: center;
  /* font-family: "ShipporiMincho-Bold"; */
  font-size: 20px;
  background: #BAFCFF;
  color: #1C2121;
}

h3 {
  margin-bottom:8px;
}
.btnSec {
  text-align:center;
  margin:16px auto;
}
.selectBtn {
  margin-right:40px;
}
</style>