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
          <div style="display: flex">
            <q-avatar rounded size="65px" style="margin-top: 4px">
              <img :alt="$t('userImg')" :src="user.photo" />
            </q-avatar>
            <div class="user-data">
              <p class="user-title">{{ user.userName }}</p>
              <p class="opacity-info">{{ user.city }}</p>
              <p class="opacity-info" style="font-weight: bold">
                {{ formatNumber(user.reputation) }}
              </p>
              <p style="color: var(--primary-color)">{{ user.category }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { formatNumber } from "src/utils/functions";
import { computed, onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";

const { data, getData } = useGetData();
const API_GET_USERS_LIST = "/home/user.json";
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

.user-title {
  color: var(--primary-color);
  font-size: 1rem;
}
</style>