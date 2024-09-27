import { defineStore } from 'pinia';
import { ref } from "vue";
import { useGetData } from 'src/composables/useGetData';

export const useUserStore = defineStore('user', () => {
  const { data, getData } = useGetData();
  const topPost = ref([]);
  const userInfo = ref({});
  const userList = ref([]);

  const fetchUserList = async () => {
    const API_GET_USERS_LIST = "/v1/users";
    await getData(API_GET_USERS_LIST, "users");
    userList.value = data.users;
  };

  const fetchTopPost = async (userId) => {
    const API_GET_TOP_POST = `/v1/posts?id=${userId}`;
    await getData(API_GET_TOP_POST, "topPost");
    topPost.value = data.topPost.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
  };

  const fetchUserDataById = async (userId) => {
    const API_GET_USER_INFO = `/v1/users/${userId}`;
    await getData(API_GET_USER_INFO, "userById");
    userInfo.value = data.userById;
  };

  const resetStore = () => {
    topPost.value = [];
    userInfo.value = {};
    userList.value = [];
  };

  return {
    fetchTopPost,
    fetchUserDataById,
    fetchUserList,
    resetStore,
    topPost,
    userInfo,
    userList
  }
});