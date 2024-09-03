import { forum } from 'boot/axios'

const PATH = "/v1"

const globalApi = {
  /**
   * This api deletes a document from the user
   * @param {*} userCode
   * @param {*} fileName
   * @returns 
   */
  deleteDocument: (userCode, fileName) => forum.delete(`${PATH}/files/${userCode}/${fileName}`),
}
export { globalApi };