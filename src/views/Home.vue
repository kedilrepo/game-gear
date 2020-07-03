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
  name: "Home",
  components: {
    Content
  },
  data() {
    return {
      loading: false,
      data: [],
      model: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    let res = await api.getData("home");
    console.log(res);
    next(vm => {
      vm.data = res.data;
    });
  },
  methods: {
    async refreshData() {
      this.loading = true;
      this.data = await api.getData("home");
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
</style>
