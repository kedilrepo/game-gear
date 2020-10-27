<template class="nav">
  <nav class="navbar" :style="navbarStyle">
    <span class="navbar-toggle" id="js-navbar-toggle" @click="toggleNavbar()">
      <v-icon v-if="!isToggled" size="24px" color="#ffffff">{{ menuIcon }} </v-icon>
      <v-icon v-else size="24px" color="#ffffff">{{ menuCloseIcon }}</v-icon>
    </span>
    <router-link to="/home" class="logo">{{ appTitle }}</router-link>
    <ul class="main-nav" :class="{active: isToggled}" id="js-menu">
      <li v-for="(menuItem, index) in menuItems" :key="index">
        <router-link :to="menuItem.path" class="nav-links">{{menuItem.title}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Colors from "@/colors.js";
import GeneralConfig from "@/GeneralConfig.js";

import { mdiMenu, mdiClose } from "@mdi/js";

export default {
  data() {
    return {
      appTitle: GeneralConfig.appTitle,
      sidebar: false,
      menuItems: GeneralConfig.navbarItems,
      isToggled: false,
      menuIcon: mdiMenu,
      menuCloseIcon: mdiClose
    };
  },
  methods: {
    toggleNavbar() {
      this.isToggled = !this.isToggled;
    }
  },
  computed: {
    navbarStyle: () => {
      return `background-image: linear-gradient(260deg, ${Colors.navbarColor} 0%, ${Colors.footerColor} 100%);`;
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
  color: rgba(255, 255, 255, 0.7);
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
}

.active {
  display: block;
}

@media screen and (min-width: 768px) {
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
  }

  .nav-links {
    margin-left: 40px;
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