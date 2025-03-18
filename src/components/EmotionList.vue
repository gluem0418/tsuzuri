<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>感情を選択</h2>
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
      <button @click="selectAndClose">選択</button>
      <button @click="close">キャンセル</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { type EmotionId, getEmotionName, emotions } from '@/utils/emotions';

const props = defineProps({
  show: Boolean,
  selectedEmotions: Array as () => EmotionId[],
});

const emit = defineEmits(['close', 'select']);

const emotionIds = Object.keys(emotions).map(Number) as EmotionId[];
// const selected = ref([...props.selectedEmotions]);

const selected = ref<EmotionId[]>([]); // 初期化を修正

onMounted(() => {
  selected.value = [...props.selectedEmotions]; // 初期値を設定
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
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  /* モーダルの幅を調整 */
  max-width: 800px;
  /* 最大幅を設定 */
}

.emotion-groups {
  display: flex;
  justify-content: space-between;
}

.emotion-group {
  width: 48%;
  /* 各グループの幅を調整 */
}
</style>