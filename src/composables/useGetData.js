import { api } from 'boot/axios'
import { reactive, ref } from 'vue';
import { showNotify } from 'src/utils/functions'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const useGetData = () => {
  const { t } = useI18n();
  const $q = useQuasar();
  const data = reactive({});
  const error = ref({});

  const getData = async (url, key) => {
    $q.loading.show();
    try {
      const response = await api.get(url);
      data[key] = response.data;
    } catch (err) {
      error[key] = err.message || t('errorGettingData');
      console.error(t('errorGettingData'), error[key]);
      showNotify($q, error[key], "red-2", "top-right");
    } finally {
      $q.loading.hide()
    }
  };

  return {
    data,
    error,
    getData,
  };
}

export { useGetData }