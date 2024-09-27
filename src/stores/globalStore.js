import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetData } from 'src/composables/useGetData';
import { util } from 'src/utils/functions';

export const useGlobalStore = defineStore('global', () => {
  const { data, getData } = useGetData();
  const message = ref(util.notification.getMessage('messageAvailable'));
  const questionList = ref([]);

  const fetchQuestionList = async () => {
    const API_GET_QUESTIONS = '/v1/topics';
    await getData(API_GET_QUESTIONS, "questions");
    questionList.value = data.questions;
  };

  const resetStore = () => {
    message.value = util.notification.getMessage('messageAvailable');
    questionList.value = [];
  };

  return { fetchQuestionList, resetStore, message, questionList };
});