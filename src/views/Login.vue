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
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="pw"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#009688" @click="login()" :disabled="!formValid"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-alert type="error" v-show="error">
          Test
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
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    login() {
      console.log(fb.auth);
      fb.auth
        .signInWithEmailAndPassword(this.email, this.pw)
        .then(async () => {
          console.log("hihihi");
          try {
            await api.checkUser();
          } catch {
            alert("Something wrong!");
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          console.log(`Error ${errorCode} threw message ${errorMessage}`);
        });
    },
  },
};
/*
.then(() => {
          api.checkUser();
        })
*/
</script>
