<template>
  <div class="main-container">
    <div class="row justify-between title-container">
      <p class="main-title">Explora nuestras preguntas</p>
      <q-btn label="Hacer pregunta" color="primary"></q-btn>
    </div>
    <div
      v-for="question in questions"
      :key="question.questionId"
      class="question-container"
    >
    <q-separator></q-separator>
      <div class="row">
        <div class="col-3 q-pa-md">
          <p style="text-align: end">{{ question.votes }} Votos</p>
          <p style="text-align: end">{{ question.answers }} Respuestas</p>
          <p style="text-align: end">{{ question.views }} Vistas</p>
        </div>
        <div class="col-5 q-pa-md">
          <router-link :to="'/question/' + question.questionId" class="question-link">
            <p class="question-title">{{ question.questionTitle }}</p>
          </router-link>
          <q-btn
            :label="question.category"
            dense
            color="blue-3"
            text-color="dark"
          />
        </div>
        <div class="col-4 q-pa-md" style="align-content: center">
          <p>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="Avatar">
            </q-avatar>
            {{ question.user + " " + question.time }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

const questions = [
  {
    answers: 5,
    category: "Calculo",
    questionId: 1,
    questionTitle: "¿Cómo puedo aprender Vue.js?",
    time: "Hace 2 días",
    user: "John",
    views: 100,
    votes: 10,
  },
  {
    answers: 3,
    category: "Algebra",
    questionId: 2,
    questionTitle:
      "¿Cuál es la mejor manera de organizar componentes en Vue.js?",
    time: "Hace 1 semana",
    user: "Starling",
    views: 80,
    votes: 15,
  },
  {
    answers: 2,
    category: "Teoria de conjuntos",
    questionId: 3,
    questionTitle:
      "¿Cómo puedo implementar la autenticación con Firebase en Vue.js?",
    time: "Hace 3 semanas",
    user: "Maria",
    views: 50,
    votes: 8,
  }
];

export default defineComponent({
  name: "ExploreQuestionsComponent",

  setup() {
    return {
      questions,
    };
  },
});
</script>
<style scope>
.title-container {
  padding: 16px 16px 16px 16px;
}

.question-title {
  font-size: 17px;
  font-weight: bold;
}

.question-link {
  color: inherit;
  text-decoration: none;
}

.question-link:hover {
  color: #66B3FF;
}
</style>