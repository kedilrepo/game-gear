<template>
  <v-col>
    <v-row justify="space-between">
      <h4>{{ value.structureId }}</h4>
      <h4>{{ value.content.type }}</h4>
    </v-row>
    <v-form>
      <v-text-field
        :value="value.content.title"
        counter="300"
        label="Title"
        @input="updateTitle($event)"
      />
      <v-text-field
        :value="value.content.image_url"
        counter="300"
        label="Image-URL"
        @input="updateImageUrl($event)"
      />
      <v-textarea
        :value="value.content.main_text"
        label="Text"
        hint="Main Text Here"
        @input="updateMainText($event)"
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
      deleted: false,
      item: {}
    };
  },
  watch: {
    value (newValue) {
      if (Object.keys(this.item).length === 0 && this.item.constructor === Object) {
        this.item = newValue;
      }
    }
  },
  created () {
    this.item = { ...this.value };
  },
  methods: {
    updateData () {
      this.$emit('input', this.value);
    },
    updateTitle ($event) {
      this.item.content.title = $event;
      this.updateData();
    },
    updateImageUrl ($event) {
      this.item.content.image_url = $event;
      this.updateData();
    },
    updateMainText ($event) {
      this.item.content.main_text = $event;
      this.updateData();
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
