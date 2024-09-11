import { api } from 'boot/axios'

const PATH = "/home"

const questions = {
  /**
   * This api gets list of questions
   *
   * @returns {Promise<Object>}
   */
  getQuestionList: () => api.get(`${PATH}/question.json`),
}

export { questions };