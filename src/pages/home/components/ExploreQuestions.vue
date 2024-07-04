<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <p class="main-title">{{ $t("exploreQuestions") }}</p>
      <q-btn :label="$t('makeQuestion')" color="primary"></q-btn>
    </div>
    <div
      v-for="question in data"
      :key="question.questionId"
      class="question-container"
    >
      <q-separator></q-separator>
      <div class="row">
        <div class="col-3 q-pa-md">
          <p class="text-align-end">{{ question.votes + " " + $t("votes") }}</p>
          <p class="text-align-end">
            {{ question.answers + " " + $t("answers") }}
          </p>
          <p class="text-align-end">{{ question.views + " " + $t("views") }}</p>
        </div>
        <div class="col-5 q-pa-md">
          <router-link
            :to="'/question/' + question.questionId"
            class="question-link"
          >
            <p class="question-title">{{ question.questionTitle }}</p>
          </router-link>
          <q-btn
            :label="question.category"
            dense
            color="blue-3"
            text-color="dark"
          />
        </div>
        <div class="col-4 q-pa-md align-content-center">
          <p>
            <q-avatar rounded size="20px">
              <img
                src="https://cdn.quasar.dev/img/boy-avatar.png"
                :alt="$t('userImg')"
              />
            </q-avatar>
            {{ question.user + " " + question.time }}
          </p>
        </div>
      </div>
    </div>
    <div class="more-questions">
      <q-btn :label="$t('searchMoreQuestions')" color="primary"></q-btn>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";

const { data, getData } = useGetData();

onMounted(() => {
  getData("/home/question.json");
});
</script>
<style scope>
.title-container {
  padding: 16px 16px 16px 16px;
}

.question-title {
  font-size: 17px;
  font-weight: bold;
}

.question-link {
  color: inherit;
  text-decoration: none;
}

.question-link:hover {
  color: #66b3ff;
}

.more-questions {
  display: flex;
  justify-content: end;
  padding: 0px 15px 15px 0px;
}
</style>