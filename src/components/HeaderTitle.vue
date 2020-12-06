<template>
  <section>
    <div class="backgroundHeaderTitle">
      <div class="headertitle">
        <div class="imageWrapper">
          <v-img height="400px" :src="titlepictureURL">
            <div v-if="lightTitle" class="bigTitle titleLight">
              <h1>
                <span v-html="bigTitle" />
              </h1>
            </div>
            <div v-else class="bigTitle titleDark">
              <h1>
                <span v-html="bigTitle" />
              </h1>
            </div>
          </v-img>
        </div>
        <div class="cleanwrapper">
          <div class="subtitle" v-if="subTitle !== undefined">
            <h2>
              <component :is="transformed" />
            </h2>
          </div>
        </div>
        <!-- <img class="image" :src="titlepictureURL" /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    titlepictureURL: String,
    bigTitle: {
      type: String,
      required: true
    },
    subTitle: String,
    lightTitle: Boolean
  },
  computed: {
    transformed() {
      let transformedText = "<h2>" + this.subTitle + "</h2>";
      return { template: transformedText };
    }
  }
};
</script>

<style lang="scss">
$mobileWidth: 700px;

.headertitle {
  background-color: #f8f9fa;
}

.imageWrapper {
  max-width: 1140px;
  margin: 0 auto;
  background-color: #fff;
}

.bigTitle {
  position: absolute;
  text-align: left;
  margin-left: 10px;
  top: 320px;
  left: 16px;
  transition: 0.5s;

  @media (min-width: $mobileWidth) {
    top: 270px;
    transition: 0.5s;
  }
}

.titleLight {
  color: whitesmoke;
}

.titleDark {
  color: darkslategrey;
}

.cleanwrapper {
  max-width: 1140px;
  margin: 0 auto;
}

.subtitle {
  text-align: left;
  margin: 0 10px 0 10px;
  color: darkslategrey;

  @media (min-width: $mobileWidth) {
  }

  h2 {
    font-size: 15px;
    font-weight: 540;
    transition: 0.5s;

    @media (min-width: $mobileWidth) {
      font-size: 20px;
      transition: 0.5s;
    }
  }
}
</style>
