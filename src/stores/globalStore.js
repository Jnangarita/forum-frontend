import { defineStore } from 'pinia';
import { i18n } from 'boot/i18n';

const t = i18n.global.t;

export const useGloblaStore = defineStore('global', {
  state: () => ({
    message: t('messageAvailable')
  }),
});