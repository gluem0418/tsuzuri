<template>
  <CommonHeader class= 'header' :inside="'綴りノート'" />
  <div class="tsuzuriNote">
    <ul>
      <li class="tsuzuri-item" v-for="item in sortedTsuzuriList" :key="item.id">
        <div class="tsuzuri-header">
          <span class="title">{{ item.what }}</span>
          <span class="date">{{ item.tdate }}</span>
        </div>
        <div class="tsuzuri-emotion">
          <div class="emotion">
            <span v-for="emotionId in parsedEmotions(item.emotion)" :key="emotionId">
              <EmotionTag :inside="getEmotionName(emotionId)" />
            </span>
          </div>
          <div class="icon">
            <img :src="iconDetail" alt="note" @click="editTsuzuri(item.id)">
          </div>
        </div>
      </li>
    </ul>
  </div>
  <BottomNav />
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import CommonHeader from '@/components/CommonHeader.vue';
import BottomNav from '@/components/BottomNav.vue';
import EmotionTag from '@/components/EmotionTag.vue';
import { getEmotionName, type EmotionId } from '@/utils/emotions';

import iconDetail from "@/assets/img/detail.svg"

import { useTsuzuriStore } from '@/stores/tsuzuri';
const tsuzuriStore = useTsuzuriStore();

import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  tsuzuriStore.fetchTsuzuri();
  console.log('tsuzuriList', tsuzuriStore.tsuzuriList)
});

const sortedTsuzuriList = computed(() => {
  return [...tsuzuriStore.tsuzuriList].sort((a, b) => {
    return b.tdate.localeCompare(a.tdate);
  });
});

const parsedEmotions = (emotions: string): EmotionId[] => {
  return JSON.parse(emotions) as EmotionId[];
};

const editTsuzuri = (id: number) => {
  router.push(`/detail/${id}`);
};

</script>

<style scoped>
.header {
  position: fixed;
  inset:0;
}

.tsuzuriNote {
  background: #FFF2F2;
  margin-top: 48px;
  margin-bottom: 64px;
}

.tsuzuri-item {
  margin: 0 6px;
  border-bottom: 1px solid;
  padding: 14px 10px;
}

.tsuzuri-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-weight: bold;
}

.title {
  font-family: "MPLUSRounded1c-Medium";
  font-size: 20px;
}

.tsuzuri-emotion {
  display: flex;
  justify-content: space-between;
  /* margin-top: 8px; */
}

.icon {
  margin-top: 10px;
}
</style>
