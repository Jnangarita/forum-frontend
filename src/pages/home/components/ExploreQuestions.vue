<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ $t("exploreQuestions") }}</p>
        <router-link :to="'/question/category'">
          <q-btn
            v-for="category in data.categories"
            :key="category.id"
            :label="category.category"
            :no-caps="true"
            :unelevated="true"
            class="btn-category"
            color="grey-3"
            dense
            text-color="dark"
          />
        </router-link>
        <router-link :to="'/question/category'" class="no-underline">
          <p class="display-contents">{{ $t("moreCategories") }}</p>
        </router-link>
      </div>
      <div class="col-4 flex-end question-btn">
        <q-btn :label="$t('makeQuestion')" :no-caps="true" color="primary" />
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
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";
import QuestionContainer from "src/pages/home/components/QuestionContainer.vue";

const API_GET_QUESTIONS = "/home/question.json";
const API_GET_CATEGORIES = "/home/category.json";
const { data, getData } = useGetData();

onMounted(() => {
  getData(API_GET_QUESTIONS, "questions");
  getData(API_GET_CATEGORIES, "categories");
});
</script>