<template>
  <div
    v-for="question in arrQuestions"
    :key="question.questionId"
    class="question-container"
  >
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
              title: util.formatting.formatUrl(question.questionTitle),
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
            :to="
              util.navigation.goToAnotherScreen('CategoryPage', category.value)
            "
          >
            <q-btn
              :label="category.value"
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
              :src="util.imageHandling.validateImageNull(question.photo)"
              @error="util.imageHandling.onImageError($event)"
            />
          </q-avatar>
          <div>
            <router-link
              :to="{
                name: 'UserView',
                params: {
                  id: question.userId,
                  userName: util.formatting.formatUrl(question.user),
                },
              }"
              class="no-underline"
            >
              <span class="margin-left-3">
                {{ question.user }}
              </span>
            </router-link>
            <span class="margin-left-3">
              {{ util.formatting.timeElapsed(question.creationDate) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { util } from "src/utils/functions";

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

<style scoped>
.question-container {
  padding: 0 1rem;
}
</style>