declare module "vue" {
  import { CompatVue } from "vue";
  const Vue: CompatVue;
  export default Vue;
  export * from "@vue/runtime-dom";
  const { configureCompat } = Vue;
  export { configureCompat };
}
