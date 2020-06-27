<template>
  <v-layout>
    <div v-if="page === null || page === undefined">
      <h1>No Page Selected</h1>
    </div>
    <v-layout v-else>
      <v-col>
        <h1>Selected Page with ID {{page.pageID}} and name {{page.pageName}}</h1>
        <v-btn @click="dialog = true" color="red">Delete this page</v-btn>
        <v-layout align-center v-if="loading">
          <v-row justify="center">
            <v-progress-circular indeterminate color="green"></v-progress-circular>
          </v-row>
        </v-layout>
        <v-row no-gutters v-else>
          <Content :data="renderData" style="width: 40%; min-width: 570px;"></Content>
          <Editor v-model="strData" :pageName="page.pageName" style="width: 60%;"></Editor>
        </v-row>
      </v-col>
      <v-dialog v-model="dialog" max-width="295">
        <v-card>
          <v-card-title
            class="headline"
          >Are you sure you want to delete the complete {{page.pageName}} page?</v-card-title>

          <v-card-text>These changes will not be revertable! Don't do it if you don't know what you're doing</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>

            <v-btn color="red" text @click="deletePage()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-layout>
</template>

<script>
import api from "@/api";
import Content from "@/components/Content";
import Editor from "@/components/dashboard/Editor";
export default {
  components: {
    Content,
    Editor
  },
  props: ["page"],
  methods: {
    async deletePage() {
      console.log(this.page.pageID);

      let res = await api.deletePage(this.page.pageID);
      if (res.status === 202) {
        this.dialog = false;
        this.page = null;
      } else {
        alert("Something went wrong while deleting");
      }
    }
  },
  watch: {
    page: async function() {
      this.loading = true;
      let res = await api.getStructures(this.page.pageName);

      this.strData = res.data;

      console.log(res.data);

      this.loading = false;
    },
    strData: function() {
      this.renderData = this.strData.map(currentValue => {
        return currentValue.content;
      });
    }
  },
  data() {
    return {
      strData: [],
      loading: true,
      renderData: [],
      dialog: false
    };
  }
};
</script>

<style>
</style>