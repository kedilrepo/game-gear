<template>
  <div class="home">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="noItems" v-if="!loading && data.length === 0">No data</div>
    <Blogs :data="data"></Blogs>
  </div>
</template>

<script>
import Blogs from "@/components/Blogs.vue";
import api from "@/api";

export default {
  components: {
    Blogs
  },
  data() {
    return {
      loading: true,
      data: [],
      model: {}
    };
  },
  props: {},
  async beforeRouteEnter(to, from, next) {
    let res = await api.getBlogs();
    if (res.status === 202) {
      next(vm => {
        vm.data = res.data.blogs;
        vm.loading = false;
      });
    } else {
      next("/404");
    }
  },
  async beforeRouteUpdate(to, from, next) {
    let res = await api.getBlogs();

    if (res.status === 202) {
      this.data = res.data.blogs;
      this.loading = false;
      next();
    } else {
      next("/404");
    }
  }
};
</script>

<style lang="scss"></style>
