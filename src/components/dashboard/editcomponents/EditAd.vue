<template>
  <v-col>
    <v-row justify="space-between">
      <h4>{{value.structureId}}</h4>
      <h4>{{value.content.type}}</h4>
    </v-row>
    <v-form>
      <v-card-actions>
        <v-btn color="red" @click="deleteData()" :disabled="uploading">Delete</v-btn>
        <v-spacer></v-spacer>
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
      deleted: false
    };
  },
  methods: {
    updateData() {
      this.$emit("input", this.value);
    },
    async deleteData() {
      this.uploading = false;
      await api.deleteStructure(this.value.structureId);
      this.deleted = true;
    }
  }
};
</script>

<style>
</style>