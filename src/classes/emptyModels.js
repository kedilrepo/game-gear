export default {
  headerTitle() {
    return {
      title: "",
      background_image: "",
      sub_title: "",
      type: "headertitle",
      light_title: true
    };
  },
  textnopicture() {
    return {
      title: "",
      main_text: "",
      type: "textnopicture"
    };
  },
  textleftpicture() {
    return {
      title: "",
      image_url: "",
      main_text: "",
      type: "textwithleftpicture"
    };
  },
  textrightpicture() {
    return {
      title: "",
      image_url: "",
      main_text: "",
      type: "textwithrightpicture"
    };
  },
  ad() {
    return {
      type: "ad"
    };
  },
  infobox() {
    return {
      info: "",
      type: "infobox"
    };
  },
  comparisonTable() {
    return {
      type: "comparisontable",
      json: "{\"tableName\":\"\",\"columnTitles\":[],\"rows\":[]}"
    };
  },
  imageBox() {
    return {
      type: "imagebox",
      image_url: ""
    };
  }
};
