import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGetData } from 'src/composables/useGetData';

export const useHomeStore = defineStore('home', () => {
  const { data, getData } = useGetData();
  const categories = ref([]);

  const fetchCategories = async () => {
    const API_GET_CATEGORIES = "/v1/categories/list";
    await getData(API_GET_CATEGORIES, "categories");
    categories.value = data.categories;
  };

  return {
    fetchCategories,
    categories
  };
});