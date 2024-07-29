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
              <img alt="..." src="https://cdn.quasar.dev/img/avatar1.jpg" />
            </q-avatar>
            <q-icon name="arrow_drop_down" size="1rem" />
            <q-menu>
              <q-list dense>
                <q-item class="GL__menu-link">
                  <q-item-section>
                    <q-btn :no-caps="true" dense flat @click="logOut">
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
            v-for="link in essentialLinks"
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

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/authStore";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const leftDrawerOpen = ref(false);
    const router = useRouter();

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

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logOut,
    };
  },
});
</script>