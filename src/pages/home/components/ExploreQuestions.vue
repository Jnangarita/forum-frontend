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
        <q-btn
          :label="$t('makeQuestion')"
          :no-caps="true"
          color="primary"
        ></q-btn>
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
          <p class="response-info">{{ question.votes + " " + $t("votes") }}</p>
          <p class="response-info">
            <q-badge
              v-if="question.answers !== 0"
              :outline="!toggleBorder(question.questionStatus)"
              class="badge-response"
              color="positive"
            >
              <q-icon
                class="q-ml-xs check-icon"
                name="las la-check"
                size="14px"
                v-show="toggleBorder(question.questionStatus)"
              />
              <span>{{ question.answers + " " + $t("answers") }}</span>
            </q-badge>
            <span v-else class="opacity-info">
              {{ question.answers + " " + $t("answers") }}
            </span>
          </p>
          <p class="response-info opacity-info">
            {{ question.views + " " + $t("views") }}
          </p>
        </div>
        <div class="col-9 q-pa-md">
          <router-link
            :to="'/question/' + question.questionId"
            class="question-link"
          >
            <p class="question-title">{{ question.questionTitle }}</p>
          </router-link>
          <div class="display-block">
            <q-btn
              v-for="category in question.categories"
              :key="category.id"
              :label="category.name"
              :no-caps="true"
              :unelevated="true"
              class="btn-category"
              color="blue-3"
              dense
              text-color="dark"
            />
          </div>
          <div class="flex-end margin-top-5">
            <q-avatar rounded size="20px">
              <img
                :alt="$t('userImg')"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-avatar>
            <div>
              <span class="margin-left-3 info-user">{{ question.user }}</span>
              <span>{{ question.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="more-questions">
      <q-btn
        :label="$t('searchMoreQuestions')"
        :no-caps="true"
        color="primary"
      ></q-btn>
    </div>
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";

const API_GET_QUESTIONS = "/home/question.json";
const API_GET_CATEGORIES = "/home/category.json";
const { data, getData } = useGetData();

const toggleBorder = (questionStatus) => {
  return (
    questionStatus !== undefined &&
    questionStatus === constants.QUESTION_ANSWERED
  );
};

onMounted(() => {
  getData(API_GET_QUESTIONS, "questions");
  getData(API_GET_CATEGORIES, "categories");
});
</script>