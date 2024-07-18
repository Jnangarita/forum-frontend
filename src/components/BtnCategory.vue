<template>
  <div v-if="Array.isArray(categories)">
    <router-link
      v-for="category in categories"
      :key="category.id"
      :to="{
        name: 'CategoryPage',
        params: {
          title: formatUrl(category.name),
        },
      }"
    >
      <q-btn
        :label="category.name"
        :no-caps="true"
        :unelevated="true"
        class="btn-category"
        color="grey-3"
        dense
        text-color="dark"
      />
    </router-link>
  </div>
  <div v-else>
    <router-link
      :to="{
        name: 'CategoryPage',
        params: {
          title: formatUrl(categories),
        },
      }"
    >
      <q-btn
        :label="categories"
        :no-caps="true"
        :unelevated="true"
        class="btn-category"
        color="grey-3"
        dense
        text-color="dark"
      />
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatUrl } from "src/utils/functions";

const props = defineProps({
  arrCategories: {
    type: [Array, String],
    required: true,
  },
});

const categories = props.arrCategories;
</script>