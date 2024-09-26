<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ $t("exploreQuestions") }}</p>
        <router-link :to="'/question/category'">
          <q-btn
            v-for="category in categories"
            :key="category.id"
            :label="category.value"
            :no-caps="true"
            :unelevated="true"
            class="btn-category"
            color="grey-3"
            dense
            text-color="dark"
          />
        </router-link>
        <router-link :to="{ name: 'categories' }" class="no-underline">
          <p class="display-contents">{{ $t("moreCategories") }}</p>
        </router-link>
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
    <QuestionContainer :arrQuestions="questions?.questionList" />
    <div class="more-questions">
      <router-link :to="{ name: 'questions' }">
        <q-btn
          :label="$t('searchMoreQuestions')"
          :no-caps="true"
          color="primary"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useGlobalStore } from "src/stores/globalStore";
import { useHomeStore } from "../store/homeStore";
import QuestionContainer from "src/components/QuestionContainer.vue";

const globalStore = useGlobalStore();
const homeStore = useHomeStore();
const questions = computed(() => globalStore.questionList);
const categories = computed(() => homeStore.categories);

onMounted(() => {
  globalStore.fetchQuestionList();
  homeStore.fetchCategories();
});
</script>