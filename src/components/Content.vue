<template>
  <section>
    <div v-for="(item, index) in data" :key="index">
      <div v-if="item.type === 'headertitle'">
        <HeaderTitle
          :bigTitle="item.title"
          :titlepictureURL="item.background_image"
          :subTitle="item.sub_title"
          :lightTitle="item.light_title"
        ></HeaderTitle>
      </div>
      <div v-else-if="item.type === 'textwithleftpicture'">
        <TextWithLeftPicture
          :title="item.title"
          :imageUrl="item.image_url"
          :text="item.main_text"
        ></TextWithLeftPicture>
      </div>
      <div v-else-if="item.type === 'textwithrightpicture'">
        <TextWithRightPicture
          :title="item.title"
          :imageUrl="item.image_url"
          :text="item.main_text"
        ></TextWithRightPicture>
      </div>
      <div v-else-if="item.type === 'textnopicture'">
        <TextNoPicture
          :title="item.title"
          :text="item.main_text"
        ></TextNoPicture>
      </div>
      <div v-else-if="item.type === 'ad'">
        <Ad></Ad>
      </div>
      <div v-else-if="item.type === 'infobox'">
        <Infobox :info="item.info"></Infobox>
      </div>
      <div v-else-if="item.type === 'comparisontable'">
        <ComparisonTable :json="item.json"></ComparisonTable>
      </div>
      <div v-else-if="item.type === 'imagebox'">
        <ImageBox :imageUrl="item.image_url"></ImageBox>
      </div>
    </div>
    <LastEdited :lastEdited="lastEdited"></LastEdited>
  </section>
</template>
<script>
import TextWithLeftPicture from "@/components/TextWithLeftPicture.vue";
import TextWithRightPicture from "@/components/TextWithRightPicture.vue";
import TextNoPicture from "@/components/TextNoPicture.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import Ad from "@/components/Ad.vue";
import Infobox from "@/components/Infobox.vue";
import ComparisonTable from "@/components/ComparisonTable.vue";
import LastEdited from "@/components/LastEdited.vue";
import ImageBox from "@/components/ImageBox";
export default {
  components: {
    TextWithLeftPicture,
    TextWithRightPicture,
    TextNoPicture,
    HeaderTitle,
    Ad,
    Infobox,
    ComparisonTable,
    LastEdited,
    ImageBox
  },
  props: {
    data: {
      required: true
    },
    lastEdited: {
      required: true
    }
  }
};
</script>

<style></style>
