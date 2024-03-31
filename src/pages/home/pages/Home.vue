<template>
  <q-page>
    <div class="row q-pa-md">
      <div style="width: 70%; margin-right: 25px">
        <ExploreQuestions />
      </div>
      <div class="col">
        <Categories />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Categories from "../components/Categories.vue";
import ExploreQuestions from "../components/ExploreQuestions.vue";

export default defineComponent({
  name: "HomePage",

  components: {
    Categories,
    ExploreQuestions,
  },
});
</script>

<style>
</style>