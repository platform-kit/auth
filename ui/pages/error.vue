<template>
  <Layout id="layout" class="p-3">
    <div
      class="
        btn
        bg-white
        btn-block
        border
        mb-2
        text-danger
        btn-success
        shadow-on-hover
      "
    >
      <b-icon-exclamation-triangle
        class="mr-2 text-danger"
      ></b-icon-exclamation-triangle>
      Something went wrong.
    </div>
  </Layout>
</template>

<script>
export default {
  name: "Error",
  head: {
    title: "Error",
    /*
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    */
    link: [
      { rel: "icon", type: "image/png", href: process.env.LOGO || "/icon.png" },
    ],
  },
  async mounted() {
    localStorage.removeItem("redirect");
  },
};
</script>

<style scoped>
#layout {
  min-height: 100vh;  
}

.btn-success {
  border-color: rgba(0, 150, 150, 0.2) !important;
}
</style>