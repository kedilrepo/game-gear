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
  </div>
</template>

<script>
import TextWithLeftPicture from "@/components/TextWithLeftPicture.vue";
import TextWithRightPicture from "@/components/TextWithRightPicture.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
export default {
  name: "Home",
  components: {
    TextWithLeftPicture,
    TextWithRightPicture,
    HeaderTitle
  }
};
</script>

<style lang="scss">
p {
  margin-bottom: 0px;
}
</style>
