<template>
  <router-link :to="fullUrl">
    <v-row class="blogRow" @click="goToBlog">
      <h1>{{ name }}</h1>
      <v-spacer />
    </v-row>
  </router-link>
</template>

<script>
export default {
  props: {
    name: {
      required: true
    },
    url: {
      required: true
    }
  },
  computed: {
    fullUrl () {
      return '/blog/' + this.url;
    }
  },
  methods: {
    goToBlog () {
      console.log(this.url);
    }
  }
};
</script>

<style lang="scss">
.blogRow {
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.blogRow:hover {
  background-color: grey;
}
</style>
