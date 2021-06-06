import Vuex from 'vuex';

// export const state = () => ({
//   user: {
//     loggedIn: false,
//     data: null
//   }
// });

// export const getters = () => ({
//   user (state) {
//     return state.user;
//   }
// });

// export const mutations = () => ({
//   SET_LOGGED_IN (state, value) {
//     state.user.loggedIn = value;
//   },
//   SET_USER (state, data) {
//     state.user.data = data;
//   }
// });

// export const actions = () => ({
//   async onAuthStateChagngedAction ({ commit }, { user }) {
//     commit('SET_LOGGED_IN', user !== null);
//     if (user) {
//       commit('SET_USER', {
//         displayName: user.displayName,
//         email: user.email,
//         idToken: await user.getIdToken(/* forceRefresh */ true)
//       });
//     } else {
//       commit('SET_USER', null);
//     }
//   }
// });

export default () => {
  return new Vuex.Store({
    state: {
      user: {
        loggedIn: false,
        data: null
      }
    },
    getters: {
      user (state) {
        return state.user;
      }
    },
    mutations: {
      SET_LOGGED_IN (state, value) {
        state.user.loggedIn = value;
      },
      SET_USER (state, data) {
        state.user.data = data;
      }
    },
    actions: {
      async onAuthStateChagngedAction ({ commit }, { user }) {
        commit('SET_LOGGED_IN', user !== null);
        if (user) {
          commit('SET_USER', {
            displayName: user.displayName,
            email: user.email,
            idToken: await user.getIdToken(/* forceRefresh */ true)
          });
        } else {
          commit('SET_USER', null);
        }
      }
    }
  });
};
