<template>
  <div class="main-container q-pa-md">
    <div class="q-pa-md main-header margin-left-5">
      <p class="main-title margin-auto">{{ $t("users") }}</p>
    </div>
    <div class="q-pa-md margin-left-5">
      <div class="q-gutter-y-md column input-size">
        <q-input :label="$t('userName')" dense outlined v-model="searchUsers">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-pa-md">
      <ul class="unordered-list">
        <li v-for="user in filteredUsers" :key="user.id">
          <div class="display-flex">
            <q-avatar rounded size="65px" style="margin-top: 4px">
              <img
                :alt="$t('userImg')"
                :src="user.photo"
                @error="onImageError($event)"
              />
            </q-avatar>
            <div class="user-data">
              <router-link
                :to="{
                  name: 'UserView',
                  params: { id: user.id, userName: formatUrl(user.userName) },
                }"
                class="no-underline"
              >
                <p class="user-title">{{ user.userName }}</p>
              </router-link>
              <p class="opacity-info">{{ user.city }}</p>
              <p class="opacity-info font-weight-bold">
                {{ formatNumber(user.reputation) }}
              </p>
              <router-link
                v-for="(category, index) in user.category"
                :key="category"
                :to="goToAnotherScreen('CategoryPage', category)"
                class="no-underline"
              >
                <span>{{ category.value }}</span>
                <span v-if="index < user.category.length - 1">, </span>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import {
  formatNumber,
  formatUrl,
  goToAnotherScreen,
  onImageError,
} from "src/utils/functions";
import { useGetData } from "src/composables/useGetData";

const { data, getData } = useGetData();
const API_GET_USERS_LIST = "/v1/users";
const searchUsers = ref("");

const filteredUsers = computed(() => {
  if (!searchUsers.value) {
    return data.userList;
  }
  return data.userList.filter((user) =>
    user.userName.toLowerCase().includes(searchUsers.value.toLowerCase())
  );
});

onMounted(() => {
  getData(API_GET_USERS_LIST, "userList");
});
</script>
<style scoped>
.user-data {
  margin-left: 10px;
}

.user-data p {
  margin-bottom: 0;
}
</style>