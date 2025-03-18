<template>
  <div>
    <h2>{{ isEditMode ? 'tsuzuri 編集' : 'tsuzuri 登録' }}</h2>
    <div v-if="isViewMode">
      <div>
        <label>日付:</label>
        <span>{{ tsuzuri.tdate }}</span>
      </div>
      <div>
        <label>何があった？:</label>
        <span>{{ tsuzuri.what }}</span>
      </div>
      <div>
        <label>どのように？:</label>
        <span>{{ tsuzuri.how }}</span>
      </div>
      <div>
        <label>なぜ？:</label>
        <span>{{ tsuzuri.why }}</span>
      </div>
      <div>
        <label>感情:</label>
        <span>{{ selectedEmotionNames.join(', ') }}</span>
      </div>
      <button @click="enableEditMode">変更</button>
    </div>
    <form v-else @submit.prevent="saveTsuzuri">
      <div>
        <label for="tdate">日付:</label>
        <input type="date" id="tdate" v-model="tsuzuri.tdate" required />
      </div>
      <div>
        <label for="what">何があった？:</label>
        <textarea id="what" v-model="tsuzuri.what" required></textarea>
      </div>
      <div>
        <label for="how">どのように？:</label>
        <textarea id="how" v-model="tsuzuri.how"></textarea>
      </div>
      <div>
        <label for="why">なぜ？:</label>
        <textarea id="why" v-model="tsuzuri.why"></textarea>
      </div>
      <div>
        <label>感情:</label>
        <button type="button" @click="openEmotionModal">感情を選択</button>
        <div v-if="selectedEmotionNames.length > 0">
          選択中の感情: {{ selectedEmotionNames.join(', ') }}
        </div>
      </div>
      <button type="submit">{{ isEditMode ? '更新' : '登録' }}</button>
    </form>
    <EmotionModal :key="tsuzuri.emotion" :show="showEmotionModal" @close="closeEmotionModal" @select="selectEmotions"
      :selectedEmotions="emotionIds" />
  </div>
  <BottomNav />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';

import { useTsuzuriStore } from '@/stores/tsuzuri';
import { useRouter, useRoute } from 'vue-router';
import type { EmotionId } from '@/utils/emotions';
import EmotionModal from '@/components/EmotionList.vue';
import { getEmotionName } from '@/utils/emotions';
import type { CreateData } from '@/stores/tsuzuri';

const tsuzuriStore = useTsuzuriStore();
const router = useRouter();
const route = useRoute();

const isEditMode = computed(() => !!route.params.id);
const isViewMode = ref(false);

// const tsuzuri = ref<CreateData>()
  const tsuzuri = ref<CreateData>({
  userid: '',
  tdate: '',
  what: '',
  how: '',
  why: '',
  emotion: '[]', // 初期化を修正
});

let tsuzuriId: number;

onMounted(async () => {
  if (isEditMode.value) {
    tsuzuriId = Number(route.params.id);
    const existingTsuzuri = tsuzuriStore.tsuzuriList.find((item) => item.id === tsuzuriId);
    if (existingTsuzuri) {
      // tsuzuri.value = { ...existingTsuzuri };
      const { id, update_date, ...createData } = existingTsuzuri;
      tsuzuri.value = createData;
      isViewMode.value = true;
    } else {
      // エラーハンドリング: tsuzuri が見つからない場合
      router.push('/list');
    }
  }
  else {
    tsuzuri.value.userid = tsuzuriStore.userid!;
  }
});

const emotionIds = computed(() => {
  return JSON.parse(tsuzuri.value.emotion) as EmotionId[];
});

const saveTsuzuri = async () => {
  if (isEditMode.value) {
    await tsuzuriStore.updateTsuzuri(tsuzuri.value, tsuzuriId);
  } else {
    await tsuzuriStore.createTsuzuri(tsuzuri.value);
  }
  router.push('/list');
};

const showEmotionModal = ref(false);

const openEmotionModal = () => {
  showEmotionModal.value = true;
};

const closeEmotionModal = () => {
  showEmotionModal.value = false;
};

const selectEmotions = (emotions: EmotionId[]) => {
  tsuzuri.value.emotion = JSON.stringify(emotions);
};

const selectedEmotionNames = computed(() => {
  return emotionIds.value.map((id) => getEmotionName(id));
});

const enableEditMode = () => {
  isViewMode.value = false;
};
</script>