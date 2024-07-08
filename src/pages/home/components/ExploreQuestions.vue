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
            :unelevated="true"
            class="btn-category"
            color="blue-3"
            dense
            text-color="dark"
          />
        </router-link>
        <router-link :to="'/question/category'">
          <p class="display-contents">{{ $t("moreCategories") }}</p>
        </router-link>
      </div>
      <div class="col-4 flex-end" style="height: 2rem">
        <q-btn :label="$t('makeQuestion')" color="primary"></q-btn>
      </div>
    </div>
    <div
      v-for="question in data.questions"
      :key="question.questionId"
      class="question-container"
    >
      <q-separator></q-separator>
      <div class="row">
        <div class="col-3 q-pa-md">
          <p class="text-align-end">{{ question.votes + " " + $t("votes") }}</p>
          <p class="text-align-end">
            {{ question.answers + " " + $t("answers") }}
          </p>
          <p class="text-align-end">{{ question.views + " " + $t("views") }}</p>
        </div>
        <div class="col-9 q-pa-md">
          <router-link
            :to="'/question/' + question.questionId"
            class="question-link"
          >
            <p class="question-title">{{ question.questionTitle }}</p>
          </router-link>
          <q-btn
            :label="question.category"
            color="blue-3"
            dense
            text-color="dark"
          />
          <p class="flex-end">
            <q-avatar rounded size="20px">
              <img
                src="https://cdn.quasar.dev/img/boy-avatar.png"
                :alt="$t('userImg')"
              />
            </q-avatar>
            {{ question.user + " " + question.time }}
          </p>
        </div>
      </div>
    </div>
    <div class="more-questions">
      <q-btn :label="$t('searchMoreQuestions')" color="primary"></q-btn>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";

const API_GET_QUESTIONS = "/home/question.json";
const API_GET_CATEGORIES = "/home/category.json";
const { data, getData } = useGetData();

onMounted(() => {
  getData(API_GET_QUESTIONS, "questions");
  getData(API_GET_CATEGORIES, "categories");
});
</script>