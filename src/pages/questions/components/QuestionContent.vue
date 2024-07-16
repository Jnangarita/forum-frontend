<template>
  <div class="main-container q-pa-md">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ data.question?.questionTitle }}</p>
      </div>
      <div class="col-4 flex-end question-btn">
        <q-btn
          :label="$t('makeQuestion')"
          :no-caps="true"
          class="question-btn"
          color="primary"
        />
      </div>
      <div class="display-flex">
        <div class="margin-left-5">
          <span class="opacity-info">{{ `${$t("created")}` }}</span>
          <span>{{ data.question?.created }}</span>
        </div>
        <div class="margin-left-5">
          <span class="opacity-info">{{ `${$t("modified")}` }}</span>
          <span>{{ data.question?.modified }}</span>
        </div>
        <div class="margin-left-5">
          <span class="opacity-info">{{ `${$t("views")}` }}</span>
          <span>{{ data.question?.views }}</span>
        </div>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row">
      <ul class="list-info">
        <li>
          <q-btn
            :color="data.question?.like ? 'positive' : 'grey'"
            :outline="!data.question?.like"
            :text-color="data.question?.like ? 'white' : 'dark'"
            class="margin-bottom-10"
            icon="las la-thumbs-up"
            round
          />
        </li>
        <li>
          <p class="likes">
            {{ data.question?.numberOfLikes }}
          </p>
        </li>
        <li>
          <q-btn
            :color="data.question?.dislike ? 'negative' : 'grey'"
            :outline="!data.question?.dislike"
            :text-color="data.question?.dislike ? 'white' : 'dark'"
            class="margin-bottom-10"
            icon="las la-thumbs-down"
            round
          />
        </li>
        <li>
          <q-btn
            :color="data.question?.saved ? 'primary' : 'white'"
            :text-color="data.question?.saved ? 'white' : 'dark'"
            class="margin-bottom-10"
            icon="las la-bookmark"
            round
            unelevated
          />
        </li>
      </ul>
      <div class="col q-pa-md">
        <p class="text-align-justify">
          {{ data.question?.questionContent }}
        </p>
        <div class="display-flex">
          <router-link :to="'/question/category'">
            <q-btn
              v-for="category in data.question?.categories"
              :key="category.id"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";

const { data, getData } = useGetData();
const API_GET_QUESTION = "/home/questionOne.json";

onMounted(() => {
  getData(API_GET_QUESTION, "question");
});
</script>
<style scoped>
.list-info {
  list-style-type: none;
  padding: 0 0.5rem 1rem 0.5rem;
}

.likes {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>