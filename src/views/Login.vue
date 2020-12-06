<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="#009688" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Login"
                name="login"
                :disabled="loading"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="pw"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :disabled="loading"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#009688"
              @click="login()"
              :disabled="!formValid || loading"
              >Login
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          type="error"
          v-model="error"
          transition="scale-transition"
          dismissible
          >Invalid User
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import api from "@/api";

export default {
  data() {
    return {
      email: "",
      pw: "",
      formValid: false,
      showPassword: false,
      error: false,
      loading: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    async login() {
      this.loading = true;
      var e = await fb.auth
        .signInWithEmailAndPassword(this.email, this.pw)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // this.loading = false;
          // this.error = true;
          console.log(`Error ${errorCode} threw message ${errorMessage}`);
          return error;
        });
      console.log(e);
      if (e.code != null) {
        console.log(e.code);
        console.log("Failed to login");
        this.wrongLogin();
        return;
      }

      try {
        let success = await api.checkUser();
        if (success) {
          this.$router.push("/dashboard");
        } else {
          this.wrongLogin();
        }
      } catch (e) {
        console.log(e);
        this.wrongLogin();
      }
    },
    wrongLogin() {
      this.loading = false;
      this.error = true;
    }
  }
};
/*
.then(() => {
          api.checkUser();
        })
*/
</script>
