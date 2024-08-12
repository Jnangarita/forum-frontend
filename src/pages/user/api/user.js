import { forum } from 'boot/axios'

const PATH = "/v1/users"

const userApi = {
  /**
   * This api creates a user account
   * @returns
   */
  createUser: (data) => forum.post(`${PATH}`, data),

  /**
   * This api updates the user
   * @returns
   */
  updateUser: (userId, data) => forum.put(`${PATH}/${userId}`, data),
}
export { userApi };