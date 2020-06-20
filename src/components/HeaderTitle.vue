<template>
  <div class="backgroundHeaderTitle">
    <div class="headertitle">
      <div class="imageWrapper">
        <v-img height="400px" :src="titlepictureURL">
          <div class="bigTitle">
            <h1>{{ bigTitle }}</h1>
          </div>
        </v-img>
      </div>
      <div class="cleanwrapper">
        <div class="subtitle" v-if="subTitle != undefined">
          <h2>{{subTitle}}</h2>
        </div>
      </div>
      <!-- <img class="image" :src="titlepictureURL" /> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titlepictureURL: String,
    bigTitle: {
      type: String,
      required: true
    },
    subTitle: String
  }
};
</script>

<style lang="scss">
$mobileWidth: 700px;

.imageWrapper {
  max-width: 1140px;
  margin: 0 auto;
}

.bigTitle {
  position: absolute;
  text-align: left;
  margin-left: 10px;
  top: 320px;
  left: 16px;
  color: whitesmoke;
  transition: 0.5s;

  @media (min-width: $mobileWidth) {
    top: 270px;
    transition: 0.5s;
  }
}

.cleanwrapper {
  max-width: 1140px;
  margin: 0 auto;
}

.subtitle {
  text-align: left;
  margin: 0px 10px 0px 10px;
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


