<template>
  <v-layout>
    <div v-if="blog === null || blog === undefined">
      <h1>No Blog Selected</h1>
    </div>
    <v-layout v-else>
      <v-col>
        <h1>
          Selected Blog with ID {{ blog.blogId }} and name "{{ blog.blogName }}"
        </h1>
        <v-btn color="red" @click="dialog = true">
          Delete this blog
        </v-btn>
        <v-btn color="orange" @click="openEditor()">
          Rename this Blog
        </v-btn>
        <v-layout v-if="loading" align-center>
          <v-row justify="center">
            <v-progress-circular
              indeterminate
              color="green"
            />
          </v-row>
        </v-layout>
        <v-row v-else no-gutters>
          <Content
            :data="renderData"
            :last-edited="0"
            style="width: 40%;"
          />
          <Editor
            v-model="strData"
            :blog-name="blog.blogUrl"
            :blog="true"
            style="width: 60%;"
          />
        </v-row>
      </v-col>
      <v-dialog v-model="dialog" max-width="295">
        <v-card>
          <v-card-title
            class="headline"
          >
            Are you sure you want to delete the complete
            {{ blog.blogName }} blog?
          </v-card-title>

          <v-card-text>
            These changes will not be revertable! Don't do it if you don't know
            what you're doing
          </v-card-text>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>

            <v-btn color="red" text @click="deleteBlog()">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="editBlogName" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit BlogName</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newBlogName"
                  label="New BlogName"
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
              @click="closeDialog()"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="saveNewName()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          v-model="editNameError"
          type="error"
          transition="scale-transition"
          dismissible
        >
          {{ editNameErrorText }}
        </v-alert>
      </v-dialog>
    </v-layout>
  </v-layout>
</template>

<script>
import api from '@/api';
import Content from '@/components/Content';
import Editor from '@/components/dashboard/Editor';

export default {
  components: {
    Content,
    Editor
  },
  async beforeRouteEnter (to, from, next) {
    const blog = to.params.blog;
    const info = await api.getBlogInfo(blog);
    if (info.status === 202) {
      const res = await api.getBlogStructures(blog);
      if (res.status === 202) {
        next((vm) => {
          vm.blog = info.data;
          vm.strData = res.data ?? [];
          vm.loading = false;
        });
      } else {
        console.log('Heyho from Blog Resend');
        next('/404');
      }
    } else {
      console.log('Heyho from Blog Resend');
      next('/404');
    }
  },

  data () {
    return {
      strData: [],
      loading: true,
      renderData: [],
      dialog: false,
      editBlogName: false,
      newBlogName: '',
      editNameError: false,
      editNameErrorText: '',
      blog: null
    };
  },
  watch: {
    strData () {
      this.renderData = this.strData.map((currentValue) => {
        return currentValue.content;
      });
    }
  },
  methods: {
    async deleteBlog () {
      const res = await api.deleteBlog(this.blog.blogId);
      if (res.status === 202) {
        this.dialog = false;
        this.$router.push('/dashboard/editBlogs');
      } else {
        alert('Something went wrong while deleting');
      }
    },
    closeDialog () {
      this.editBlogName = false;
      this.newBlogName = '';
      this.editNameErrorText = '';
      this.editNameError = false;
    },
    openEditor () {
      this.newBlogName = this.blog.blogName;
      this.editBlogName = true;
    },
    async saveNewName () {
      if (
        this.newBlogName === '' ||
        this.newBlogName === undefined ||
        this.newBlogName === null
      ) {
        this.editNameErrorText = 'Please provide a valid new BlogName';
        this.editNameError = true;
      } else {
        const req = await api.editBlogName(this.blog.blogId, this.newBlogName);

        if (req.status === 202) {
          this.blog.blogName = this.newBlogName;
          this.closeDialog();
        } else if (req.status === 409) {
          this.editNameErrorText = 'This Blog does not exist (anymore?)';
          this.editNameError = true;
        } else {
          this.editNameErrorText =
            'Something went wrong while trying to edit the name';
          this.editNameError = true;
        }
      }
    }
  }
};
</script>

<style></style>
