import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useUserStore = defineStore('userStore', () => {
  const { data, getData } = useGetData();
  const API_GET_USERS_LIST = "/v1/users";
  const userList = ref([]);

  const fetchUserList = async () => {
    await getData(API_GET_USERS_LIST, "userList");
    userList.value = data.userList;
  };

  return { fetchUserList, userList }
});