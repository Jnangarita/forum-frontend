<template>
  <div class="main-container q-pa-md">
    <p class="main-title">{{ $t("frequentQuestions") }}</p>
    <div
      v-for="question in data.question"
      :key="question.id"
      class="display-flex margin-bottom-5"
    >
      <span class="margin-right-5">
        <q-avatar rounded size="20px">
          <img
            :alt="$t('userImg')"
            src="https://cdn.quasar.dev/img/boy-avatar.png"
          />
        </q-avatar>
      </span>
      <span>{{ question.question }}</span>
    </div>
  </div>
</template>
<script setup>
import { useGetData } from "src/composables/useGetData";
import { onMounted } from "vue";

const API_GET_HOT_QUESTIONS = "/home/hotQuestion.json";
const { data, getData } = useGetData();

onMounted(() => {
  getData(API_GET_HOT_QUESTIONS, "question");
});
</script>