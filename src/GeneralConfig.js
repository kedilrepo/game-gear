import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram } from "@mdi/js";

export default {
    get navbarItems() {
        return [
            { title: "Tastaturen", path: "/tastaturen" },
            { title: "Mauspads", path: "/mauspads" },
            { title: "Headsets", path: "/headsets" },
            { title: "Mäuse", path: "/maeuse" }
        ];
    },
    get appTitle() {
        return "GameGear";
    },
    get footerLinks() {
        return [
            { name: "Home", url: "" },
            { name: "Impressum", url: "impressum" },
            { name: "Team", url: "team" },
            { name: "Services", url: "services" },
            { name: "Blog", url: "blog" },
            { name: "Contact Us", url: "contact" }
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
}