import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken() || ''
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  }
}
const getters = {}
const actions = {
  login(context, data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
        context.commit('setToken', res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
