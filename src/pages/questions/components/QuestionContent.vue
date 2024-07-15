<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">Nuevo contenedor</p>
      </div>
      <div class="col-4 flex-end question-btn">
        <q-btn
          :label="$t('makeQuestion')"
          :no-caps="true"
          class="question-btn"
          color="primary"
        />
      </div>
    </div>
    <QuestionContainer :arrQuestions="data.questions?.questionsList" />
    <div class="more-questions">
      <q-btn
        :label="$t('searchMoreQuestions')"
        :no-caps="true"
        color="primary"
      />
    </div>
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";
import QuestionContainer from "src/components/QuestionContainer.vue";

const API_GET_CATEGORIES = "/home/category.json";
const { data, getData } = useGetData();

onMounted(() => {
  getData(constants.API_GET_QUESTIONS, "questions");
  getData(API_GET_CATEGORIES, "categories");
});
</script>