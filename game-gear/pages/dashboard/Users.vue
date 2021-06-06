<template>
  <v-layout>
    <v-col align="start">
      <v-row>
        <v-spacer />
        <v-btn color="#009688" @click="addingUser = true">
          Add User
        </v-btn>
      </v-row>
      <div class="userTitle">
        <v-row>
          <h1>Existing users</h1>

          <v-spacer />
          <v-btn color="#009688" @click="reload()">
            Reload
          </v-btn>
        </v-row>
      </div>
      <v-container v-if="loading" class="fill-height" fluid>
        <v-row justify="center">
          <v-progress-circular
            indeterminate
            color="green"
          />
        </v-row>
      </v-container>
      <v-col v-for="(user, index) in users" v-else :key="index">
        <v-divider />
        <v-row>
          <h3>{{ user.user_id }}</h3>
          <v-spacer />
          <v-btn
            color="red"
            @click="showDeleteDialog(index)"
          >
            Remove User
          </v-btn>
        </v-row>
      </v-col>
    </v-col>

    <v-dialog v-model="addingUser" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add new User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newUserId"
                label="New User's UserId (from Firebase Auth)*"
                required
              />
            </v-col>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="addUser()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        v-model="userAddingError"
        type="error"
        transition="scale-transition"
        dismissible
      >
        {{ userAddingErrorText }}
      </v-alert>
    </v-dialog>

    <v-dialog v-model="removingUser" max-width="300px">
      <v-card>
        <v-card-title
          class="headline"
        >
          Are you sure you want to remove the user with the id "{{
            users[currentlyRemovingUserIndex].user_id
          }}"?
        </v-card-title>

        <v-card-text>
          These changes will not be revertable! Don't do it if you don't know
          what you're doing.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="closeDeletionDialog()"
          >
            Cancel
          </v-btn>

          <v-btn color="red" text @click="deleteUser()">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-alert
        v-model="userRemovingError"
        type="error"
        transition="scale-transition"
        dismissible
      >
        {{ userRemovingErrorText }}
      </v-alert>
    </v-dialog>
  </v-layout>
</template>

<script>
import api from '@/api';

export default {
  async beforeRouteEnter (to, from, next) {
    const res = await api.getUsers();
    console.log(res);
    next((vm) => {
      console.log(res.data);

      vm.users = res.data;
      vm.loading = false;
    });
  },
  data () {
    return {
      addingUser: false,
      adding: false,
      removingUser: false,
      userRemovingError: false,
      userRemovingErrorText: '',
      currentlyRemovingUserIndex: 0,
      userAddingError: false,
      userAddingErrorText: '',
      newUserId: '',
      users: [],
      loading: true
    };
  },
  methods: {
    async reload () {
      this.loading = true;
      const res = await api.getUsers();
      this.users = res.data;
      this.loading = false;
    },
    async addUser () {
      if (
        this.newUserId === '' ||
        this.newUserId === undefined ||
        this.newUserId === null
      ) {
        this.userAddingErrorText = 'Please provide a valid UserID';
        this.userAddingError = true;
      } else {
        const req = await api.addUser(this.newUserId);

        if (req.status === 202) {
          this.userAddingError = false;
          this.addingUser = false;
          await this.reload();

          this.newUserId = '';
        } else if (req.status === 409) {
          this.userAddingErrorText = 'UserID already trusted';
          this.userAddingError = true;
        } else {
          this.userAddingErrorText =
            'Something went wrong while trying to add the User.';
          this.userAddingError = true;
        }
      }
    },
    closeDialog () {
      this.userAddingError = false;
      this.addingUser = false;
      this.newUserId = '';
    },
    showDeleteDialog (index) {
      this.currentlyRemovingUserIndex = index;
      this.removingUser = true;
    },
    async deleteUser () {
      if (
        this.currentlyRemovingUserIndex === '' ||
        this.currentlyRemovingUserIndex === undefined ||
        this.currentlyRemovingUserIndex === null
      ) {
        this.userRemovingErrorText = 'Please provide a valid UserID';
        this.userRemovingError = true;
      } else {
        console.log(this.users);

        const req = await api.removeUser(
          this.users[this.currentlyRemovingUserIndex].user_id
        );

        if (req.status === 202) {
          this.userRemovingError = false;
          this.removingUser = false;
          await this.reload();

          this.currentlyRemovingUserIndex = 0;
        } else if (req.status === 409) {
          this.userRemovingErrorText = "User doesn't exist";
          this.userRemovingError = true;
        } else {
          this.userRemovingErrorText =
            'Something went wrong while trying to remove the User.';
          this.userRemovingError = true;
        }
      }
    },
    closeDeletionDialog () {
      this.userRemovingError = false;
      this.removingUser = false;
      this.currentlyRemovingUserIndex = 0;
    }
  }
};
</script>

<style lang="scss">
.userTitle {
  padding-left: 20px;
  padding-top: 10px;
}
</style>
