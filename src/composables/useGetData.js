import { forum } from 'boot/axios';
import { reactive, ref } from 'vue';
import { useGlobalStore } from 'src/stores/globalStore';
import { useQuasar } from 'quasar';
import { util } from 'src/utils/functions';

export const useGetData = () => {
  const $q = useQuasar();
  const data = reactive({});
  const error = ref({});
  const store = useGlobalStore();

  /**
   * Fetches data from a given URL and updates the specified key in the data object.
   *
   * @param {string} url - The URL to fetch data from.
   * @param {string} key - The key in the data object where the fetched data will be stored.
   *
   * @example
   * // Example with composition API
   * <script setup>
   *  import { onMounted } from "vue";
   *  import { useGetData } from "src/composables/useGetData";
   *
   *  const { data, getData } = useGetData();
   *
   *  onMounted(async () => {
   *    await getData('/api/example', "example");
   *
   *    // Access the fetched data using `data.example`
   *    console.log(data.example);
   *  });
   * </script>
   */
  const getData = async (url, key) => {
    try {
      $q.loading.show();
      const response = await forum.get(url);
      data[key] = response.data;
    } catch (err) {
      util.notification.showNotify({ msg: store.message, bgColor: 'red-2' });
    } finally {
      $q.loading.hide()
    }
  };

  return { getData, data, error };
}