<template>
  <div class="home">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="noItems" v-if="!loading && data.length === 0">No data</div>
    <Content :data="data"></Content>
  </div>
</template>

<script>
import Content from "@/components/Content";
import api from "@/api";

export default {
  components: {
    Content
  },
  data() {
    return {
      loading: false,
      data: [],
      model: {},
      pagename: ""
    };
  },
  props: {},
  async beforeRouteEnter(to, from, next) {
    let page = to.fullPath.substr(1);

    let res = await api.getData(page);
    if (res.status === 202) {
      next(vm => {
        vm.data = res.data;
        vm.pagename = page;
      });
    } else {
      next("/404");
    }
  },
  async beforeRouteUpdate(to, from, next) {
    let page = to.fullPath.substr(1);

    let res = await api.getData(page);
    this.data = res.data;

    if (res.status === 202) {
      this.data = res.data;
      this.pagename = page;
      next();
    } else {
      next("/404");
    }
  },
  methods: {
    async refreshData() {
      this.loading = true;
      this.data = await api.getData(this.pagename);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
</style>
