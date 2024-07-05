import { api } from 'boot/axios'
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export function useGetData() {
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
      console.error(t('errorGettingData'));
      error[key] = err.message || t('errorGettingData');
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