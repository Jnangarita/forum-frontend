import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetData } from 'src/composables/useGetData';
import { util } from 'src/utils/functions';

export const useGlobalStore = defineStore('global', () => {
  const { data, getData } = useGetData();
  const countriesList = ref([]);
  const message = ref(util.notification.getMessage('messageAvailable'));
  const questionList = ref([]);

  const fetchQuestionList = async () => {
    const API_GET_QUESTIONS = '/v1/topics';
    await getData(API_GET_QUESTIONS, "questions");
    questionList.value = data.questions;
  };

  const fetchCountriesList = async () => {
    const API_GET_COUNTRIES = `/v1/locations/countries`;
    await getData(API_GET_COUNTRIES, "countries");
    countriesList.value = data.countries;
  };

  const resetStore = () => {
    countriesList.value = [];
    message.value = util.notification.getMessage('messageAvailable');
    questionList.value = [];
  };

  return {
    fetchCountriesList,
    fetchQuestionList,
    resetStore,
    countriesList,
    message,
    questionList
  };
});