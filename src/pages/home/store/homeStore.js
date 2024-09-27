import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetData } from 'src/composables/useGetData';

export const useHomeStore = defineStore('home', () => {
  const { data, getData } = useGetData();
  const categories = ref([]);
  const popularQuestions = ref([]);

  const fetchCategories = async () => {
    const API_GET_CATEGORIES = "/v1/categories/list";
    await getData(API_GET_CATEGORIES, "categories");
    categories.value = data.categories;
  };

  const fetchPopularQuestions = async () => {
    const API_GET_POPULAR_QUESTIONS = "/v1/topics/popular";
    await getData(API_GET_POPULAR_QUESTIONS, "questions");
    popularQuestions.value = data.questions;
  };

  const resetStore = () => {
    popularQuestions.value = [];
  };

  return {
    fetchCategories,
    fetchPopularQuestions,
    resetStore,
    categories,
    popularQuestions
  };
});