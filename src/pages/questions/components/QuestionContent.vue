<template>
  <div class="main-container q-pa-md">
    <div class="row justify-between title-container">
      <div class="col-7">
        <p class="main-title">{{ question?.questionTitle }}</p>
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
          <span class="margin-left-3">
            {{ util.timeElapsed(question?.createdAt) }}
          </span>
        </div>
        <div class="margin-left-5">
          <span class="opacity-info">{{ `${$t("modified")}` }}</span>
          <span class="margin-left-3">
            {{ util.timeElapsed(updateDate(question)) }}
          </span>
        </div>
        <div class="margin-left-5">
          <span class="opacity-info">{{ `${$t("views")}` }}</span>
          <span class="margin-left-3">{{ question?.views }}</span>
        </div>
      </div>
    </div>
    <q-separator></q-separator>
    <div class="row">
      <ul class="list-info">
        <li>
          <q-btn
            :color="question?.like > 0 ? 'positive' : 'grey'"
            :outline="!(question?.like > 0)"
            :text-color="question?.like > 0 ? 'white' : 'dark'"
            class="margin-bottom-10"
            icon="las la-thumbs-up"
            round
          />
        </li>
        <li>
          <p class="likes">{{ question?.like }}</p>
        </li>
        <li>
          <q-btn
            :color="question?.dislike ? 'negative' : 'grey'"
            :outline="!question?.dislike"
            :text-color="question?.dislike ? 'white' : 'dark'"
            class="margin-bottom-10"
            icon="las la-thumbs-down"
            round
          />
        </li>
        <li>
          <q-btn
            :color="question?.saved ? 'primary' : 'white'"
            :text-color="question?.saved ? 'white' : 'dark'"
            class="margin-bottom-10"
            icon="las la-bookmark"
            round
            unelevated
          />
        </li>
      </ul>
      <div class="col q-pa-md">
        <p class="text-align-justify">{{ question?.questionContent }}</p>
        <div class="display-flex">
          <router-link
            v-for="category in question?.categories"
            :key="category.id"
            :to="util.goToAnotherScreen('CategoryPage', category.value)"
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
        <div>
          <div class="row justify-between">
            <div class="col-7 display-flex">
              <p>{{ $t("follow") }}</p>
            </div>
            <div class="user-container">
              <p class="margin-bottom-1">
                {{ util.timeElapsed(question?.createdAt) }}
              </p>
              <div class="display-flex">
                <q-avatar rounded size="50px">
                  <img
                    :alt="$t('userImg')"
                    :src="util.validateImageNull(question?.photo)"
                    @error="util.onImageError($event)"
                  />
                </q-avatar>
                <div class="margin-left-5">
                  <router-link
                    :to="{
                      name: 'UserView',
                      params: {
                        id: question?.id,
                        userName: util.formatUrl(question?.userName),
                      },
                    }"
                    class="no-underline"
                  >
                    <p class="margin-bottom-1 user-title">
                      {{ question?.userName }}
                    </p>
                  </router-link>
                  <p class="margin-bottom-1 font-weight-bold">
                    {{ question?.reputation }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useQuestionStore } from "../store/questionStore";
import { useRoute } from "vue-router";
import { util } from "src/utils/functions";

const questionStore = useQuestionStore();
const question = computed(() => questionStore.question);
const route = useRoute();

const updateDate = (date) => {
  return date.updatedAt ?? date.createdAt;
};

onMounted(() => {
  questionStore.fetchQuestionInfo(route.params.id);
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

.user-container {
  background: #d3e2fa;
  border-radius: var(--border-radius);
  padding: 0.5rem 0.5rem 0.7rem 0.5rem;
  width: 200px;
}
</style>