<template>
  <v-layout>
    <div v-if="page === null || page === undefined">
      <h1>No Page Selected</h1>
    </div>
    <div v-else>
      <h1>Selected Page with ID {{page.pageID}} and name {{page.pageName}}</h1>
      <v-btn @click="deletePage()">Delete this page</v-btn>
      <v-layout align-center v-if="loading">
        <v-row justify="center">
          <v-progress-circular indeterminate color="green"></v-progress-circular>
        </v-row>
      </v-layout>
      <AdminContent :data="strData" v-else></AdminContent>
    </div>
  </v-layout>
</template>

<script>
import api from "@/api";
import AdminContent from "@/components/dashboard/AdminContent";
export default {
  components: {
    AdminContent
  },
  props: ["page"],
  methods: {
    async deletePage() {
      await api.deletePage(this.pageId);
    }
  },
  watch: {
    page: async function() {
      this.loading = true;
      let res = await api.getStructures(this.page.pageName);
      console.log(res);

      console.log(res.data);

      this.strData = res.data;
      this.loading = false;
    }
  },
  data() {
    return {
      strData: [],
      loading: true
    };
  }
};
</script>

<style>
</style>