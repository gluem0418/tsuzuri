<script lang="ts" setup>
import { onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';
import { useTsuzuriStore } from '@/stores/tsuzuri';
import { getEmotionName, type EmotionId } from '@/utils/emotions';

const tsuzuriStore = useTsuzuriStore();

onMounted(() => {
  const userid = localStorage.getItem('userid');
  tsuzuriStore.fetchTsuzuri(userid!);
  console.log('tsuzuriList', tsuzuriStore.tsuzuriList)
});

const parsedEmotions = (emotions: string): EmotionId[] => {
  return JSON.parse(emotions) as EmotionId[];
};
</script>

<template>
  <div>
    <ul>
      <li v-for="item in tsuzuriStore.tsuzuriList" :key="item.id">
        {{ item.tdate }}
        {{ item.what }}
        {{ item.how }}
        {{ item.why }}
        <span v-for="emotionId in parsedEmotions(item.emotion)" :key="emotionId">
          {{ getEmotionName(emotionId) }}
        </span>
      </li>
    </ul>
  </div>
  <BottomNav />
</template>