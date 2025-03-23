<template>
  <CommonHeader class='header' :inside="'綴りカレンダー'" />
  <div class="calendar">
    <VueDatePicker v-model="date" format="yyyy-MM-dd" locale="ja" week-start="0" :enable-time-picker="false" inline
      auto-apply :day-class="getDayClass" />
    <!-- <VueDatePicker v-model="date" format="yyyy/MM/dd" locale="ja" week-start="0" :day-class="getDayClass" /> -->
  </div>
  <BottomNav />
</template>

<script setup lang="ts">

import { ref } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import BottomNav from '@/components/BottomNav.vue';
import CommonHeader from '@/components/CommonHeader.vue';

const date = ref(new Date());

const getDayClass = (date: Date) => {
  const weekDay = new Date(date).getDay();
  if (weekDay == 6) {
    // 土曜日の場合、classに"saturday"を追加
    return 'saturday';
  }
  if (weekDay == 0) {
    // 日曜日の場合、classに"sunday"を追加
    return 'sunday';
  }
  return '';
};

</script>

<style scoped>
.header {
  position: fixed;
  inset:0;
}
.calendar {
  margin-top:48px;
  padding: 20px;
}
</style>

<style>
/* scopedの中には書かない */
.saturday {
  color: #0000ff;
}

.sunday {
  color: #ff0000;
}
</style>

<style scoped></style>
