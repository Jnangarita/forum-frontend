import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useCategoryStore = defineStore('category', () => {
  const { data, getData } = useGetData();
  const categoryList = ref([]);

  const fetchCategoryList = async () => {
    const API_GET_CATEGORIES_LIST = "/v1/categories";
    await getData(API_GET_CATEGORIES_LIST, "categoryList");
    categoryList.value = data.categoryList;
  };

  return { fetchCategoryList, categoryList }
});