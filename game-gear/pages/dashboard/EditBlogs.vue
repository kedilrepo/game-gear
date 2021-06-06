<template>
  <v-layout>
    <v-layout v-if="loading" align-center>
      <v-row justify="center">
        <v-progress-circular indeterminate color="green" />
      </v-row>
    </v-layout>
    <v-col v-else align="start" justify="start">
      <v-row justify="space-between">
        <div />
        <v-dialog v-model="creatingBlog" persistent max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Create Blog
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Create new Blog</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="newBlogName"
                    label="New Blog Name*"
                    required
                  />
                </v-col>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeCreateBlog()"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="createBlog()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-alert
            v-model="blogCreationError"
            type="error"
            transition="scale-transition"
            dismissible
          >
            {{ blogCreationErrorText }}
          </v-alert>
        </v-dialog>
      </v-row>

      <div class="fill-height" fluid>
        <div v-for="(item, index) in blogs" :key="index">
          <router-link :to="editUrlOf(item.blogUrl)">
            <v-row class="adminBlogRow">
              <h1>{{ item.blogName }}</h1>
              <v-spacer />
            </v-row>
          </router-link>
        </div>
      </div>
    </v-col>
  </v-layout>
</template>

<script>
import api from '@/api';

export default {
  async beforeRouteEnter (to, from, next) {
    const res = await api.getBlogs();

    next((vm) => {
      vm.blogs = res.data.blogs;
      vm.loading = false;
    });
  },
  data () {
    return {
      loading: true,
      blogs: [],
      creatingBlog: false,
      newBlogName: '',
      blogCreationError: false,
      blogCreationErrorText: ''
    };
  },
  methods: {
    editUrlOf (url) {
      return `/dashboard/editBlogs/${url}`;
    },
    async createBlog () {
      if (this.newBlogName === '') {
        this.blogCreationErrorText = 'Blog name may not be empty';
        this.blogCreationError = true;
        return;
      }
      const res = await api.createBlog(this.newBlogName);
      if (res.status === 202) {
        await this.reloadBlogs();
        this.creatingBlog = false;
      } else if (res.status === 409) {
        this.blogCreationErrorText = 'Blog with this name already exists';
        this.blogCreationError = true;
      } else {
        this.blogCreationErrorText =
          'Something went wrong while creating the Blog';
        this.blogCreationError = true;
      }
    },
    closeCreateBlog () {
      this.creatingBlog = false;
    },
    async reloadBlogs () {
      const request = await api.getBlogs();
      this.blogs = request.data.blogs;
    }
  }
};
</script>

<style lang="scss">
.adminBlogRow {
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.adminBlogRow:hover {
  background-color: grey;
}
</style>
