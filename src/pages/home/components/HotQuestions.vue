<template>
  <div class="main-container q-pa-md">
    <p class="main-title">{{ $t("popularQuestions") }}</p>
    <div
      v-for="question in questions"
      :key="question.id"
      class="display-flex margin-bottom-5"
    >
      <span class="margin-right-5">
        <q-avatar rounded size="1.3rem">
          <img
            :alt="$t('userImg')"
            :src="util.imageHandling.validateImageNull(question.photo)"
            @error="util.imageHandling.onImageError($event)"
          />
          <q-tooltip>{{ question.userName }}</q-tooltip>
        </q-avatar>
      </span>
      <span>{{ question.questionTitle }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useHomeStore } from "../store/homeStore";
import { util } from "src/utils/functions";

const homeStore = useHomeStore();
const questions = computed(() => homeStore.popularQuestions);

onMounted(() => {
  homeStore.fetchPopularQuestions();
});
</script>