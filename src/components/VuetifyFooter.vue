<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal">
        <div>
          <v-btn
            v-for="link in links"
            :key="link.iconName"
            color="white"
            text
            rounded
            class="my-2"
            v-on:click="goTo(link)"
          >{{ link }}</v-btn>
        </div>
        <v-spacer></v-spacer>
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
        </div>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        <strong>GameGear</strong>
        - {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      { iconName: "mdi-facebook", url: "https://facebook.com" },
      { iconName: "mdi-twitter", url: "https://twitter.com/kedilinfo" },
      { iconName: "mdi-linkedin", url: "https://linkedin.com/kedilinfo" },
      { iconName: "mdi-instagram", url: "https://instagram.com/kedilinfo" }
    ],
    links: ["Home", "Impressum", "Team", "Services", "Blog", "Contact Us"]
  }),
  methods: {
    goTo: function(routeName) {
      this.$router.push({ name: routeName });
    },
    openNewTab: function(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style></style>
