import { defineStore } from 'pinia';
import { util } from 'src/utils/functions';

export const useGloblaStore = defineStore('global', {
  state: () => ({
    message: util.notification.getMessage('messageAvailable')
  }),
});