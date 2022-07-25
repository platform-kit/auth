<template>
  <Layout id="layout" class="p-3">
    <div
      class="
        btn
        bg-white
        btn-block
        border
        mb-2
        text-dark
        btn-success
        shadow-on-hover
      "
    >
      <b-icon-check class="mr-2 text-success"></b-icon-check> Login Successful.
    </div>
  </Layout>
</template>

<script>
export default {
  name: "Success",
  head: {
    title: "Success",
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
  data() {
    return {
      redirect: null,
      redirectDomain: null,
      redirectAllowed: false,
      args: null,
      allowedDomains: [],
    };
  },
  async mounted() {
    this.allowedDomains = process.env.allowedDomains;

    const params = new URLSearchParams(window.location.search);

    this.redirect = params.get("redirect");
    if (
      this.isLocalStorageAvailable() /* function to detect if localstorage is supported*/
    ) {
      this.redirect = localStorage.getItem("redirect");
      this.redirectDomain = localStorage.getItem("redirect");
    }
    localStorage.removeItem("redirect");
    this.args = window.location.href.split("/success")[1];
    this.redirect = this.redirect + this.args;
    if (this.allowedDomains.includes(this.redirectDomain)) {
      window.location.replace(this.redirect);
    }
  },
  methods: {
    isLocalStorageAvailable() {
      var test = "test";
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    },
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