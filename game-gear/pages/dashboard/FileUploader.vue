<template>
  <section v-cloak @drop.prevent="dropFile" @dragover.prevent>
    <h2>Files to Upload (Drag them over)</h2>
    <input type="file" @input="selectFile">
    <li v-if="file != null">
      {{ file.name }} ({{ file.size | kb }} kb)
      <button title="Remove" @click="removeFile(file)">
        X
      </button>
    </li>
    <p v-if="file !== null">
      Preview
    </p>
    <img v-if="file !== null" :src="imageUrl" alt="preview">
    <p class="failure">
      {{ errorString }}
    </p>
    <p class="success">
      {{ successString }}
    </p>
    <button :disabled="uploadDisabled" @click="upload">
      Upload
    </button>

    <v-simple-table v-if="files.length !== 0" max-height="400px">
      <template #default>
        <thead>
          <th>
            Filename
          </th>
          <th>
            URL
          </th>
        </thead>
        <tbody>
          <tr v-for="(file, index) in files" :key="index">
            <td>
              {{ file.fileName }}
            </td>
            <td>
              {{ file.url }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
import api from '@/api';

export default {
  name: 'FileUploader',
  data: () => {
    return {
      file: null,
      errorString: '',
      successString: '',
      imageUrl: '',
      files: []
    };
  },
  computed: {
    uploadDisabled () {
      return this.files === null;
    }
  },
  mounted () {
    this.loadFiles();
  },
  methods: {
    async loadFiles () {
      const res = await api.getFiles();
      this.files = res.data.files;
    },
    addFile (file) {
      this.successString = '';
      this.file = file;
      this.imageUrl = URL.createObjectURL(this.file);
    },
    dropFile (e) {
      const droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) { return; }
      if (droppedFiles.length === 0) { return; }
      this.addFile(droppedFiles.item(0));
    },
    selectFile (e) {
      console.log(e.srcElement.files);
      if (e.target.files.length === 0) { return; }
      this.addFile(e.target.files.item(0));
    },
    removeFile () {
      this.file = null;
    },
    async upload () {
      if (this.file == null) {
        this.errorString = 'No file selected';
        return;
      }
      if (!this.isImage(this.file.name)) {
        this.errorString = 'Invalid file format';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      const res = await api.uploadFile(formData);

      this.successString = `Uploaded at: ${res.data.url}`;
      this.errorString = '';
      this.file = null;
      await this.loadFiles();
    },
    getExtension (filename) {
      const parts = filename.split('.');
      return parts[parts.length - 1];
    },
    isImage (filename) {
      const ext = this.getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
        case 'jpeg':
          // etc
          return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.success {
  color: green;
}

.failure {
  color: red;
}
</style>
