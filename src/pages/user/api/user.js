import { forum } from 'boot/axios'

const PATH = "/v1/users"

const userApi = {
  /**
   * This API creates a user account
   *
   * @param {*} data - The payload required `(UserDTO)` for creating a user.
   * @returns {Promise<Object>}
   */
  createUser: (data) => forum.post(`${PATH}`, data),

  /**
   * This API updates the user data for the specified user ID.
   *
   * @param {*} userId - ID of the user to be updated.
   * @param {*} data - The payload required `(UpdateUserDTO)` for updating the user.
   * @returns {Promise<Object>}
   */
  updateUser: (userId, data) => forum.put(`${PATH}/${userId}`, data),

  /**
   * This API updates the password for the specified user ID.
   *
   * @param {*} userId - ID of the user whose password is to be updated.
   * @param {*} data - The payload required `(ChangePasswordDTO)` for updating the password.
   * @returns {Promise<Object>}
   */
  updatePassword: (userId, data) => forum.put(`${PATH}/passwords/${userId}`, data),

  /**
   * This API resets the user password for the given email
   *
   * @param {*} data - The payload required `(ResetPasswordDTO)` for reset the password.
   * @returns {Promise<Object>}
   */
  resetPassword: (data) => forum.post(`${PATH}/reset-password`, data),
}

export { userApi };