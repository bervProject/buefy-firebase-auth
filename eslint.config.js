import globals from "globals";
import prettierConfig from "@vue/eslint-config-prettier";
import pluginVue from 'eslint-plugin-vue';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
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
