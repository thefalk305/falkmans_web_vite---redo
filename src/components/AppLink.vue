<!-- prettier-ignore-file -->
<script>
  import { RouterLink } from "vue-router";
  export default {
    props: {
      ...RouterLink.props,
    },
    computed: {
      isExternal() {
      console.log(this.to);
        return typeof this.to === "string" && this.to.startsWith("http");
      },
      isInfoPage() {
      console.log(this.to);
        return typeof this.to === "string" && this.to.startsWith("InfoPage");
      },
    },
  };
</script>

<template>
  <a v-if="isExternal" :href="to" rel="noopener" class="external-link" target="_blank"
    ><slot /></a>
  <router-link v-else-if="isInfoPage" :href="to" rel="noopener" class="external-link" target="_blank"
    ><slot /></router-link>
  <router-link v-else :="$props" class="internal-links" ><slot /> </router-link>
</template>

<style scoped>

a:visited  {
  color: rgba(20, 20, 5, 0.219);
}

a {
color: black;}
  a:hover {
    background-color: rgb(185, 248, 234);
    border-radius: 5px;
  }
</style>
