
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts", "@nuxt/ui", "@nuxt/image", ""],
  googleFonts: {
    families: {
      "Work Sans": true,
      download: true,
      inject: true,
    },
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/", href: "/favicon.svg" }],
    },
  },
  image:{
    format: ["svg"]
  },
});