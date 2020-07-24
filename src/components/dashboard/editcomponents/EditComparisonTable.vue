<template>
  <v-col>
    <v-dialog v-model="editingTable" persistent max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Table</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field v-model="jsonDataToEdit.tableName" counter="300" label="Title"></v-text-field>
            <v-simple-table height="400px">
              <template v-slot:default>
                <thead>
                  <th
                    class="text-left"
                    v-for="(title, index) in jsonDataToEdit.columnTitles"
                    :key="index"
                  >
                    <v-btn color="red" @click="removeColumn(index)">Remove Column</v-btn>
                    <v-text-field
                      v-model="jsonDataToEdit.columnTitles[index].name"
                      counter="300"
                      label="Title"
                    ></v-text-field>
                  </th>
                  <th>
                    <v-btn color="#009688" @click="addColumn()">Add in Column</v-btn>
                  </th>
                </thead>
                <tbody>
                  <tr v-for="(row, rowindex) in jsonDataToEdit.rows" :key="rowindex">
                    <td v-for="(title, index) in jsonDataToEdit.columnTitles" :key="index">
                      <v-text-field
                        v-model="jsonDataToEdit.rows[rowindex][title.id]"
                        label="Content"
                      />
                    </td>
                    <td>
                      <v-btn color="red" @click="removeRow(rowindex)">Remove Row</v-btn>
                    </td>
                  </tr>
                  <tr>
                    <v-btn color="#009688" @click="addRow()">Add in Row</v-btn>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditor()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveEditor()" :disabled="creating">Save</v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        type="error"
        v-model="tableEditError"
        transition="scale-transition"
        dismissible
      >{{tableEditErrorText}}</v-alert>
    </v-dialog>
    <v-row justify="space-between">
      <h4>{{value.structureId}}</h4>
      <h4>{{value.content.type}}</h4>
    </v-row>
    <v-form>
      <v-textarea v-model="value.content.json" label="Raw JSON" hint="Insert Raw JSON here"></v-textarea>
      <v-btn color="#009688" @click="openEditor()">Open in Editor</v-btn>
      <v-card-actions>
        <v-btn color="red" @click="deleteData()" :disabled="uploading">Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#009688" @click="updateComponent()" :disabled="uploading">Save</v-btn>
      </v-card-actions>
    </v-form>
    <v-alert
      type="error"
      v-model="deleted"
      transition="scale-transition"
    >This structure is deleted - to see the effect please reload the page</v-alert>
  </v-col>
</template>

<script>
import api from "@/api";
export default {
  props: ["value"],
  data() {
    return {
      uploading: false,
      deleted: false,
      editingTable: false,
      tableEditError: false,
      tableEditErrorText: "",
      jsonDataToEdit: {}
    };
  },
  methods: {
    updateData() {
      this.$emit("input", this.value);
    },
    async updateComponent() {
      this.uploading = true;
      console.log({
        structureId: this.value.structureId,
        content: this.value.content
      });

      let res = await api.updateStructure(this.value);

      if (res.status != 202) {
        alert("Can't edit data because of " + res.data.Error);
      }
      this.uploading = false;
    },
    async deleteData() {
      this.uploading = false;
      await api.deleteStructure(this.value.structureId);
      this.deleted = true;
    },
    closeEditor() {
      this.editingTable = false;
      this.tableEditError = false;
    },
    openEditor() {
      this.jsonDataToEdit = JSON.parse(this.value.content.json);
      this.editingTable = true;
    },
    saveEditor() {
      this.value.content.json = JSON.stringify(this.jsonDataToEdit);
      this.editingTable = false;
    },

    /// Table Editor functions
    addRow() {
      var obj = {};
      this.jsonDataToEdit.columnTitles.forEach(element => {
        obj[element.id] = "";
      });
      this.jsonDataToEdit.rows.push(obj);
    },
    removeRow(rowindex) {
      this.jsonDataToEdit.rows.splice(rowindex, 1);
    },
    addColumn() {
      var newId;
      if (this.jsonDataToEdit.columnTitles.length === 0) {
        newId = 0;
      } else {
        newId =
          this.jsonDataToEdit.columnTitles[
            this.jsonDataToEdit.columnTitles.length - 1
          ].id + 1;
      }
      var newColumnTitle = {
        id: newId,
        name: ""
      };

      this.jsonDataToEdit.columnTitles.push(newColumnTitle);

      this.jsonDataToEdit.rows.forEach(element => {
        element[newId.toString()] = "";
      });
    },
    removeColumn(columnIndex) {
      var idOfRemovedColumn = this.jsonDataToEdit.columnTitles[columnIndex].id;

      this.jsonDataToEdit.rows.forEach(element => {
        delete element[idOfRemovedColumn.toString()];
      });

      this.jsonDataToEdit.columnTitles.splice(columnIndex, 1);
    }
  }
};
</script>

<style>
</style>