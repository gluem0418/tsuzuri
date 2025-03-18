<template>
  <div>
    <ul>
      <li v-for="item in tsuzuriStore.tsuzuriList" :key="item.id"  @click="editTsuzuri(item.id)">
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

<script lang="ts" setup>
import { onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';
import { getEmotionName, type EmotionId } from '@/utils/emotions';

import { useTsuzuriStore } from '@/stores/tsuzuri';
const tsuzuriStore = useTsuzuriStore();

import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  tsuzuriStore.fetchTsuzuri();
  console.log('tsuzuriList', tsuzuriStore.tsuzuriList)
});

const parsedEmotions = (emotions: string): EmotionId[] => {
  return JSON.parse(emotions) as EmotionId[];
};

const editTsuzuri = (id: number) => {
  router.push(`/detail/${id}`);
};

</script>