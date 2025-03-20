<template>
  <CommonHeader :inside="'綴る'" />
  <div class="detail">
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
      <div class="itemSec">
        <label for="tdate">◎いつの出来事ですか？</label>
        <RequiredTag />
        <input type="date" id="tdate" v-model="tsuzuri.tdate" required />
      </div>
      <div class="itemSec">
        <label for="what">◎何を思いましたか？</label>
        <RequiredTag />
        <div class="example">例：楽しかったけど、少し寂しくなった</div>
        <textarea id="what" v-model="tsuzuri.what" required></textarea>
      </div>
      <div class="itemSec">
        <label for="how">◎何をしていてそう思いましたか？</label>
        <div class="example">例：テレビドラマの最終回を観ていたとき</div>
        <textarea id="how" v-model="tsuzuri.how"></textarea>
      </div>
      <div class="itemSec">
        <label for="why">◎何故そのように思ったのでしょうか？</label>
        <div class="example">例：楽しみにしていたものが終わってしまうから</div>
        <textarea id="why" v-model="tsuzuri.why"></textarea>
      </div>
      <div class="emotionSec">
        <label>◎そのときはどんな気持ちでしたか？</label>
        <RequiredTag />
        <div v-if="selectedEmotionNames.length > 0">
          {{ selectedEmotionNames.join(', ') }}
        </div>
        <div class='selectBtn'>
          <CommonBtn2 :btnType="'button'" @click="openEmotionModal">感情を選択（複数可）</CommonBtn2>
        </div>
      </div>
      <button type="submit">{{ isEditMode ? '更新' : '登録' }}</button>
    </form>
    <EmotionModal :key="tsuzuri.emotion" :show="showEmotionModal" @close="closeEmotionModal" @select="selectEmotions"
      :selectedEmotions="emotionIds" />
  </div>
  <BackBtn class="backBtn"/>
  <BottomNav />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import RequiredTag from '@/components/RequiredTag.vue';
import CommonBtn2 from '@/components/CommonBtn2.vue'
import BackBtn from '@/components/BackBtn.vue'

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
    tsuzuri.value.tdate = new Date().toLocaleDateString('sv-SE')
  }
  console.log('Detail', tsuzuri.value)
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

<style scoped>
.detail {
  padding: 16px;
  background: #FFF2F2;
}

.itemSec {
  margin-bottom: 24px;
}

label {
  display: inline-block;
  margin-bottom: 4px;
}

input {
  display: block;
  height: 32px;
  width: 150px;
}

.example {
  font-size: 14px;
  margin-left: 2px;
  margin-bottom: 8px;
}

textarea {
  display: block;
  width: 100%;
  height: 120px;
  line-height: 1.5;
}

.emotionSec {
  background: #B9EDF0;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 24px;
}

.selectBtn {
  margin: 12px auto;
  text-align: center;
}

.backBtn {
  position: sticky;
  left:16px;
  bottom:16px;
}
</style>