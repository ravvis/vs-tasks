import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initialState = function () {
  return {
    user: null,
    accessToken: "",
  };
};

export default new Vuex.Store({
  state: initialState(),
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    getUserFirstName(state) {
      return state.user?.name?.split(" ")[0];
    }
  },
  mutations: {
    SET_USER(state, user) {
      console.log("setting user", user);
      Vue.set(state, "user", user);
    },
    RESET_USER(state) {
      Vue.set(state, "user", initialState().user);
    },
    SET_ACCESS_TOKEN(state, token) {
      Vue.set(state, "accessToken", token);
    },
    RESET_ACCESS_TOKEN(state) {
      Vue.set(state, "accessToken", initialState().accessToken);
    }
  },
  actions: {
    async fetchUserInfo({ commit, state , dispatch}) {
      const response = await fetch(`${apiBaseUrl}/me`, {
        headers: {
          authorization: `Bearer ${state.accessToken}`
        }
      });
      let data = await response.json();
      console.log("data", data);
      dispatch("fetchAllTasks");
      commit("SET_USER", data.user);
    },
    async fetchAllTasks({ commit, state }) {
      const response = await fetch(`${apiBaseUrl}/getAllTasks`, {
        headers: {
          authorization: `Bearer ${state.accessToken}`
        }
      });
      let data = await response.json();
      console.log("tasks", data);
      // commit("SET_TASKS", data);
    },
    logout({ commit }) {
      commit("RESET_USER");
      commit("RESET_ACCESS_TOKEN");
    }
  }
});
