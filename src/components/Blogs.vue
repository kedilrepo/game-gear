<template>
  <section>
    <div class="background">
      <div class="content">
        <h1>Unser Blog</h1>
        <div v-for="(blog, index) in data" :key="index">
          <SmallBlog :name="blog.blogName" :url="blog.blogUrl" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SmallBlog from "@/components/SmallBlog.vue";

export default {
  components: {
    SmallBlog
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