import { forum } from 'boot/axios'

const PATH = "/v1/users"

const globalApi = {
  /**
   * This api returns user information
   * @returns
   */
  getUserInfo: (param) => forum.get(`${PATH}/${param}`),
}
export { globalApi };