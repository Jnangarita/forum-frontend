<template>
  <div class="main-container">
    <div class="q-pa-md category-header">
      <p class="main-title">{{ $t("categories") }}</p>
      <p>{{ $t("descriptionCategories") }}</p>
    </div>
    <div class="row justify-center q-pa-md">
      <ul class="category">
        <li v-for="category in data.categoryList" :key="category.id">
          <div class="category-container">
            <router-link :to="'/question/category'">
              <q-btn
                :label="category.categoryName"
                :no-caps="true"
                :unelevated="true"
                class="btn-category"
                color="grey-3"
                dense
                text-color="dark"
              />
            </router-link>
            <p class="description">{{ category.description }}</p>
            <div class="display-flex justify-between">
              <span>{{ category.numberQuestion }}</span>
              <span>{{ category.time }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";

const API_GET_CATEGORIES_LIST = "/home/categoryList.json";
const { data, getData } = useGetData();

onMounted(() => {
  getData(API_GET_CATEGORIES_LIST, "categoryList");
});
</script>