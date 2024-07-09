<template>
  <q-page>
    <div class="row q-pa-md">
      <div class="container">
        <ExploreQuestions />
      </div>
      <div class="col">
        <HotQuestions />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ExploreQuestions from "../components/ExploreQuestions.vue";
import HotQuestions from "../components/HotQuestions.vue";
</script>