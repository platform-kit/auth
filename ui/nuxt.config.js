var allowedDomains = process.env.ALLOWED_DOMAINS;
if(allowedDomains == null || allowedDomains == ''){
  allowedDomains = ' ';
}
allowedDomains = allowedDomains.split(',');

var features = {
  mail: false,
  facebook: false,
  twitter: false,
  google: false,
  github: false,
  pinterest: false,
  reddit: false,
};
// Feature Flags
if (
  process.env.MAIL_USER != null &&
  process.env.MAIL_KEY != null &&
  process.env.MAIL_HOST != null &&
  process.env.MAIL_PORT != null
) {
  features.mail = true;
}

if (
  process.env.FACEBOOK_APP_SECRET != null &&
  process.env.FACEBOOK_CLIENT_ID != null
) {
  features.facebook = true;
}

if (
  process.env.TWITTER_APP_ID != null &&
  process.env.TWITTER_CONSUMER_API_KEY != null &&
  process.env.TWITTER_CONSUMER_API_SECRET != null
) {
  features.twitter = true;
}
if (
  process.env.GOOGLE_CLIENT_ID != null &&
  process.env.GOOGLE_CLIENT_SECRET != null
) {
  features.google = true;
}

if (
  process.env.GITHUB_CLIENT_ID != null &&
  process.env.GITHUB_CLIENT_SECRET != null
) {
  features.github = true;
}

if (
  process.env.PINTEREST_APP_ID != null &&
  process.env.PINTEREST_APP_SECRET != null
) {
  features.pinterest = true;
}
if (
  process.env.REDDIT_APP_ID != null &&
  process.env.REDDIT_APP_SECRET != null
) {
  features.google = true;
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ui",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/fontawesome.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/fontawesome",
    "@nuxtjs/style-resources",
    ["@nuxtjs/dotenv", { path: "../" }],
  ],

  // Environment Variables
  env: {
    baseUrl: process.env.BASE_URL || "https://localhost:3000",
    logo: process.env.LOGO || "icon.png",
    features: features,
    allowedDomains: allowedDomains
  },

  fontAwesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],

  // Bootstrap-Vue
  bootstrapVue: {
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
