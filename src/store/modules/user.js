import { login, getUserInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
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
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        commit('setUserInfo', res)
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
