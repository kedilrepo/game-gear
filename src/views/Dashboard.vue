<template>
  <v-container class="fill-height" fluid>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <v-list-item-icon>
          <v-icon>{{ accountBox }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ user.data.email }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>{{ chevronLeft }}</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="goTo(item.url)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item link justify-end height="20px" @click="signOut()">
        <v-list-item-icon>
          <v-icon>{{ logout }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <router-view :key="$route.path" />
  </v-container>
</template>

<script>
import {
  mdiHomeCity,
  mdiAccount,
  mdiBookOpenPageVariant,
  mdiAccountBox,
  mdiChevronLeft,
  mdiLogout,
  mdiBlogger
} from "@mdi/js";
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Home",
          icon: mdiHomeCity,
          url: "/dashboard/home"
        },
        {
          title: "Users",
          icon: mdiAccount,
          url: "/dashboard/users"
        },
        {
          title: "Pages",
          icon: mdiBookOpenPageVariant,
          url: "/dashboard/editPages"
        },
        {
          title: "Blog",
          icon: mdiBlogger,
          url: "/dashboard/editBlogs"
        }
      ],
      mini: true,
      accountBox: mdiAccountBox,
      chevronLeft: mdiChevronLeft,
      logout: mdiLogout
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    },
    goTo: function(routeName) {
      this.$router.push(routeName.toLowerCase());
    }
  }
};
</script>

<style></style>
