import { defineStore } from 'pinia';
import { ref } from 'vue';
import { util } from 'src/utils/functions';

export const useGlobalStore = defineStore('global', () => {
  const message = ref(util.notification.getMessage('messageAvailable'));

  return { message };
});