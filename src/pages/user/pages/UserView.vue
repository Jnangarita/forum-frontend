<template>
  <q-page>
    <div class="row q-pa-md">
      <div style="width: 35%">
        <UserInformation />
      </div>
      <div class="col" style="margin-left: 1rem">
        <TopPosts />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import UserInformation from "../components/UserInformation.vue";
import TopPosts from "../components/TopPosts.vue";
</script>