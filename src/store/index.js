import Vue from 'vue'
import Vuex from 'vuex'

// 引入封装的本地存储
import * as auth from '@/utils/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      auth.setUser(state.user)
    }
  },
  actions: {

  }
})
