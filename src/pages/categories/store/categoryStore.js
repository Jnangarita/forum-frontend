import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useCategoryStore = defineStore('categoryStore', () => {
  const { data, getData } = useGetData();
  const categoryList = ref([]);
  const exploreCategories = ref([]);

  const fetchCategoryList = async () => {
    const API_GET_CATEGORIES_LIST = "/v1/categories";
    await getData(API_GET_CATEGORIES_LIST, "categoryList");
    categoryList.value = data.categoryList;
  };

  const fetchExploreCategories = async () => {
    const API_GET_EXPLORE_CATEGORIES = "/v1/categories/list";
    await getData(API_GET_EXPLORE_CATEGORIES, "exploreCategories");
    exploreCategories.value = data.exploreCategories;
  };

  return {
    fetchCategoryList,
    fetchExploreCategories,
    categoryList,
    exploreCategories
  }
});