<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ $t("allQuestions") }}</p>
        <span class="num-questions">
          {{ `${questions?.totalQuestions} ${$t("questions").toLowerCase()}` }}
        </span>
      </div>
      <div class="col-4 flex-end">
        <q-btn
          :label="$t('makeQuestion')"
          :no-caps="true"
          class="question-btn"
          color="primary"
        />
      </div>
    </div>
    <QuestionContainer :arrQuestions="questions?.questionList" />
    <div class="q-gutter-md pagination">
      <q-pagination
        active-color="primary"
        class="margin-left-auto"
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
import { computed, onMounted, ref } from "vue";
import { useQuestionStore } from "../store/questionStore";
import QuestionContainer from "src/components/QuestionContainer.vue";

const current = ref(3);
const questionStore = useQuestionStore();
const questions = computed(() => questionStore.questionList);

onMounted(() => {
  questionStore.fetchQuestionList();
});
</script>