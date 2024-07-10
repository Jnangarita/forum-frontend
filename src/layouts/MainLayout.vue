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
import { useI18n } from "vue-i18n";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const { t } = useI18n();

    const linksList = [
      {
        title: t("home"),
        caption: t("home"),
        icon: "las la-home",
        link: "home",
      },
      {
        title: t("question"),
        caption: t("question"),
        icon: "las la-question",
        link: "questions",
      },
    ];

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>