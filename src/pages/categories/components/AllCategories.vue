<template>
  <div class="main-container q-pa-md">
    <div class="q-pa-md main-header margin-left-5">
      <p class="main-title">{{ $t("categories") }}</p>
      <p class="margin-bottom-1">{{ $t("descriptionCategories") }}</p>
    </div>
    <div class="q-pa-md margin-left-5">
      <div class="q-gutter-y-md column input-size">
        <q-input
          :label="$t('categoryName')"
          dense
          outlined
          v-model="searchCategory"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <ul class="unordered-list">
        <li
          v-for="category in filteredCategories"
          :key="category.id"
          class="category-list"
        >
          <div class="category-container">
            <router-link
              :to="
                util.navigation.goToAnotherScreen(
                  'CategoryPage',
                  category.categoryName
                )
              "
            >
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
                  `${category.numberQuestion} ${$t("questions").toLowerCase()}`
                }}
              </span>
              <span class="category-footer">
                {{ util.formatting.timeElapsed(category.time) }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useCategoryStore } from "../store/categoryStore";
import { util } from "src/utils/functions";

const searchCategory = ref("");
const categoryStore = useCategoryStore();
const categoryList = computed(() => categoryStore.categoryList);

const filteredCategories = computed(() => {
  if (!searchCategory.value) {
    return categoryList.value;
  }
  return categoryList.value.filter((category) =>
    category.categoryName
      .toLowerCase()
      .includes(searchCategory.value.toLowerCase())
  );
});

onMounted(() => {
  categoryStore.fetchCategoryList();
});
</script>
<style scoped>
.category-list {
  border-radius: var(--border-radius);
  border: 1px solid #ccccce;
  height: 180px;
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