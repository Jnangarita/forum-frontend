<template>
  <div class="main-container q-pa-md">
    <div class="q-pa-md category-header margin-left-5">
      <p class="main-title">{{ $t("categories") }}</p>
      <p class="margin-bottom-1">{{ $t("descriptionCategories") }}</p>
    </div>
    <div class="q-pa-md margin-left-5">
      <div class="q-gutter-y-md column input-size">
        <q-input dense outlined v-model="searchCategory">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <ul class="category">
        <li v-for="category in filteredCategories" :key="category.id">
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
              <span class="category-footer">
                {{
                  `${category.numberQuestion} ${$t("question").toLowerCase()}`
                }}
              </span>
              <span class="category-footer">{{ category.time }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";

const { data, getData } = useGetData();
const API_GET_CATEGORIES_LIST = "/home/categoryList.json";
const searchCategory = ref("");

onMounted(() => {
  getData(API_GET_CATEGORIES_LIST, "categoryList");
});

const filteredCategories = computed(() => {
  if (!searchCategory.value) {
    return data.categoryList;
  }
  return data.categoryList.filter((category) =>
    category.categoryName
      .toLowerCase()
      .includes(searchCategory.value.toLowerCase())
  );
});
</script>
<style scoped>
.category-header {
  width: 60%;
}

.input-size {
  max-width: 240px;
}

.category {
  display: contents;
  padding: 1.5rem;
}

.category li {
  border-radius: var(--border-radius);
  border: 1px solid #ccccce;
  height: 180px;
  list-style-type: none;
  margin: 0.8% 0.8% 0.8% 0.8%;
  width: 23.4%;
}

.category-container {
  height: 100%;
  padding: 1rem 1rem;
}

.category-footer {
  color: #707072;
  font-size: 0.8rem;
}
</style>