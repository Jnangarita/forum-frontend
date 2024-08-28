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

  /**
   * This api updates the password
   * @param {*} userId - The ID of the user whose password is to be updated.
   * @param {*} data - The payload required for updating the password.
   * @returns 
   */
  updatePassword: (userId, data) => forum.put(`${PATH}/passwords/${userId}`, data),
}
export { userApi };