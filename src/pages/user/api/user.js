import { forum } from 'boot/axios'

const PATH = "/v1/users"

const userApi = {
  /**
   * This api creates a user account
   * @returns
   */
  createUser: (data) => forum.post(`${PATH}`, data),
}
export { userApi };