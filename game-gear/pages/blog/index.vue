<template>
  <div class="home">
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="!loading && data.length === 0" class="noItems">
      No data
    </div>
    <Blogs :data="data" />
  </div>
</template>

<script>
import Blogs from '@/components/Blogs.vue';
import api from '@/api';

export default {
  components: {
    Blogs
  },
  async beforeRouteEnter (to, from, next) {
    const res = await api.getBlogs();
    if (res.status === 202) {
      next((vm) => {
        vm.data = res.data.blogs;
        vm.loading = false;
      });
    } else {
      next('/404');
    }
  },
  async beforeRouteUpdate (to, from, next) {
    const res = await api.getBlogs();

    if (res.status === 202) {
      this.data = res.data.blogs;
      this.loading = false;
      next();
    } else {
      next('/404');
    }
  },
  props: {},
  data () {
    return {
      loading: true,
      data: [],
      model: {}
    };
  }
};
</script>

<style lang="scss"></style>
