<template>
  <section>
    <div class="background">
      <div class="content">
        <v-flex>
          <div class="title">
            <h1>{{ title }}</h1>
          </div>
          <div class="details">
            <div class="leftTextAlign">
              <p>
                <component :is="transformed" />
              </p>
            </div>
            <img :src="imageUrl" alt="" />
          </div>
        </v-flex>
      </div>
    </div>
  </section>
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
  },
  computed: {
    transformed() {
      let transformedText = "<div>" + this.text + "</div>";
      return { template: transformedText };
    }
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
