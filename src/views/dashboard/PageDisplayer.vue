<template>
  <v-layout>
    <div v-if="page === null || page === undefined">
      <h1>No Page Selected</h1>
    </div>
    <v-layout v-else>
      <v-col>
        <h1>
          Selected Page with ID {{ page.pageID }} and name {{ page.pageName }}
        </h1>
        <v-btn @click="dialog = true" color="red">Delete this page</v-btn>
        <v-btn @click="openEditor()" color="orange">Rename this Page</v-btn>
        <v-layout align-center v-if="loading">
          <v-row justify="center">
            <v-progress-circular
              indeterminate
              color="green"
            ></v-progress-circular>
          </v-row>
        </v-layout>
        <v-row no-gutters v-else>
          <Content
            :data="renderData"
            style="width: 40%;"
          ></Content>
          <Editor
            v-model="strData"
            :pageName="page.pageName"
            style="width: 60%;"
          ></Editor>
        </v-row>
      </v-col>
      <v-dialog v-model="dialog" max-width="295">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete the complete
            {{ page.pageName }} page?</v-card-title
          >

          <v-card-text
            >These changes will not be revertable! Don't do it if you don't know
            what you're doing</v-card-text
          >

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false"
              >Cancel</v-btn
            >

            <v-btn color="red" text @click="deletePage()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="editPageName" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit PageName</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="New PageName"
                  v-model="newPageName"
                  required
                ></v-text-field>
              </v-col>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog()"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="saveNewName()"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-alert
          type="error"
          v-model="editNameError"
          transition="scale-transition"
          dismissible
          >{{ editNameErrorText }}</v-alert
        >
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
    Editor,
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
    },
    closeDialog() {
      this.editPageName = false;
      this.newPageName = "";
      this.editNameErrorText = "";
      this.editNameError = false;
    },
    openEditor() {
      this.newPageName = this.page.pageName;
      this.editPageName = true;
    },
    async saveNewName() {
      if (
        this.newPageName === "" ||
        this.newPageName === undefined ||
        this.newPageName === null
      ) {
        this.editNameErrorText = "Please provide a valid new PageName";
        this.editNameError = true;
      } else {
        let req = await api.editPageName(this.page.pageID, this.newPageName);

        if (req.status === 202) {
          this.page.pageName = this.newPageName;
          this.closeDialog();
        } else if (req.status === 409) {
          this.editNameErrorText = "This Page does not exist (anymore?)";
          this.editNameError = true;
        } else {
          this.editNameErrorText =
            "Something went wrong while trying to edit the name";
          this.editNameError = true;
        }
      }
    },
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
      this.renderData = this.strData.map((currentValue) => {
        return currentValue.content;
      });
    },
  },
  data() {
    return {
      strData: [],
      loading: true,
      renderData: [],
      dialog: false,
      editPageName: false,
      newPageName: "",
      editNameError: false,
      editNameErrorText: "",
    };
  },
};
</script>

<style></style>
