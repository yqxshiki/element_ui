<template>
  <i :class="'el-icon-'+name"></i>
</template>

<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String
    }
  }
};
</script>
<style>
</style>