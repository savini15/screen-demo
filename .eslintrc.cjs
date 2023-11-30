module.exports = {
    // 在 extends 尾部增加 plugin:prettier/recommended
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:prettier/recommended",
    ],
    rules: {
        "no-unused-vars": "off",
        "no-console": "off",
        "no-debugger": "off",
        indent: ["error", 2, { SwitchCase: 1 }],
      },
      overrides: [
        {
          files: ["src/**/*.vue"],
          rules: { "vue/multi-word-component-names": "off" },
        },
      ],
  };