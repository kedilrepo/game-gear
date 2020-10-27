<template>
    <!--<div class="loading" v-if="loading">Loading...</div>
    <div class="noItems" v-if="!loading && data.length === 0">No data</div>
    <Content :data="data"></Content>!-->
    <section class="body">
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

  <section class="pt-6 pb-7" id="features">
    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto text-center">
                <h2 class="heading-black h2">Vergleiche, was du brauchst</h2>
                <p class="text-muted lead p text-center">Zu jedem Equipment die passende, professionelle Meinung.</p>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-10 mx-auto">
                <div class="row feature-boxes">
                    <div class="col-md-6 box">
                        <div class="icon-box box-primary">
                            <div class="icon-box-inner">
                                <v-icon>{{keyboard}}</v-icon>
                            </div>
                        </div>
                        <h5 class="h5">Tastaturen</h5>
                        <p class="text-muted p">Von mechanischen bis zu Rubberdome-Tastaturen.</p>
                    </div>
                    <div class="col-md-6 box">
                        <div class="icon-box box-success">
                            <div class="icon-box-inner">
                                <v-icon>{{mouse}}</v-icon>
                            </div>
                        </div>
                        <h5 class="h5">Mäuse</h5>
                        <p class="text-muted p">Ob Seitentasten, schlicht, oder mit übermäßig vielen Funktionen - Alles im Überblick.</p>
                    </div>
                    <div class="col-md-6 box">
                        <div class="icon-box box-danger">
                            <div class="icon-box-inner">
                                <v-icon>{{mousepad}}</v-icon>
                            </div>
                        </div>
                        <h5 class="h5">Mauspads</h5>
                        <p class="text-muted" p>Ob man es glaubt oder nicht - auch ein gutes Mauspad kann deine Performance wesentlich erhöhen.</p>
                    </div>
                    <div class="col-md-6 box">
                        <div class="icon-box box-info">
                            <div class="icon-box-inner">
                                <v-icon>{{headset}}</v-icon>
                            </div>
                        </div>
                        <h5 class="h5">Headsets</h5>
                        <p class="text-muted p">Das passende Mikrofon ist direkt dabei!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    </section>
</template>

<script>
// import Content from "@/components/Content";
import api from "@/api";
import { mdiKeyboard, mdiMouse, mdiTrackpad, mdiHeadsetDock } from "@mdi/js";

export default {
  name: "Home",
  components: {
    // Content
  },
  data() {
    return {
      loading: false,
      data: [],
      model: {},
      keyboard: mdiKeyboard,
      mouse: mdiMouse,
      mousepad: mdiTrackpad,
      headset: mdiHeadsetDock
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

// .body {
//     margin: 0;
//   font-family: "Inter UI", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
//   font-size: 1rem;
//   font-weight: 400;
//   line-height: 1.5;
//   color: #CFD8DC;
//   text-align: left;
// }

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

.h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.5;
  color: #2c3e50;
  font-size: 2.5rem;
}

.h5 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.5;
  color: #2c3e50;
  font-size: 1.25rem;
}

section {
  display: block; }

.py-3 {
  padding-top: 1rem !important; }

.py-3 {
  padding-bottom: 1rem !important; }

.py-6 {
  padding-top: 6rem !important; }

.py-7 {
  padding-top: 9rem !important; }

.py-7, .pb-7 {
  padding-bottom: 9rem !important; }

.py-md-0 {
    padding-top: 0 !important; }

.py-md-0 {
    padding-top: 0 !important; }

.mt-5 {
  margin-top: 3rem !important; }

.bg-hero {
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='#ffffff' cx='400' cy='400' r='600'/%3E%3Ccircle fill='#9aabb2' cx='400' cy='400' r='500'/%3E%3Ccircle fill='#81979f' cx='400' cy='400' r='400'/%3E%3Ccircle fill='#4f6d79' cx='400' cy='400' r='300'/%3E%3Ccircle fill='#1d4353' cx='400' cy='400' r='200'/%3E%3Ccircle fill='#042F40' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
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
  height: 100vh; }
.col-md-6 {
    -ms-flex: 0 0 50%;
        flex: 0 0 50%;
    max-width: 50%; }
.col-md-8 {
    -ms-flex: 0 0 66.66667%;
        flex: 0 0 66.66667%;
    max-width: 66.66667%; }

.col-md-10 {
    -ms-flex: 0 0 83.33333%;
        flex: 0 0 83.33333%;
    max-width: 83.33333%; }

.col-sm-10 {
    -ms-flex: 0 0 83.33333%;
        flex: 0 0 83.33333%;
    max-width: 83.33333%; }

.col-12 {
  -ms-flex: 0 0 100%;
      flex: 0 0 100%;
  max-width: 100%; } }

.col-md-8, .col-sm-10, .col-md-6, .col-md-10 {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px; }



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

.heading-black {
  font-weight: 800; }

.text-muted {
  color: #78909C !important; }

.feature-boxes {
  text-align: center;
  box-sizing: border-box; }

.feature-boxes .box {
  padding: 3rem; }

.icon-box {
  position: relative;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  background-color: #ffffff;
  margin: 1rem; }

.icon-box.box-primary {
  color: #1de9b6;
  background-color: rgba(29, 233, 182, 0.1); }

.icon-box.box-success {
    color: #00e676;
    background-color: rgba(0, 230, 118, 0.1); }

.icon-box.box-danger {
    color: #ff1744;
    background-color: rgba(255, 23, 68, 0.1); }

.icon-box.box-info {
    color: #00e5ff;
    background-color: rgba(0, 229, 255, 0.1); }

.icon-box .icon-box-inner {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
        flex-direction: row;
    -ms-flex-align: center;
        align-items: center;
    padding: 1.5rem; }
</style>
