import { api } from 'boot/axios'

const PATH = "/home"

const questions = {
  /**
   * This api gets list of questions
   * @returns
   */
  getQuestionList: () => api.get(`${PATH}/question.json`),
}
export {
  questions
};