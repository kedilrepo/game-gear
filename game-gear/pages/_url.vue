<template>
  <div class="home">
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="!loading && data.length === 0" class="noItems">
      No data
    </div>
    <Content :data="data" :last-edited="lastEdited" />
  </div>
</template>

<script>
import Content from '@/components/Content';
import api from '@/api';

export default {
  components: {
    Content
  },
  // async beforeRouteEnter (to, from, next) {
  //   const page = to.fullPath.substr(1);

  //   const res = await api.getData(page);
  //   if (res.status === 202) {
  //     next((vm) => {
  //       vm.data = res.data.data;
  //       vm.lastEdited = res.data.lastEdited;
  //       vm.pagename = page;
  //     });
  //   } else {
  //     next('/404');
  //   }
  // },
  // async beforeRouteUpdate (to, from, next) {
  //   const page = to.fullPath.substr(1);

  //   const res = await api.getData(page);

  //   if (res.status === 202) {
  //     this.data = res.data.data;
  //     this.lastEdited = res.data.lastEdited;
  //     this.pagename = page;
  //     next();
  //   } else {
  //     next('/404');
  //   }
  // },
  props: {},
  data () {
    return {
      loading: false,
      data: [],
      lastEdited: 0,
      model: {},
      pagename: ''
    };
  },
  async fetch () {
    const page = this.$route.params.url;

    console.log(page);

    const res = await api.getData(page);

    if (res.status === 202) {
      this.data = res.data.data;
      this.lastEdited = res.data.lastEdited;
      this.pagename = page;
    } else {
      this.$router.push('/404');
    }
  },
  methods: {
    async refreshData () {
      this.loading = true;
      this.data = await api.getData(this.pagename);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss"></style>
