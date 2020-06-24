<template>
  <section>
    <div v-for="(item, index) in data" :key="index">
      <div v-if="item.content.type == 'headertitle'">
        <HeaderTitle
          :bigTitle="item.content.title"
          :titlepictureURL="item.content.background_image"
          :subTitle="item.content.sub_title"
        ></HeaderTitle>
      </div>
      <div v-else-if="item.content.type == 'textwithleftpicture'">
        <TextWithLeftPicture
          :title="item.content.title"
          :imageUrl="item.content.image_url"
          :text="item.content.main_text"
        ></TextWithLeftPicture>
      </div>
      <div v-else-if="item.content.type == 'textwithrightpicture'">
        <TextWithRightPicture
          :title="item.content.title"
          :imageUrl="item.content.image_url"
          :text="item.content.main_text"
        ></TextWithRightPicture>
      </div>
      <div v-else-if="item.content.type == 'textnopicture'">
        <TextNoPicture :title="item.content.title" :text="item.content.main_text"></TextNoPicture>
      </div>
    </div>
  </section>
</template>
<script>
import TextWithLeftPicture from "@/components/TextWithLeftPicture.vue";
import TextWithRightPicture from "@/components/TextWithRightPicture.vue";
import TextNoPicture from "@/components/TextNoPicture.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
export default {
  components: {
    TextWithLeftPicture,
    TextWithRightPicture,
    TextNoPicture,
    HeaderTitle
  },
  props: {
    data: {
      required: true
    }
  }
};
</script>

<style>
</style>