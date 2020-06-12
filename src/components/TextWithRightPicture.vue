<template>
  <div class="background" :style="{'--backgroundColor': realbackgroundColor}">
    <div class="content">
      <div class="title">
        <h1>{{ title }}</h1>
      </div>
      <div class="details">
        <div class="leftTextAlign">
          <p>{{ text }}</p>
        </div>
        <img :src="imageUrl" />
      </div>
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
    text: String,
    backgroundColor: String
  },
  computed: {
    realbackgroundColor: function() {
      if (this.backgroundColor === undefined || this.backgroundColor === null) {
        return "#f8f9fa";
      } else {
        return this.backgroundColor;
      }
    }
  }
};
</script>

<style lang="scss">
$mobileWidth: 700px;

.background {
  padding: 0;
  background-color: var(--backgroundColor);
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (min-width: $mobileWidth) {
    padding: 20px 0 20px 0;
  }
}

.content {
  padding: 20px 0 20px 0;
  max-width: 1140px;
  margin: 0 auto;
  background-color: white;
  transition: 0.5s;

  @media (min-width: $mobileWidth) {
    border-radius: 25px;
    max-width: 1140px;
    padding: 20px;
    transition: 0.5s;
  }
}

.title {
  padding-left: 10px;
  align-self: start;
  align-content: center;
  margin: 14px 0 20px 0;
  h1 {
    align-self: start;
    text-align: left;
    font-size: 40px;
    font-weight: 500;
    color: #2e4573;
  }
}

.details {
  display: inline;

  @media (min-width: $mobileWidth) {
    display: flex;
    justify-content: space-between;
  }

  img {
    justify-content: center;
    max-width: 500px;
    height: auto;

    @media (min-width: $mobileWidth) {
      height: auto;
      width: 100;
      max-width: 400px;
      max-height: 600px;
    }
  }

  .leftTextAlign {
    text-align: center;

    @media (min-width: $mobileWidth) {
      text-align: left;
    }
  }

  p {
    color: darkslategrey;
    font-weight: 300;

    @media (min-width: $mobileWidth) {
      margin: 0 0 0 20px;
    }
  }
}
</style>