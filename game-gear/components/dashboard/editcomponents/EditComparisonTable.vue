/* eslint-disable vue/no-mutating-props */
<template>
  <v-col>
    <v-dialog v-model="editingTable" persistent max-width="1200px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Table</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="jsonDataToEdit.tableName"
              counter="300"
              label="Title"
            />
            <v-simple-table height="400px">
              <template #default>
                <thead>
                  <th
                    v-for="(title, index) in jsonDataToEdit.columnTitles"
                    :key="index"
                    class="text-left"
                  >
                    <v-btn
                      color="red"
                      @click="removeColumn(index)"
                    >
                      Remove Column
                    </v-btn>
                    <v-text-field
                      v-model="jsonDataToEdit.columnTitles[index].name"
                      counter="300"
                      label="Title"
                    />
                  </th>
                  <th>
                    <v-btn
                      color="#009688"
                      @click="addColumn()"
                    >
                      Add in Column
                    </v-btn>
                  </th>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, rowindex) in jsonDataToEdit.rows"
                    :key="rowindex"
                  >
                    <td
                      v-for="(title, index) in jsonDataToEdit.columnTitles"
                      :key="index"
                    >
                      <v-text-field
                        v-model="jsonDataToEdit.rows[rowindex][title.id]"
                        label="Content"
                      />
                    </td>
                    <td>
                      <v-btn
                        color="red"
                        @click="removeRow(rowindex)"
                      >
                        Remove Row
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <v-btn color="#009688" @click="addRow()">
                      Add in Row
                    </v-btn>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeEditor()">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="creating"
            @click="saveEditor()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        v-model="tableEditError"
        type="error"
        transition="scale-transition"
        dismissible
      >
        {{ tableEditErrorText }}
      </v-alert>
    </v-dialog>
    <v-row justify="space-between">
      <h4>{{ value.structureId }}</h4>
      <h4>{{ value.content.type }}</h4>
    </v-row>
    <v-form>
      <v-textarea
        v-model="value.content.json"
        label="Raw JSON"
        hint="Insert Raw JSON here"
      />
      <v-btn color="#009688" @click="openEditor()">
        Open in Editor
      </v-btn>
      <v-card-actions>
        <v-btn
          color="red"
          :disabled="uploading"
          @click="deleteData()"
        >
          Delete
        </v-btn>
        <v-spacer />
        <v-btn
          color="#009688"
          :disabled="uploading"
          @click="updateComponent()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
    <v-alert
      v-model="deleted"
      type="error"
      transition="scale-transition"
    >
      This structure is deleted - to see the effect please reload the page
    </v-alert>
  </v-col>
</template>

<script>
import api from '@/api';

export default {
  props: ['value', 'blog'],
  data () {
    return {
      uploading: false,
      deleted: false,
      editingTable: false,
      tableEditError: false,
      tableEditErrorText: '',
      jsonDataToEdit: {},
      item: {}
    };
  },
  methods: {
    updateData () {
      this.$emit('input', this.value);
    },
    async updateComponent () {
      this.uploading = true;
      console.log({
        structureId: this.value.structureId,
        content: this.value.content
      });

      let res;
      if (this.blog) {
        res = await api.updateBlogStructure(this.value);
      } else {
        res = await api.updateStructure(this.value);
      }

      if (res.status !== 202) {
        alert("Can't edit data because of " + res.data.Error);
      }
      this.uploading = false;
    },
    async deleteData () {
      this.uploading = false;
      if (this.blog) {
        await api.deleteBlogStructure(this.value.structureId);
      } else {
        await api.deleteStructure(this.value.structureId);
      }
      this.deleted = true;
    },
    closeEditor () {
      this.editingTable = false;
      this.tableEditError = false;
    },
    openEditor () {
      this.jsonDataToEdit = JSON.parse(this.value.content.json);
      this.editingTable = true;
    },
    saveEditor () {
      this.value.content.json = JSON.stringify(this.jsonDataToEdit);
      this.editingTable = false;
    },

    /// Table Editor functions
    addRow () {
      const obj = {};
      this.jsonDataToEdit.columnTitles.forEach((element) => {
        obj[element.id] = '';
      });
      this.jsonDataToEdit.rows.push(obj);
    },
    removeRow (rowindex) {
      this.jsonDataToEdit.rows.splice(rowindex, 1);
    },
    addColumn () {
      let newId;
      if (this.jsonDataToEdit.columnTitles.length === 0) {
        newId = 0;
      } else {
        newId =
          this.jsonDataToEdit.columnTitles[
            this.jsonDataToEdit.columnTitles.length - 1
          ].id + 1;
      }
      const newColumnTitle = {
        id: newId,
        name: ''
      };

      this.jsonDataToEdit.columnTitles.push(newColumnTitle);

      this.jsonDataToEdit.rows.forEach((element) => {
        element[newId.toString()] = '';
      });
    },
    removeColumn (columnIndex) {
      const idOfRemovedColumn = this.jsonDataToEdit.columnTitles[columnIndex].id;

      this.jsonDataToEdit.rows.forEach((element) => {
        delete element[idOfRemovedColumn.toString()];
      });

      this.jsonDataToEdit.columnTitles.splice(columnIndex, 1);
    }
  }
};
</script>

<style></style>
