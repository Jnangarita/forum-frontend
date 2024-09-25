import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetData } from 'src/composables/useGetData';
import { util } from 'src/utils/functions';

export const useGlobalStore = defineStore('global', () => {
  const { data, getData } = useGetData();
  const message = ref(util.notification.getMessage('messageAvailable'));
  const questionList = ref([]);
  const categories = ref([]);

  const fetchQuestionList = async () => {
    const API_GET_QUESTIONS = '/v1/topics';
    await getData(API_GET_QUESTIONS, "questions");
    questionList.value = data.questions;
  };

  const fetchCategories = async () => {
    const API_GET_CATEGORIES = "/v1/categories/list";
    await getData(API_GET_CATEGORIES, "categories");
    categories.value = data.categories;
  };

  return {
    fetchCategories,
    fetchQuestionList,
    categories,
    message,
    questionList
  };
});