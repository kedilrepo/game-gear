<template>
  <div>
    <h1>Not Found</h1>
    <p>
      Ooooops we couldn't find that page. Try going
      <router-link :to="{ name: 'Home' }">home</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
