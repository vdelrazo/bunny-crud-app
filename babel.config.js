module.exports = {
  presets: [
      [ "@vue/cli-plugin-babel/preset", {
          useBuiltIns: "entry",
          exclude: [
              "@babel/transform-regenerator",
              "@babel/transform-async-to-generator",
              "@babel/transform-for-of"
          ],
      }],
  ],
  plugins: [
      [ "@babel/transform-for-of", {
          loose: true
      }],
  ],
};
