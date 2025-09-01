module.exports = {
  publicPath: process.env.VUE_APP_IGNORE_PATH
    ? "/"
    : process.env.NODE_ENV === "production"
      ? "/buefy-firebase-auth/"
      : "/",

  transpileDependencies: true,
  
  lintOnSave: false,
  
  css: {
    loaderOptions: {
      css: {
        url: false
      }
    }
  }
};
