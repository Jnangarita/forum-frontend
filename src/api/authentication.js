import { forum } from 'boot/axios'

const PATH = "/auth/login"

const authLogin = {
  /**
   * This api returns the JWT token
   *
   * @returns {Promise<Object>}
   */
  authUser: (data) => forum.post(`${PATH}`, data),
}

export { authLogin };