import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR, isServer, isClient }) => {
  if (isHMR) { return; }

  if (isClient) {
    window.onNuxtReady((nuxt) => {
      createPersistedState({
        storage: window.sessionStorage
      })(store);
    });
  }
};
