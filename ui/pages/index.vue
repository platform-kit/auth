<template>
  <Layout id="layout" class="p-3">
    <div class="login-options text-center">
      <img :src="logo()" class="logo" />
      <div v-if="platforms != null">
        <a
          v-if="platforms.mail == true"
          v-b-modal.magic-link-modal
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-facebook
            shadow-on-hover
          "
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-envelope icon alt"
              :icon="['fas', 'envelope']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Email</span
          >
        </a>
        <a
          v-if="platforms.facebook == true"
          href="/auth/facebook"
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-facebook
            shadow-on-hover
          "
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-facebook icon alt"
              :icon="['fab', 'facebook']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Facebook</span
          >
        </a>
        <a
          v-if="platforms.linkedin == true"
          href="/auth/linkedin"
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-linkedin
            shadow-on-hover
          "
        >
          <span class="brand-icon">
            <font-awesome-icon
              class="icon-linkedin icon alt"
              :icon="['fab', 'linkedin']"
            />
          </span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>LinkedIn</span
          >
        </a>

        <a
          v-if="platforms.dropbox == true"
          href="/auth/dropbox"
          class="btn bg-white btn-block border mb-2 btn-dropbox shadow-on-hover"
        >
          <span class="brand-icon">
            <font-awesome-icon
              class="icon-dropbox icon alt"
              :icon="['fab', 'dropbox']"
            />
          </span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Dropbox</span
          >
        </a>
        <a
          v-if="platforms.twitter == true"
          href="/auth/twitter"
          class="btn bg-white btn-block border mb-2 btn-twitter shadow-on-hover"
        >
          <span class="brand-icon">
            <font-awesome-icon
              class="icon-twitter icon alt"
              :icon="['fab', 'twitter']"
            />
          </span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Twitter</span
          >
        </a>
        <a
          v-if="platforms.facebook == true"
          href="/auth/instagram"
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-facebook
            shadow-on-hover
          "
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-instagram icon alt"
              :icon="['fab', 'instagram']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Instagram</span
          >
        </a>
        <a
          v-if="platforms.google == true"
          href="/auth/google"
          class="btn bg-white btn-block border mb-2 btn-google shadow-on-hover"
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-google icon alt"
              :icon="['fab', 'google']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Google</span
          >
        </a>

        <a
          v-if="platforms.reddit == true"
          href="/auth/reddit"
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-pinterest
            shadow-on-hover
          "
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-reddit icon alt"
              :icon="['fab', 'reddit']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Reddit</span
          >
        </a>

        <a
          v-if="platforms.youtube == true"
          href="/auth/youtube"
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-pinterest
            shadow-on-hover
          "
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-youtube icon alt"
              :icon="['fab', 'youtube']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>YouTube</span
          >
        </a>
        <a
          v-if="platforms.pinterest == true"
          href="/auth/pinterest"
          class="
            btn
            bg-white
            btn-block
            border
            mb-2
            btn-pinterest
            shadow-on-hover
          "
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-pinterest icon alt"
              :icon="['fab', 'pinterest']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>Pinterest</span
          >
        </a>
        <a
          v-if="platforms.github == true"
          href="/auth/github"
          class="btn bg-white btn-block border mb-2 btn-github shadow-on-hover"
        >
          <span class="brand-icon"
            ><font-awesome-icon
              class="icon-github icon alt"
              :icon="['fab', 'github']"
          /></span>
          <span class="login-label"
            ><span class="opacity-50">Sign in with </span>GitHub</span
          >
        </a>
        <span class="badge mt-3 text-small border footer-badge"
          ><b-icon-lock class="mr-2"></b-icon-lock>Auth by PlatformKit</span
        >
      </div>
    </div>
    <b-modal hide-footer id="magic-link-modal" title="Sign In">
      <form action="/auth/link" method="post">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon-envelope></b-icon-envelope>
          </b-input-group-prepend>
          <b-form-input
            name="email"
            autocomplete="off"
            v-model="email"
            placeholder="tony.stark@example.com"
          ></b-form-input>
          <b-input-group-append style="border-radius: 0px 4px 4px 0px">
            <b-button
              type="submit"
              @click="/*loginWithEmail()*/"
              v-bind:class="{
                'bg-dark text-light': email != null && email != '',
                disabled: email == null && email == '',
              }"
              ><b-icon-arrow-right></b-icon-arrow-right
            ></b-button>
          </b-input-group-append>
        </b-input-group>
      </form>
    </b-modal>
  </Layout>
</template>

<script>
export default {
  name: "Index",
  head: {
    title: "Sign On",
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
      status: "loading",
      redirect: null,
      email: null,
      platforms: null,
      redirect: null,
    };
  },
  async mounted() {
    this.platforms = process.env.features;
    console.log("Features Enabled: \n");
    console.log(process.env.features);
    const params = new URLSearchParams(window.location.search);
    if (params.has("redirect")) {
      this.redirect = params.get("redirect");
      if (
        this.isLocalStorageAvailable() /* function to detect if localstorage is supported*/
      ) {
        localStorage.setItem("redirect", this.redirect);
      }
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
    loginWithEmail() {},
    logo() {
      return process.env.LOGO || "icon.png";
    },
  },
};
</script>

<style scoped>
#layout {
  min-height: 100vh;
  
}

.icon-facebook {
  color: rgb(0, 74, 163) !important;
}

.login-options .btn:hover {
  background: #ecf5ff !important;
  transform: scale(1.05);
}

.icon-envelope {
  color: rgb(184, 199, 233);
}

.icon-twitter {
  color: rgb(0, 115, 255) !important;
}

.icon-dropbox {
  color: rgb(0, 96, 213) !important;
}

.icon-linkedin {
  color: rgb(50, 110, 184) !important;
}

.icon-google {
  color: rgb(255, 90, 90);
}

.icon-pinterest {
  color: rgb(188, 0, 0);
}

.icon-instagram {
  color: rgb(255, 0, 132);
}

.icon-youtube {
  color: rgb(255, 0, 0);
}

.icon-reddit {
  color: orangered;
}

.icon-github {
  color: #444;
}

.btn-twitter:hover {
  background: #ecf5ff !important;
}

.login-options .btn:hover {
  box-shadow: 0px 10px 20px rgba(0, 50, 100, 0.05),
    0px 5px 5px rgba(0, 50, 100, 0.175) !important;
}

.logo {
  border: 1px solid rgba(0, 150, 150, 0.2) !important;
  display: block;
  border-radius: 50px;
  max-width: 100px;
  margin: 10px auto 25px auto;
  box-shadow: 0px 4px 15px rgba(0, 50, 100, 0.05),
    0px 2px 5px rgba(0, 50, 100, 0.05) !important;
}

.login-options {
  max-width: 450px !important;
  margin: auto;
}

.login-options .btn {
  transition: all 0.3s;
  border-radius: 5px !important;
  border-color: rgba(0, 150, 150, 0.2) !important;
  box-shadow: 0px 4px 15px rgba(0, 50, 100, 0.05),
    0px 2px 5px rgba(0, 50, 100, 0.05) !important;
}

.brand-icon {
  width: 40px;
  display: inline-block;
  text-align: left;
  float: left;
}

.login-label {
  min-width: 180px;
  text-align: left;
  margin-left: -10px;
  display: inline-block;
}

.opacity-50 {
  opacity: 0.5;
}

.text-small {
  font-size: 60%;
}

.footer-badge {
  background: #ebf3fb;
  border: 1px solid rgba(0, 75, 75, 0.1) !important;
  opacity: 1;
  padding: 5px 10px !important;
  color: #3c6384;
  border-radius: 25px;
}
</style>