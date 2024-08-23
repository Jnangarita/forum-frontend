<template>
  <div class="main-container q-pa-md">
    <p class="main-title">{{ $t("popularQuestions") }}</p>
    <div
      v-for="question in data.question"
      :key="question.id"
      class="display-flex margin-bottom-5"
    >
      <span class="margin-right-5">
        <q-avatar rounded size="1.3rem">
          <img
            :alt="$t('userImg')"
            :src="question.photo"
            @error="util.imageHandling.onImageError($event)"
          />
          <q-tooltip>{{ question.userName }}</q-tooltip>
        </q-avatar>
      </span>
      <span>{{ question.questionTitle }}</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";
import { util } from "src/utils/functions";

const { data, getData } = useGetData();
const API_GET_POPULAR_QUESTIONS = "/v1/topics/popular";

onMounted(() => {
  getData(API_GET_POPULAR_QUESTIONS, "question");
});
</script>