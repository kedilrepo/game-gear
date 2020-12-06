import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram } from "@mdi/js";

export default {
  get navbarItems() {
    return [
      { title: "Tastaturen", path: "/tastaturen" },
      { title: "Mauspads", path: "/mauspads" },
      { title: "Headsets", path: "/headsets" },
      { title: "Mäuse", path: "/maeuse" },
      { title: "Sonstiges", path: "/other" },
      { title: "Lexikon", path: "/lexikon" }
    ];
  },
  get appTitle() {
    return "GameGear";
  },
  get footerLinks() {
    return [
      { name: "Home", url: "" },
      { name: "Blog", url: "blog" },
      { name: "Contact Us", url: "contact" },
      { name: "Impressum", url: "impressum" },
      { name: "Datenschutz", url: "datenschutz" }
    ];
  },
  get footerIcons() {
    return [
      { iconName: mdiFacebook, url: "https://facebook.com" },
      { iconName: mdiTwitter, url: "https://twitter.com/kedilinfo" },
      { iconName: mdiLinkedin, url: "https://linkedin.com/kedilinfo" },
      { iconName: mdiInstagram, url: "https://instagram.com/kedilinfo" }
    ];
  }
};