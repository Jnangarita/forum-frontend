import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetData } from 'src/composables/useGetData';

export const useQuestionStore = defineStore('question', () => {
  const { data, getData } = useGetData();
  const question = ref({});

  const fetchQuestionInfo = async (userId) => {
    const API_GET_QUESTION_INFO = `/v1/topics/${userId}`;
    await getData(API_GET_QUESTION_INFO, "questionInfo");
    question.value = data.questionInfo;
  };

  return { fetchQuestionInfo, question }
});