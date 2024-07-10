<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ $t("allQuestions") }}</p>
        <span style="font-size: 1rem">
          {{ `${data.questions?.totalQuestions} preguntas` }}
        </span>
      </div>
      <div class="col-4 flex-end" style="height: 2rem">
        <q-btn :label="$t('makeQuestion')" :no-caps="true" color="primary" />
      </div>
    </div>
    <QuestionContainer :arrQuestions="data.questions?.questionsList" />
    <div class="q-gutter-md pagination">
      <q-pagination style="margin-left: auto"
        active-color="primary"
        color="grey"
        direction-links
        flat
        max-pages="5"
        max="10"
        v-model="current"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";
import QuestionContainer from "src/pages/home/components/QuestionContainer.vue";

const API_GET_QUESTIONS = "/home/question.json";
const { data, getData } = useGetData();
const current = ref(3);
const arrNumber = [10, 20, 30];

onMounted(() => {
  getData(API_GET_QUESTIONS, "questions");
});
</script>