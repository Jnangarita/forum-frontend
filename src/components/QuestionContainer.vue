<template>
  <div v-for="question in arrQuestions" :key="question.questionId">
    <q-separator></q-separator>
    <div class="row">
      <div class="col-3 q-pa-md">
        <p class="response-info">{{ `${question.votes} ${$t("votes")}` }}</p>
        <p class="response-info">
          <q-badge
            v-if="question.answers !== 0"
            :outline="!toggleBorder(question.questionStatus)"
            class="badge-response"
            color="positive"
          >
            <q-icon
              class="q-ml-xs check-icon"
              name="las la-check"
              size="14px"
              v-show="toggleBorder(question.questionStatus)"
            />
            <span>{{ `${question.answers} ${$t("answers")}` }}</span>
          </q-badge>
          <span v-else class="opacity-info">
            {{ `${question.answers} ${$t("answers")}` }}
          </span>
        </p>
        <p class="response-info opacity-info">
          {{ `${question.views} ${$t("views")}` }}
        </p>
      </div>
      <div class="col-9 q-pa-md">
        <router-link
          :to="{
            name: 'QuestionContainer',
            params: {
              id: question.questionId,
              title: formatUrl(question.questionTitle),
            },
          }"
          class="question-link"
        >
          <p class="question-title">{{ question.questionTitle }}</p>
        </router-link>
        <div class="display-block">
          <router-link
            v-for="category in question.categories"
            :key="category.id"
            :to="goToAnotherScreen('CategoryPage', category.name)"
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
        <div class="flex-end margin-top-5">
          <q-avatar rounded size="20px">
            <img
              :alt="$t('userImg')"
              src="https://cdn.quasar.dev/img/boy-avatar.png"
            />
          </q-avatar>
          <div>
            <router-link
              :to="{
                name: 'UserView',
                params: {
                  id: question.userId,
                  userName: formatUrl(question.user),
                },
              }"
              class="no-underline"
            >
              <span class="margin-left-3">
                {{ question.user }}
              </span>
            </router-link>
            <span class="margin-left-3">{{ question.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { defineProps } from "vue";
import { formatUrl, goToAnotherScreen } from "src/utils/functions";

const props = defineProps({
  arrQuestions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const toggleBorder = (questionStatus) => {
  return questionStatus === constants.STATUS_QUESTION_ANSWERED;
};
</script>