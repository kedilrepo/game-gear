<template>
    <!--<div class="loading" v-if="loading">Loading...</div>
    <div class="noItems" v-if="!loading && data.length === 0">No data</div>
    <Content :data="data"></Content>!-->

    <section class="py-7 py-md-0 bg-hero" id="home">
    <div class="container">
        <div class="row vh-md-100">
            <div class="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
                <h1 class="h1 heading-black text-capitalize">Better gaming experience with better gaming equipment.</h1>
                <p class="p p-colored lead py-3">Look now for the best deals.<br>Sichern Sie sich jetzt das beste Gamingequipment mit den besten Preisen!</p>
                <!-- <v-btn color="green" @click="deleteData()" :disabled="uploading">Delete</v-btn> -->
            </div>
        </div>
    </div>
</section>
</template>

<script>
// import Content from "@/components/Content";
import api from "@/api";

export default {
  name: "Home",
  components: {
    // Content
  },
  data() {
    return {
      loading: false,
      data: [],
      model: {}
    };
  },
  async beforeRouteEnter(to, from, next) {
    let res = await api.getData("home");
    console.log(res);
    next(vm => {
      vm.data = res.data;
    });
  },
  async beforeRouteUpdate(to, from, next) {
    console.log("Before Route UPDATE");

    let res = await api.getData("home");
    this.data = res.data;
    next();
  },
  methods: {
    async refreshData() {
      this.loading = true;
      this.data = await api.getData("home");
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">

.p-colored {
  color: #CFD8DC;
  text-align: center !important;
}

.p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 3rem;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.5;
  color: #ffffff; }

section {
  display: block; }

.py-3 {
  padding-top: 1rem !important; }

.py-3 {
  padding-bottom: 1rem !important; }

.py-7 {
  padding-top: 9rem !important; }

.py-7 {
  padding-bottom: 9rem !important; }

.py-md-0 {
    padding-top: 0 !important; }

.py-md-0 {
    padding-top: 0 !important; }

.bg-hero {
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='#000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='#053529' cx='400' cy='400' r='500'/%3E%3Ccircle fill='#0a634d' cx='400' cy='400' r='400'/%3E%3Ccircle fill='#0e9271' cx='400' cy='400' r='300'/%3E%3Ccircle fill='#13c095' cx='400' cy='400' r='200'/%3E%3Ccircle fill='#1de9b6' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
  /* background by SVGBackgrounds.com */
  background-attachment: fixed;
  background-size: cover;
  position: relative; }
  .bg-hero:before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: "";
    background-color: rgba(0, 0, 0, 0.7); }
  .bg-hero .container {
    z-index: 2;
    position: relative; }
  
  .container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto; }
  @media (min-width: 576px) {
    .container {
      max-width: 540px; } }
  @media (min-width: 768px) {
    .container {
      max-width: 720px; } }
  @media (min-width: 992px) {
    .container {
      max-width: 960px; } }
  @media (min-width: 1200px) {
    .container {
      max-width: 1140px; } }

  .row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px; }

  @media (min-width: 768px) {
  .vh-md-100 {
    height: 100vh; } }

.col-md-8, .col-sm-10{
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px; }

.col-md-8 {
    -ms-flex: 0 0 66.66667%;
        flex: 0 0 66.66667%;
    max-width: 66.66667%; }

.col-sm-10 {
    -ms-flex: 0 0 83.33333%;
        flex: 0 0 83.33333%;
    max-width: 83.33333%; }

.col-12 {
  -ms-flex: 0 0 100%;
      flex: 0 0 100%;
  max-width: 100%; }

.mx-auto {
  margin-right: auto !important; }

.mx-auto {
  margin-left: auto !important; }

.text-center {
  text-align: center !important; }

.heading-black {
  font-weight: 800; }

.text-capitalize {
  text-transform: capitalize !important; }

.lead {
  font-size: 1.2rem;
  font-weight: 500; }

</style>
