<template>
  <div class="background">
    <div class="content">
      <v-alert border="left" color="#167362" dark class="leftTextAlign" type="info">
        <p class="zeromargin">
          <component :is="transformed" />
        </p>
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: String
  },
  computed: {
    transformed() {
      let transformedText = `<p class="zeromargin">${this.info}</p>`;
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

.verticalAlign {
  @media (min-width: $mobileWidth) {
    vertical-align: middle;
  }
}

.alignCorrect {
  @media (min-width: $mobileWidth) {
    display: flex;
  }
}

.bigIcon {
  font-size: 500px;
}

.zeromargin {
  margin-bottom: 0;
  color: whitesmoke;
}
</style>