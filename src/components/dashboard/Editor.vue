<template>
  <div>
    <v-dialog v-model="creatingStructure" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create new Structure</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12" sm="6">
              <v-select
                :items="creationPossibilities"
                v-model="selectedPossibility"
                label="Structure"
              ></v-select>
            </v-col>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="resetError()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="createStructure()" :disabled="creating">Save</v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        type="error"
        v-model="structureCreationError"
        transition="scale-transition"
        dismissible
      >{{structureCreationErrorText}}</v-alert>
    </v-dialog>
    <v-btn color="primary" dark @click="openMenu(0)">Insert Structure</v-btn>
    <div v-for="(item, index) in value" :key="index">
      <div v-if="item.content.type == 'headertitle'">
        <EditHeaderTitle v-model="value[index]"></EditHeaderTitle>
      </div>
      <div v-else-if="item.content.type == 'textwithleftpicture'">
        <EditTextLeftPicture v-model="value[index]"></EditTextLeftPicture>
      </div>
      <div v-else-if="item.content.type == 'textwithrightpicture'">
        <EditTextRightPicture v-model="value[index]"></EditTextRightPicture>
      </div>
      <div v-else-if="item.content.type == 'textnopicture'">
        <EditTextNoPicture v-model="value[index]"></EditTextNoPicture>
      </div>
      <div v-else-if="item.content.type == 'textnopicture'">
        <EditTextNoPicture v-model="value[index]"></EditTextNoPicture>
      </div>
      <div v-else-if="item.content.type == 'ad'">
        <EditAd v-model="value[index]"></EditAd>
      </div>
      <div v-else-if="item.content.type == 'infobox'">
        <EditInfobox v-model="value[index]"></EditInfobox>
      </div>
      <div v-else-if="item.content.type == 'comparisontable'">
        <EditComparisonTable v-model="value[index]"></EditComparisonTable>
      </div>
      <v-btn color="primary" dark @click="openMenu(index + 1)">Insert Structure</v-btn>
    </div>
  </div>
</template>

<script>
import EditTextLeftPicture from "@/components/dashboard/editcomponents/EditTextLeftPicture.vue";
import EditTextRightPicture from "@/components/dashboard/editcomponents/EditTextRightPicture.vue";
import EditTextNoPicture from "@/components/dashboard/editcomponents/EditTextNoPicture.vue";
import EditHeaderTitle from "@/components/dashboard/editcomponents/EditHeaderTitle.vue";
import EditAd from "@/components/dashboard/editcomponents/EditAd.vue";
import EditInfobox from "@/components/dashboard/editcomponents/EditInfobox.vue";
import EditComparisonTable from "@/components/dashboard/editcomponents/EditComparisonTable.vue";

import api from "@/api";
import EmptyModels from "@/classes/emptyModels";
export default {
  components: {
    EditTextLeftPicture,
    EditTextRightPicture,
    EditTextNoPicture,
    EditHeaderTitle,
    EditAd,
    EditInfobox,
    EditComparisonTable
  },
  props: {
    value: [],
    pageName: String
  },
  data() {
    return {
      creatingStructure: false,
      strIndex: 0,
      structureCreationError: false,
      structureCreationErrorText: "",
      creating: false,
      creationPossibilities: [
        "headertitle",
        "textnopicture",
        "textwithleftpicture",
        "textwithrightpicture",
        "ad",
        "infobox",
        "comparisontable"
      ],
      selectedPossibility: ""
    };
  },
  methods: {
    updateData() {
      this.$emit("input", this.value);
    },
    openMenu(position) {
      this.creatingStructure = true;
      this.strIndex = position;
      console.log(this.strIndex);
    },
    resetError() {
      this.creatingStructure = false;
      this.structureCreationError = false;
      this.selectedPossibility = "";
    },
    async createStructure() {
      this.creating = true;

      if (
        this.selectedPossibility === "" ||
        this.selectedPossibility === null ||
        this.selectedPossibility === undefined
      ) {
        this.structureCreationErrorText =
          "Please select a Structure-Type (error 1)";
        this.structureCreationError = true;
        this.creating = false;
      } else {
        var structure;
        if (this.selectedPossibility === "headertitle") {
          structure = EmptyModels.headerTitle();
        } else if (this.selectedPossibility === "textnopicture") {
          structure = EmptyModels.textnopicture();
        } else if (this.selectedPossibility === "textwithleftpicture") {
          structure = EmptyModels.textleftpicture();
        } else if (this.selectedPossibility === "textwithrightpicture") {
          structure = EmptyModels.textrightpicture();
        } else if (this.selectedPossibility === "ad") {
          structure = EmptyModels.ad();
        } else if (this.selectedPossibility === "infobox") {
          structure = EmptyModels.infobox();
        } else if (this.selectedPossibility === "comparisontable") {
          structure = EmptyModels.comparisonTable();
        } else {
          this.structureCreationErrorText =
            "Please select a Structure-Type (error 2)";
          this.structureCreationError = true;
          this.creating = false;
          return;
        }

        let res = await api.createStructure(
          this.pageName,
          this.strIndex + 1,
          structure
        );

        if (res.status === 201) {
          this.value.splice(this.strIndex, 0, res.data);
        } else {
          this.structureCreationErrorText = "Creating the Structure failed";
          this.structureCreationError = true;
          this.creating = false;
        }
        this.creating = false;

        this.resetError();
      }
    }
  }
};
</script>

<style lang="scss">
</style>