<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title :style="footerStyle">
        <div>
          <v-btn
            v-for="link in links"
            :key="link.iconName"
            color="white"
            text
            rounded
            class="my-2"
            @click="goTo(link.url)"
          >
            {{ link.name }}
          </v-btn>
        </div>
        <v-spacer />
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon.url"
            class="mx-4"
            dark
            icon
            @click.native="openNewTab(icon.url)"
          >
            <v-icon size="24px">
              {{ icon.iconName }}
            </v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        <strong>{{ appName }}</strong>
        - {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Colors from '@/colors.js';
import GeneralConfig from '@/GeneralConfig.js';

export default {
  data: () => ({
    icons: GeneralConfig.footerIcons,
    links: GeneralConfig.footerLinks,
    appName: GeneralConfig.appTitle
  }),
  computed: {
    footerStyle () {
      return `background-color: ${Colors.footerColor} !important;
  border-color: ${Colors.footerColor} !important;`;
    }
  },
  methods: {
    goTo (routeName) {
      this.$router.push('/' + routeName.toLowerCase());
    },
    openNewTab (url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style>
.titleCard {
  background-color: lightskyblue !important;
  border-color: lightskyblue !important;
}
</style>
