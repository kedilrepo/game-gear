<template>
  <v-app-bar color="#1e1e1e" flat>
    <strong class="py-2 white--text">{{appTitle}}</strong>
    <v-spacer></v-spacer>
    <div>
      <v-btn
        v-for="link in menuItems"
        :key="link.iconName"
        color="white"
        text
        rounded
        class="my-2"
        v-on:click="goTo(link.path)"
      >{{ link.title }}</v-btn>
    </div>
    <!-- <v-spacer></v-spacer>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon.url"
          class="mx-4"
          dark
          icon
          v-on:click.native="openNewTab(icon.url)"
        >
          <v-icon size="24px">{{ icon.iconName }}</v-icon>
        </v-btn>
    </div>-->
  </v-app-bar>
</template>

<script>
import { mdiFace, mdiLockOpen, mdiKeyboard } from "@mdi/js";
export default {
  data() {
    return {
      appTitle: "GameGear",
      sidebar: false,
      menuItems: [
        { title: "Tastaturen", path: "/tastaturen", icon: mdiKeyboard },
        { title: "Mauspads", path: "/mousepads", icon: mdiFace },
        { title: "Headsets", path: "/headsets", icon: mdiLockOpen },
        { title: "Mäuse", path: "/mouses", icon: mdiLockOpen }
      ]
    };
  },
  methods: {
    goTo: function(routeName) {
      this.$router.push("/" + routeName.toLowerCase());
    },
    openNewTab: function(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style lang="scss">
$mobileNavWidth: 750px;

.navbuttons {
  max-width: 80px;

  @media (min-width: $mobileNavWidth) {
    max-width: 100%;
  }
}

.navbar {
  background-color: #1e1e1e;
}

.appTitle {
  font-size: 2rem;
  margin-left: 2rem;
}
</style>