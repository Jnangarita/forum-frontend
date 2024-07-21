<template>
  <div class="main-container q-pa-md">
    <p class="main-title">{{ $t("posts") }}</p>
    <q-table :columns="userConstants.COLUMNS" :rows="rows" row-key="name" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";
import { userConstants } from "../utils/constants";

const { data, getData } = useGetData();
const API_GET_QUESTION_LIST = "/home/questionList.json";
const rows = ref([]);

onMounted(async () => {
  await getData(API_GET_QUESTION_LIST, "questionList");
  if (data.questionList) {
    rows.value = data.questionList;
  }
});
</script>