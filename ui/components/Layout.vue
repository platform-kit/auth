<!-- Please remove this file from your project -->
<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped>
.layout {
  min-width: 100%;
  background: linear-gradient(rgb(198, 223, 255), #fff);
}

.br-10 {
  border-radius:10px;
}
</style>