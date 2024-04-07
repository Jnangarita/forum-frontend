<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <p class="main-title">{{ $t("exploreQuestions") }}</p>
      <q-btn :label="$t('makeQuestion')" color="primary"></q-btn>
    </div>
    <div
      v-for="question in questionList"
      :key="question.questionId"
      class="question-container"
    >
    <q-separator></q-separator>
      <div class="row">
        <div class="col-3 q-pa-md">
          <p style="text-align: end">{{ question.votes + " " + $t("votes") }}</p>
          <p style="text-align: end">{{ question.answers + " " + $t("answers") }}</p>
          <p style="text-align: end">{{ question.views + " " + $t("views") }}</p>
        </div>
        <div class="col-5 q-pa-md">
          <router-link :to="'/question/' + question.questionId" class="question-link">
            <p class="question-title">{{ question.questionTitle }}</p>
          </router-link>
          <q-btn
            :label="question.category"
            dense
            color="blue-3"
            text-color="dark"
          />
        </div>
        <div class="col-4 q-pa-md" style="align-content: center">
          <p>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" :alt="$t('userImg')">
            </q-avatar>
            {{ question.user + " " + question.time }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { questions } from "src/pages/home/api/question"
import messages from "src/i18n/es/index"

export default defineComponent({
  name: "ExploreQuestions",

  setup() {
    const questionList = ref([]);

    function getQuestion(){
      questions
        .getQuestionList()
        .then((response) => {
          questionList.value = response.data;
        })
        .catch((response) => {
          console.error(messages.errorGettingQuestions, response);
        })
    }

    onMounted(() => {
      getQuestion();
    })

    return {
      questionList,
    };
  },
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
  color: #66B3FF;
}
</style>