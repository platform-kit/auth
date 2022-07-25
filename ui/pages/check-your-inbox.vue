<template>
  <Layout id="layout" class="p-3">
    <div class="btn bg-white btn-block border mb-2 text-dark btn-success shadow-on-hover">
      <b-icon-envelope class="mr-2 text-success"></b-icon-envelope> Check your inbox for the login link.
    </div>
  </Layout>
</template>

<script>
export default {
  name: "CheckYourInbox",
   head: {
    title: "Check Your Inbox",
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
};
</script>

<style scoped>
#layout {
  min-height: 100vh;
  background: linear-gradient(180deg, #f2faff, transparent);
}

.btn-success {
  border-color: rgba(0, 150, 150, 0.2) !important;
}
</style>