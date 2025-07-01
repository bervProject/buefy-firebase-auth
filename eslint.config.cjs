const globals = require("globals");
const prettierConfig = require("@vue/eslint-config-prettier");
const pluginVue = require('eslint-plugin-vue');
const {
  defineConfigWithVueTs,
  vueTsConfigs,
} = require('@vue/eslint-config-typescript');

module.exports = defineConfigWithVueTs(
    {
		files: ["**/*.ts", "**/*.js", "**.*.vue"],
	},
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },

            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        }
    },
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
        rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "vue/multi-word-component-names": "warn",
        },
    },
    prettierConfig
);
