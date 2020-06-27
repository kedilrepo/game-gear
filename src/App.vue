<template>
  <div id="app">
    <v-app>
      <router-view :key="$route.path" />
      <VuetifyFooter />
    </v-app>
  </div>
</template>
<script>
import VuetifyFooter from "@/components/VuetifyFooter.vue";
export default {
  components: {
    VuetifyFooter
  }
};
</script>

<style lang="scss">
$mobileWidth: 700px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

p {
  color: darkslategrey;
  font-weight: 300;
  margin: 0 10px 0 10px;
  text-align: left;
  white-space: pre-line;

  @media (min-width: $mobileWidth) {
    margin: 0 0 0 20px;
  }
}

img {
  justify-content: center;
  max-width: 500px;
  height: auto;

  @media (min-width: $mobileWidth) {
    height: auto;
    width: 100;
    max-width: 400px;
    max-height: 600px;
  }
}

.background {
  padding: 0;
  background-color: #f8f9fa;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (min-width: $mobileWidth) {
    padding: 20px 0 20px 0;
  }
}

.content {
  padding: 20px 0 20px 0;
  max-width: 1140px;
  margin: 0 auto;
  background-color: white;
  transition: 0.5s;
  width: 100%;

  @media (min-width: $mobileWidth) {
    border-radius: 25px;
    max-width: 1140px;
    padding: 20px;
    transition: 0.5s;
  }
}

.title {
  padding-left: 10px;
  align-self: start;
  align-content: center;
  margin: 14px 0 20px 0;
  h1 {
    align-self: start;
    text-align: left;
    font-size: 40px;
    font-weight: 500;
    color: #2e4573;
  }
}

.details {
  display: inline;

  @media (min-width: $mobileWidth) {
    display: flex;
    justify-content: space-between;
  }
}
</style>
