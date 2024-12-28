<template>
  <q-layout class="main-style" view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> {{ $t("appTitle") }} </q-toolbar-title>
        <div class="justify-end">
          <q-btn flat>
            <q-avatar>
              <img
                :alt="$t('userImg')"
                :src="util.validateImageNull(data.userById?.photo)"
                @error="util.onImageError($event)"
              />
            </q-avatar>
            <q-menu>
              <q-list dense style="min-width: 240px">
                <q-item clickable class="item-content margin-5">
                  <q-item-section avatar>
                    <q-avatar>
                      <img
                        :alt="$t('userImg')"
                        :src="util.validateImageNull(data.userById?.photo)"
                        @error="util.onImageError($event)"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <p class="display-contents">
                      {{ data.userById.profileName }}
                      <span class="opacity-info">
                        {{ data.userById.email }}
                      </span>
                    </p>
                  </q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item clickable class="item-content margin-5">
                  <q-item-section>
                    <router-link
                      :to="{
                        name: 'UserView',
                        params: {
                          id: userId,
                          userName: util.formatUrl(data.userById.profileName),
                        },
                      }"
                      class="no-underline link-color"
                    >
                      <p class="margin-bottom-1">
                        <q-icon name="las la-user" size="1.5rem" />
                        <span class="margin-left-5">{{ $t("profile") }}</span>
                      </p>
                    </router-link>
                  </q-item-section>
                </q-item>
                <q-item clickable class="item-content margin-5">
                  <q-item-section>
                    <router-link
                      :to="{ name: 'Settings' }"
                      class="no-underline link-color"
                    >
                      <p class="margin-bottom-1">
                        <q-icon name="las la-cog" size="1.5rem" />
                        <span class="margin-left-5">{{ $t("settings") }}</span>
                      </p>
                    </router-link>
                  </q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item class="GL__menu-link">
                  <q-item-section>
                    <q-btn
                      :no-caps="true"
                      class="margin-5"
                      color="red-5"
                      dense
                      @click="logOut"
                    >
                      {{ $t("logOut") }}
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :breakpoint="500"
      :width="215"
      bordered
      show-if-above
      v-model="leftDrawerOpen"
    >
      <q-scroll-area class="fit">
        <q-list>
          <EssentialLink
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { LocalStorage } from "quasar";
import { onMounted, ref } from "vue";
import { useAuthStore } from "src/stores/authStore";
import { useGetData } from "src/composables/useGetData";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { util } from "src/utils/functions";
import EssentialLink from "components/EssentialLink.vue";

const { data, getData } = useGetData();
const { t } = useI18n();
const authStore = useAuthStore();
const leftDrawerOpen = ref(false);
const router = useRouter();
const userId = localStorage.getItem("userId");
const PATH_GET_USER_INFO = `/v1/users/${userId}`;

const linksList = [
  {
    icon: "las la-home",
    link: "home",
    title: t("home"),
  },
  {
    icon: "las la-question",
    link: "questions",
    title: t("questions"),
  },
  {
    icon: "las la-tags",
    link: "categories",
    title: t("categories"),
  },
  {
    icon: "las la-user-friends",
    link: "users",
    title: t("users"),
  },
];

const logOut = () => {
  authStore.logout();
  router.push("/login");
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onMounted(async () => {
  await getData(PATH_GET_USER_INFO, "userById");
  if (data.userById) {
    LocalStorage.set("userInfo", data.userById);
  }
});
</script>
<style scoped>
.item-content {
  border-radius: var(--border-radius);
}

.margin-5 {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}

.link-color {
  color: black;
}
</style>