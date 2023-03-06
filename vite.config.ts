import { defineConfig, loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";

var envPrefix = ["POKEFUSION_UI_", "VITE_"] as string[];

// https://vitejs.dev/config/
export default defineConfig(config => {
  var env = loadEnv(config.mode, ".", envPrefix);
  return {
    plugins: [
      react(),
      tsconfigPaths({
        projects: ["."],
      }),
      svgr(),
      htmlPlugin(env),
      basicSsl(),
      // mkcert(),
      viteSingleFile({
        inlinePattern: ["**/*.js"],
        deleteInlinedFiles: true,
      }),
    ],
    envPrefix,
    server: {
      https: true,
      port: 3000,
    },
    assetsInclude: ["public/**/*"],
    base: env.BASE_URL,
  };
});

/**
 * Replace env variables in index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-999473946
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: "html-transform",
    transformIndexHtml: {
      enforce: "pre" as const,
      transform: (html: string): string =>
        html.replace(/<%(.*?)%>/g, (match, p1) => env[p1] ?? match),
    },
  };
}
