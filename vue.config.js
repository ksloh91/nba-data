// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/nba-data/" // Replace 'nba-data' with your repository name
      : "/",
};
