import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useCategoryStore = defineStore('categoryStore', () => {
  const { data, getData } = useGetData();
  const API_GET_CATEGORIES_LIST = "/v1/categories";
  const categoryList = ref([]);

  const fetchCategoryList = async () => {
    await getData(API_GET_CATEGORIES_LIST, "categoryList");
    categoryList.value = data.categoryList;
  };

  return { fetchCategoryList, categoryList }
});