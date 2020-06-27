<template>
  <v-layout>
    <v-layout align-center v-if="loading">
      <v-row justify="center">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </v-row>
    </v-layout>

    <v-col align="start" justify="start" v-else>
      <v-row justify="space-between">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">Select Page</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in pages" :key="index" @click="goTo(item)">
              <v-list-item-title>{{ item.pageName }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-dialog v-model="creatingPage" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">Create Page</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Create new Page</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" sm="6">
                  <v-text-field label="New Page Name*" v-model="newPageName" required></v-text-field>
                </v-col>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="creatingPage = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="createPage()">Save</v-btn>
            </v-card-actions>
          </v-card>
          <v-alert
            type="error"
            v-model="pageCreationError"
            transition="scale-transition"
            dismissible
          >{{pageCreationErrorText}}</v-alert>
        </v-dialog>
      </v-row>
      <v-container class="fill-height" fluid>
        <PageDisplayer :page="selectedPage"></PageDisplayer>
      </v-container>
    </v-col>
  </v-layout>
</template>

<script>
import api from "@/api";
import PageDisplayer from "@/views/dashboard/PageDisplayer";
export default {
  data() {
    return {
      loading: true,
      pages: [],
      selectedPage: null,
      creatingPage: false,
      newPageName: "",
      pageCreationError: false,
      pageCreationErrorText: ""
    };
  },
  async beforeRouteEnter(to, from, next) {
    let res = await api.getPages();
    console.log(res);
    next(vm => {
      console.log(res.data);

      vm.pages = res.data;
      vm.loading = false;
    });
  },
  methods: {
    goTo: function(routePage) {
      console.log(routePage);
      this.selectedPage = routePage;
    },
    async createPage() {
      let res = await api.createPage(this.newPageName);
      if (res.status === 202) {
        await this.reloadPages();
        this.creatingPage = false;
      } else if (res.status === 409) {
        this.pageCreationErrorText = "Page with this name already exists";
        this.pageCreationError = true;
      } else {
        this.pageCreationErrorText =
          "Something went wrong while creating the Page";
        this.pageCreationError = true;
      }
    },
    async reloadPages() {
      let request = await api.getPages();
      this.pages = request.data;
    }
  },
  components: {
    PageDisplayer
  }
};
</script>

<style></style>
