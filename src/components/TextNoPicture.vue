<template>
  <div class="background">
    <div class="content">
      <v-container fluid>
        <div class="title">
          <h1>{{ title }}</h1>
        </div>
        <div class="details">
          <p>
            <span v-html="text" />
          </p>
        </div>
      </v-container>
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
    text: String
  }
};
</script>

<style lang="scss">
</style>