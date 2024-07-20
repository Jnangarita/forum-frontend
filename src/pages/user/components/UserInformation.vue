<template>
  <div class="main-container user-info-container q-pa-md">
    <q-avatar rounded size="7rem">
      <img
        :alt="$t('userImg')"
        src="https://cdn.quasar.dev/img/boy-avatar.png"
      />
    </q-avatar>
    <div>
      <p class="title">{{ data.user?.userName }}</p>
      <q-badge
        class="badge-response font-weight-bold"
        color="grey-3"
        text-color="dark"
        style="margin: 0.5rem 0"
      >
        {{ data.user?.userRole }}
      </q-badge>
      <div class="task-list">
        <div class="task-item">
          <div class="num-container">
            <q-icon name="las la-question-circle" size="2rem" />
          </div>
          <span class="text-align-left">
            <span class="title">{{ data.user?.numberQuestions }}</span>
            <caption>
              {{
                $t("question")
              }}
            </caption>
          </span>
        </div>
        <div class="task-item">
          <div class="num-container">
            <q-icon name="las la-check-square" size="2rem" />
          </div>
          <span class="text-align-left">
            <span class="title">{{ data.user?.numberResponses }}</span>
            <caption>
              {{
                $t("answers")
              }}
            </caption>
          </span>
        </div>
      </div>
    </div>
    <div class="text-align-left">
      <p class="title">{{ $t("details") }}</p>
      <q-separator></q-separator>
      <div style="margin: 0.5rem 0 0 0">
        <p class="user-info">
          <span>{{ $t("userName") }}: </span>{{ data.user?.userName }}
        </p>
        <p class="user-info">
          <span>{{ $t("email") }}: </span>{{ data.user?.email }}
        </p>
        <p class="user-info">
          <span>{{ $t("status") }}: </span>{{ data.user?.status }}
        </p>
        <p class="user-info">
          <span>{{ $t("userRole") }}: </span>{{ data.user?.userRole }}
        </p>
        <p class="user-info">
          <span>{{ $t("country") }}: </span>{{ data.user?.country }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGetData } from "src/composables/useGetData";

const { data, getData } = useGetData();
const API_GET_USER = "/home/userInfo.json";

onMounted(() => {
  getData(API_GET_USER, "user");
});
</script>

<style scoped>
.user-info-container {
  border-radius: var(--border-radius);
  justify-content: center;
  text-align: center;
}

.title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.task-list {
  align-items: center;
  display: flex;
  justify-content: center;
}

.task-item {
  align-items: center;
  display: flex;
  margin: 0.5rem 1rem;
}

.num-container {
  background-color: var(--light-grey);
  border-radius: var(--border-radius);
  margin-right: 0.6rem;
  padding: 0.2rem 0.2rem;
}

.task-item q-icon {
  margin-right: 0.5rem;
}

.user-info {
  margin: 0.8rem 0 0 0;
}

.user-info span {
  font-weight: bold;
}
</style>