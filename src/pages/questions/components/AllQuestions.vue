<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ $t("allQuestions") }}</p>
        <span class="num-questions">
          {{
            `${data.questions?.totalQuestions} ${$t("question").toLowerCase()}`
          }}
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
    <QuestionContainer :arrQuestions="data.questions?.questionsList" />
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
import { onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";
import QuestionContainer from "src/components/QuestionContainer.vue";

const API_GET_QUESTIONS = "/home/question.json";
const { data, getData } = useGetData();
const current = ref(3);

onMounted(() => {
  getData(API_GET_QUESTIONS, "questions");
});
</script>
<style scoped>
.num-questions {
  font-size: 1rem;
}

.margin-left-auto {
  margin-left: auto;
}
</style>