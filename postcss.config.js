module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue() {
        return 100;
      },
      propList: ["*"],
    },
  },
};
