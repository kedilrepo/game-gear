<template class="nav">
  <nav class="navbar" :style="navbarStyle">
    <span id="js-navbar-toggle" class="navbar-toggle" @click="toggleNavbar()">
      <v-icon
        v-if="!isToggled"
        size="24px"
        color="#ffffff"
      >{{ menuIcon }}
      </v-icon>
      <v-icon v-else size="24px" color="#ffffff">{{ menuCloseIcon }}</v-icon>
    </span>
    <router-link to="/home" class="logo">
      {{ appTitle }}
    </router-link>
    <ul id="js-menu" class="main-nav" :class="{ active: isToggled }">
      <li v-for="(menuItem, index) in menuItems" :key="index">
        <router-link
          :to="menuItem.path"
          class="nav-links"
          @click="closeNavbar"
        >
          {{ menuItem.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Colors from '@/colors.js';
import GeneralConfig from '@/GeneralConfig.js';

import { mdiMenu, mdiClose } from '@mdi/js';

export default {
  data () {
    return {
      appTitle: GeneralConfig.appTitle,
      sidebar: false,
      menuItems: GeneralConfig.navbarItems,
      isToggled: false,
      menuIcon: mdiMenu,
      menuCloseIcon: mdiClose
    };
  },
  computed: {
    navbarStyle: () => {
      return `background-image: linear-gradient(260deg, ${Colors.navbarColor} 0%, ${Colors.footerColor} 100%);`;
    }
  },
  methods: {
    toggleNavbar () {
      this.isToggled = !this.isToggled;
    },
    closeNavbar () {
      this.isToggled = false;
    }
  }
};
</script>

<style lang="scss">
$mobileNavWidth: 750px;

.navbar {
  font-size: 18px;
  //border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
  box-sizing: border-box;
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
  text-align: initial;
}

.main-nav {
  list-style-type: none;
}

.nav-links,
.logo {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  opacity: 1;
}

.main-nav li {
  text-align: center;
  margin: 15px auto;
}

.logo {
  display: inline-block;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 20px;
  text-transform: capitalize !important;
  font-weight: 800;
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}

.main-nav {
  list-style-type: none;
  display: none;
  transform: 0.5s;
}

.active {
  display: block;
}

@media screen and (min-width: 900px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }

  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: none;
    border-radius: 4px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  .main-nav li:hover {
    background-color: rgba(239, 239, 239, 0.12);
    transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  }

  .nav-links {
    margin-left: 20px;
    margin-right: 20px;
  }

  .logo {
    margin-top: 0;
  }

  .navbar-toggle {
    display: none;
  }

  .logo:hover,
  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
