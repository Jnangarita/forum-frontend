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
      :table-header-style="{ color: 'var(--primary-color)' }"
      class="q-pa-md"
      row-key="index"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props">
            <span>{{ props.row.index }}</span>
          </q-td>
          <q-td key="post" :props="props">
            <span>{{ props.row.post }}</span>
          </q-td>
          <q-td key="postType" :props="props">
            <span>{{ props.row.postType }}</span>
          </q-td>
          <q-td key="status" :props="props">
            <span>
              <q-badge
                :color="questionStatus(props.row.status) ? 'positive' : 'red-5'"
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
            <span>{{ formatDate(props.row.creationDate) }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { constants } from "src/utils/constants";
import { formatDate } from "src/utils/functions";
import { onMounted, ref } from "vue";
import { useGetData } from "src/composables/useGetData";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

const { data, getData } = useGetData();
const { t } = useI18n();
const route = useRoute();
const rows = ref([]);
const userId = route.params.id;
const API_GET_QUESTION_LIST = `/v1/posts?id=${userId}`;

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
    field: "post",
    headerStyle: "font-weight: bold",
    label: t("posts"),
    name: "post",
  },
  {
    align: "center",
    field: "postType",
    headerStyle: "font-weight: bold",
    label: t("postType"),
    name: "postType",
    sortable: true,
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