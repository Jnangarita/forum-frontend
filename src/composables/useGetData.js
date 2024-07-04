import { api } from 'boot/axios'
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export function useGetData() {
  const { t } = useI18n();
  const $q = useQuasar();
  const data = ref(null);
  const error = ref(null);

  const getData = async (url) => {
    $q.loading.show();
    try {
      const response = await api.get(url);
      data.value = response.data;
    } catch (err) {
      console.error(t('errorGettingData'));
      error.value = err.message || t('errorGettingData');
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