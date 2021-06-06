<template>
  <div class="background">
    <div class="content">
      <v-container fluid>
        <div
          id="adsgoeshere"
          style="background: #1d1f29; padding-top:60px; text-align: center;"
          v-html="adsenseContent"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adsenseContent: ''
    };
  },
  mounted () {
    this.adsenseContent = document.getElementById(
      'divadsensedisplaynone'
    ).innerHTML;
  }
};
</script>

<style></style>
