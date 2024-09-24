import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useQuestionStore = defineStore('questionStore', () => {
  const { data, getData } = useGetData();
  const API_GET_QUESTIONS = '/v1/topics';
  const questionList = ref([]);

  const fetchQuestionList = async () => {
    await getData(API_GET_QUESTIONS, "questionList");
    questionList.value = data.questionList;
  };

  return { fetchQuestionList, questionList }
});