import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
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
  },
  removeUserToken(state) {
    state.token = ''
    removeToken()
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const getters = {}
const actions = {
  // login(context, data) {
  //   return new Promise((resolve, reject) => {
  //     login(data).then(res => {
  //       context.commit('setToken', res)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  async login({ commit }, data) {
    const res = await login(data)
    commit('setToken', res)
    return res
  },
  // getUserInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getUserInfo().then(res => {
  //       commit('setUserInfo', res)
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
  async getUserInfo({ commit }) {
    const res = await getUserInfo()
    const baseInfo = await getUserDetailById(res.userId)
    const baseResult = { ...res, ...baseInfo } // 将两个接口结果合并
    commit('setUserInfo', baseResult)
    return baseResult
  },
  logout({ commit }) {
    commit('removeUserToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    commit('removeUserInfo') // 删除用户信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
