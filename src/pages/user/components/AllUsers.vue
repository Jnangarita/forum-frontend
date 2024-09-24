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
                :src="util.imageHandling.validateImageNull(user.photo)"
                @error="util.imageHandling.onImageError($event)"
              />
            </q-avatar>
            <div class="user-data">
              <router-link
                :to="{
                  name: 'UserView',
                  params: {
                    id: user.id,
                    userName: util.formatting.formatUrl(user.userName),
                  },
                }"
                class="no-underline"
              >
                <p class="user-title margin-bottom-1">{{ user.userName }}</p>
              </router-link>
              <p class="opacity-info margin-bottom-1">{{ user.city }}</p>
              <p class="opacity-info font-weight-bold margin-bottom-1">
                {{ util.formatting.formatNumber(user.reputation) }}
              </p>
              <router-link
                v-for="(category, index) in user.category"
                :key="category"
                :to="
                  util.navigation.goToAnotherScreen('CategoryPage', category)
                "
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
import { useUserStore } from "../store/userStore";
import { util } from "src/utils/functions";

const searchUsers = ref("");
const userStore = useUserStore();
const userList = computed(() => userStore.userList);

const filteredUsers = computed(() => {
  if (!searchUsers.value) {
    return userList.value;
  }
  return userList.value.filter((user) =>
    user.userName.toLowerCase().includes(searchUsers.value.toLowerCase())
  );
});

onMounted(() => {
  userStore.fetchUserList();
});
</script>
<style scoped>
.user-data {
  margin-left: 10px;
}
</style>