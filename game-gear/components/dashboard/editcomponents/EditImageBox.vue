<template>
  <v-col>
    <v-row justify="space-between">
      <h4>{{ value.structureId }}</h4>
      <h4>{{ value.content.type }}</h4>
    </v-row>
    <v-form>
      <v-text-field
        v-model="value.content.image_url"
        counter="300"
        label="Background-Image-URL"
      />
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
      This structure is deleted - to see the effect please reload the
      page
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
      deleted: false
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
    }
  }
};
</script>

<style></style>
