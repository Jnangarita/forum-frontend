<template>
  <q-item clickable tag="a" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EssentialLink",
  props: {
    icon: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    title: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    return {
      navigateTo() {
        router.push({ name: props.link });
      },
    };
  },
});
</script>