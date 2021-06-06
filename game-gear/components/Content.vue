<template>
  <section>
    <div v-for="(item, index) in data" :key="index">
      <div v-if="item.type === 'headertitle'">
        <HeaderTitle
          :big-title="item.title"
          :titlepicture-u-r-l="item.background_image"
          :sub-title="item.sub_title"
          :light-title="item.light_title"
        />
      </div>
      <div v-else-if="item.type === 'textwithleftpicture'">
        <TextWithLeftPicture
          :title="item.title"
          :image-url="item.image_url"
          :text="item.main_text"
        />
      </div>
      <div v-else-if="item.type === 'textwithrightpicture'">
        <TextWithRightPicture
          :title="item.title"
          :image-url="item.image_url"
          :text="item.main_text"
        />
      </div>
      <div v-else-if="item.type === 'textnopicture'">
        <TextNoPicture
          :title="item.title"
          :text="item.main_text"
        />
      </div>
      <div v-else-if="item.type === 'ad'">
        <Ad />
      </div>
      <div v-else-if="item.type === 'infobox'">
        <Infobox :info="item.info" />
      </div>
      <div v-else-if="item.type === 'comparisontable'">
        <ComparisonTable :json="item.json" />
      </div>
      <div v-else-if="item.type === 'imagebox'">
        <ImageBox :image-url="item.image_url" />
      </div>
    </div>
    <LastEdited :last-edited="lastEdited" />
  </section>
</template>
<script>
import TextWithLeftPicture from '@/components/TextWithLeftPicture.vue';
import TextWithRightPicture from '@/components/TextWithRightPicture.vue';
import TextNoPicture from '@/components/TextNoPicture.vue';
import HeaderTitle from '@/components/HeaderTitle.vue';
import Ad from '@/components/Ad.vue';
import Infobox from '@/components/Infobox.vue';
import ComparisonTable from '@/components/ComparisonTable.vue';
import LastEdited from '@/components/LastEdited.vue';
import ImageBox from '@/components/ImageBox';
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
