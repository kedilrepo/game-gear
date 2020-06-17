<template>
  <div class="home">
    <HeaderTitle
      bigTitle="TestTitle"
      titlepictureURL="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      subTitle="Hey my friend Ullamco pariatur anim et nulla proident ipsum commodo labore proident cillum quis magna aliqua sunt. Et laborum voluptate laboris tempor aliquip sint sunt reprehenderit ex dolor consequat pariatur. Non officia eiusmod cillum."
    ></HeaderTitle>
    <TextWithLeftPicture
      title="testestest"
      imageUrl="https://via.placeholder.com/150"
      text="asdklajsdbfkajsfb ksajdfhkjashkjasdhfkjasdh fsdjhfsakjd fhjsadhfasjdf Adipisicing id reprehenderit in duis pariatur ipsum duis consequat do tempor tempor excepteur sit minim. Nulla reprehenderit dolor ipsum sunt. Adipisicing duis occaecat sunt id qui ex quis est id quis veniam. Est velit voluptate laboris eiusmod exercitation cillum exercitation ut qui est."
    ></TextWithLeftPicture>
    <TextWithRightPicture
      title="testestest"
      imageUrl="https://via.placeholder.com/150"
      text="asdklajsdbfkajsfb ksajdfhkjashkjasdhfkjasdh fsdjhfsakjd fhjsadhfasjdf Adipisicing id reprehenderit in duis pariatur ipsum duis consequat do tempor tempor excepteur sit minim. Nulla reprehenderit dolor ipsum sunt. Adipisicing duis occaecat sunt id qui ex quis est id quis veniam. Est velit voluptate laboris eiusmod exercitation cillum exercitation ut qui est."
    ></TextWithRightPicture>
    <div class="loading" v-if="loading">Loading...</div>
    <div class="noItems" v-if="!loading && data.length === 0">No data</div>
    <div v-for="info in data" :key="info"></div>
  </div>
</template>

<script>
import TextWithLeftPicture from "@/components/TextWithLeftPicture.vue";
import TextWithRightPicture from "@/components/TextWithRightPicture.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import api from "@/api";
export default {
  name: "Home",
  components: {
    TextWithLeftPicture,
    TextWithRightPicture,
    HeaderTitle
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
    next(vm => {
      vm.data = res;
    });
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
p {
  margin-bottom: 0px;
}
</style>
