import { forum } from 'boot/axios'
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { util } from 'src/utils/functions'

const useGetData = () => {
  const { t } = useI18n();
  const $q = useQuasar();
  const data = reactive({});
  const error = ref({});

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
    $q.loading.show();
    try {
      const response = await forum.get(url);
      data[key] = response.data;
    } catch (err) {
      error[key] = err.message || t('errorGettingData');
      console.error(t('errorGettingData'), error[key]);
      util.notification.showNotify({
        hook: $q,
        msg: error[key],
        backgroundColor: 'red-2',
        language: (key) => t(key)
      });
    } finally {
      $q.loading.hide()
    }
  };

  return { data, error, getData };
}

export { useGetData }