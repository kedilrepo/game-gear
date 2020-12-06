<template>
  <section>
    <div class="backgroundHeaderTitle">
      <div class="headertitle">
        <div class="imageWrapper">
          <v-img height="400px" :src="imageUrl"> </v-img>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    imageUrl: String
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
</style>
