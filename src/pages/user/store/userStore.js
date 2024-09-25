import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useUserStore = defineStore('user', () => {
  const { data, getData } = useGetData();
  const userList = ref([]);

  const fetchUserList = async () => {
    const API_GET_USERS_LIST = "/v1/users";
    await getData(API_GET_USERS_LIST, "users");
    userList.value = data.users;
  };

  return { fetchUserList, userList }
});