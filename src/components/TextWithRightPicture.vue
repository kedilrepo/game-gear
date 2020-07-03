<template>
  <div class="background">
    <div class="content">
      <v-flex>
        <div class="title">
          <h1>{{ title }}</h1>
        </div>
        <div class="details">
          <div class="leftTextAlign">
            <p><span v-html="text" /></p>
          </div>
          <img :src="imageUrl" />
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    text: String
  }
};
</script>

<style lang="scss">
$mobileWidth: 700px;

.leftTextAlign {
  text-align: center;

  @media (min-width: $mobileWidth) {
    text-align: left;
  }
}
</style>