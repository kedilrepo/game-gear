<template>
  <div class="home">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="noItems" v-if="!loading && data.length === 0">No data</div>
    <ComparisonTable :json="json" />
    <Content :data="data"></Content>
  </div>
</template>

<script>
import Content from "@/components/Content";
import api from "@/api";
import ComparisonTable from "@/components/ComparisonTable.vue";

export default {
  name: "Home",
  components: {
    Content,
    ComparisonTable
  },
  data() {
    return {
      loading: false,
      data: [],
      model: {},
      json: `{
        "tableName": "irgendwas",
        "columnTitles": [{"id": 0, "name": "1. Reihe"}, {"id": 1, "name": "2. Reihe"}, {"id": 2, "name": "3. Reihe"}],
        "rows": [{
            "0": "Text1 <br/> Test",
            "1": "Text2",
            "2": "Text3"
        }, 
        {
            "0": "Text1",
            "1": "Text2",
            "2": "Text3"
        }]
    }`
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
