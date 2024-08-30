import { defineStore } from 'pinia';

export const useGloblaStore = defineStore('global', {
  state: () => ({
    message: 'Mensaje no disponible'
  }),
});