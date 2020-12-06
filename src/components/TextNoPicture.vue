<template>
  <section>
    <div class="background">
      <div class="content">
        <v-container fluid>
          <div class="title">
            <h1>{{ title }}</h1>
          </div>
          <div class="details">
            <p>
              <component :is="transformed" />
            </p>
          </div>
        </v-container>
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

<style lang="scss"></style>
