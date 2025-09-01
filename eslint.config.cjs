const globals = require("globals");
const pluginVue = require("eslint-plugin-vue");
const prettierConfig = require("@vue/eslint-config-prettier");
const { globalIgnores } = require("eslint/config");
const {
  defineConfigWithVueTs,
  vueTsConfigs,
} = require("@vue/eslint-config-typescript");

module.exports = defineConfigWithVueTs(
  globalIgnores(["dist/*", "node_modules/*", ".yarn/*"]),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  },
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  {
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "vue/multi-word-component-names": "warn",
      "vue/prefer-import-from-vue": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
  prettierConfig,
);
