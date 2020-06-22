<template>
  <v-flex>
    <v-layout align-center v-if="loading">
      <v-row justify="center">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </v-row>
    </v-layout>
    <v-layout v-else>
      <a>Hallo</a>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style></style>
