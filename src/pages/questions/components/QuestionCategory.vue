<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">
          {{ $t("questionCategory") }} [{{ categoryName }}]
        </p>
        <span class="num-questions">
          {{
            `${data.questions?.totalQuestions} ${$t("questions").toLowerCase()}`
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
import { constants } from "src/utils/constants";
import { onMounted, ref, watch } from "vue";
import { useGetData } from "src/composables/useGetData";
import { useRoute } from "vue-router";
import QuestionContainer from "src/components/QuestionContainer.vue";

const { data, getData } = useGetData();
const current = ref(3);
const route = useRoute();
const categoryName = ref(route.params.title);

watch(
  () => route.params.title,
  (newCategory) => {
    categoryName.value = newCategory;
  }
);

onMounted(() => {
  getData(constants.API_GET_QUESTIONS, "questions");
});
</script>