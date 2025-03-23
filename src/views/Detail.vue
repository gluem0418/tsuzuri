<template>
  <CommonHeader class='header' :inside="'綴る'" />
  <div class="detail">
    <BackBtn class="backBtn" @click="goBack" />
    <div v-if="isViewMode">
      <label>◎ いつの出来事ですか？</label>
      <div class="itemView">{{ tsuzuri.tdate }}</div>
      <label>◎ 何を思いましたか？</label>
      <div class="itemView">{{ tsuzuri.what }}</div>
      <label>◎ 何をしていてそう思いましたか？</label>
      <div class="itemView">{{ tsuzuri.how }}</div>
      <label>◎ 何故そのように思ったのでしょうか？</label>
      <div class="itemView">{{ tsuzuri.why }}</div>
      <label>◎ そのときはどんな気持ちでしたか？</label>
      <div class="itemView" v-if="selectedEmotionNames.length > 0">
        <span v-for="emotion in selectedEmotionNames">
          <EmotionTag :inside="emotion" />
        </span>
      </div>
      <div class='changeBtn'>
        <CommonBtn2 :btnType="'button'"  @click="enableEditMode">変更</CommonBtn2>
      </div>
    </div>
    <form v-else @submit.prevent="saveTsuzuri">
      <div class="itemSec">
        <label for="tdate">◎ いつの出来事ですか？</label>
        <RequiredTag />
        <input type="date" id="tdate" v-model="tsuzuri.tdate" required />
      </div>
      <div class="itemSec">
        <label for="what">◎ 何を思いましたか？</label>
        <RequiredTag />
        <div class="example">例：楽しかったけど、少し寂しくなった</div>
        <textarea id="what" v-model="tsuzuri.what" required></textarea>
      </div>
      <div class="itemSec">
        <label for="how">◎ 何をしていてそう思いましたか？</label>
        <div class="example">例：テレビドラマの最終回を観ていたとき</div>
        <textarea id="how" v-model="tsuzuri.how"></textarea>
      </div>
      <div class="itemSec">
        <label for="why">◎ 何故そのように思ったのでしょうか？</label>
        <div class="example">例：楽しみにしていたものが終わってしまうから</div>
        <textarea id="why" v-model="tsuzuri.why"></textarea>
      </div>
      <div class="emotionSec">
        <label>◎ そのときはどんな気持ちでしたか？</label>
        <RequiredTag />
        <div class="emotion" v-if="selectedEmotionNames.length > 0">
          <span v-for="emotion in selectedEmotionNames">
            <EmotionTag :inside="emotion" />
          </span>
        </div>
        <div class='selectBtn'>
          <CommonBtn3 :btnType="'button'" @click="openEmotionModal">感情を選択（複数可）</CommonBtn3>
        </div>
      </div>
      <div class='submitBtn'>
        <CommonBtn2 :btnType="'submit'">{{ isEditMode ? '更新' : '登録' }}</CommonBtn2>
      </div>

    </form>
    <EmotionModal :key="tsuzuri.emotion" :show="showEmotionModal" @close="closeEmotionModal" @select="selectEmotions"
      :selectedEmotions="emotionIds" />

  </div>
  <BottomNav />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import BottomNav from '@/components/BottomNav.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import EmotionTag from '@/components/EmotionTag.vue';
import RequiredTag from '@/components/RequiredTag.vue';
import CommonBtn2 from '@/components/CommonBtn2.vue'
import CommonBtn3 from '@/components/CommonBtn3.vue'
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

const goBack = () => {
  router.push('/list');
}

</script>

<style scoped>
.header {
  position: fixed;
  inset:0;
}

.detail {
  margin-top:48px;
  margin-bottom: 64px;
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
  background: #FFFEF2;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 24px;
}

.emotion {
  margin-top: 8px;
}

.selectBtn {
  margin: 16px auto;
  text-align: center;
}

.backBtn {
  /* position: sticky; */
  position: fixed;
  left: 16px;
  bottom: 80px;
}

.submitBtn {
  margin: 0 auto;
  text-align: center;
  width: 70%;
}

.changeBtn {
  margin: 24px auto 8px;
  /* margin-top:32px; */
  text-align: center;
  width: 70%;
}

.itemView {
  margin-left: 20px;
  margin-bottom: 16px
}
</style>