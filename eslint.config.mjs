import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptRules from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**"] },
  ...coreWebVitals,
  ...typescriptRules,
];

export default eslintConfig;
