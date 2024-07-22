<template>
  <div class="main-container q-pa-md">
    <p class="main-title">{{ $t("posts") }}</p>
    <p>{{ $t("seeAllQuestionsAndAnswers") }}</p>
    <q-table
      :columns="columns"
      :hide-pagination="true"
      :no-data-label="$t('noDataFound')"
      :rows-per-page-options="[0]"
      :rows="rows"
      :table-header-style="{ color: 'var(--blue-color)' }"
      class="q-pa-md"
      row-key="index"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">
            <span>{{ props.row.index }}</span>
          </q-td>
          <q-td key="question" :props="props">
            <span>{{ props.row.question }}</span>
          </q-td>
          <q-td key="status" :props="props">
            <span>
              <q-badge
                :color="
                  questionStatus(props.row.status) ? 'positive' : 'negative'
                "
                class="badge-response"
              >
                {{
                  questionStatus(props.row.status)
                    ? $t("answered")
                    : $t("unanswered")
                }}
              </q-badge>
            </span>
          </q-td>
          <q-td key="creationDate" :props="props">
            <span>{{ props.row.creationDate }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";
import { useI18n } from "vue-i18n";

const { data, getData } = useGetData();
const API_GET_QUESTION_LIST = "/home/questionList.json";
const rows = ref([]);
const { t } = useI18n();

const columns = [
  {
    align: "left",
    field: "index",
    headerStyle: "font-weight: bold",
    label: t("number"),
    name: "index",
    sortable: true,
  },
  {
    align: "left",
    field: "question",
    headerStyle: "font-weight: bold",
    label: t("question"),
    name: "question",
  },
  {
    align: "center",
    field: "status",
    headerStyle: "font-weight: bold",
    label: t("status"),
    name: "status",
    sortable: true,
  },
  {
    align: "center",
    field: "creationDate",
    headerStyle: "font-weight: bold",
    label: t("creationDate"),
    name: "creationDate",
    sortable: true,
  },
];

const questionStatus = (param) => {
  return param === constants.STATUS_QUESTION_ANSWERED;
};

onMounted(async () => {
  await getData(API_GET_QUESTION_LIST, "questionList");
  if (data.questionList) {
    rows.value = data.questionList.map((item, index) => ({
      ...item,
      index: index + 1,
    }));
  }
});
</script>