import { defineConfig } from 'wxt';
import { UserManifest, } from "wxt"
import svgr from "vite-plugin-svgr";
import path from 'path';
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  publicDir: "public",
  vite: () => ({
    plugins: [
      svgr()
    ],
  }),
  manifest: (UserManifest) => {
    const manifest: UserManifest = {
      name: import.meta.env.DISPLAY_NAME,
      host_permissions: ["https://*/*", "http://*/*"],
      icons: {
        "16": "icon/icon16.png",
        "32": "icon/icon32.png",
        "48": "icon/icon48.png",
        "128": "icon/icon128.png"
      },
      action: {
        default_icon: {
          "16": "icon/icon16.png",
          "32": "icon/icon32.png",
          "48": "icon/icon48.png",
          "128": "icon/icon128.png"
        },
        "default_title": "沉浸式预览 - AI 驱动的网页浏览体验",
      },
      "content_security_policy": {
        "extension_pages": "script-src 'self'; object-src 'self'; upgrade-insecure-requests; frame-src https://*;"
      },
      permissions: ['storage', "sidePanel"],
    }
    return manifest
  },
  alias: {
    "~": path.resolve(__dirname, "entrypoints"),
    src: path.resolve(__dirname, "./entrypoints/"),
    "@/entrypoints": path.resolve(__dirname, "./entrypoints"),
    "@/components": path.resolve(__dirname, "./src/components"),
    "@/src": path.resolve(__dirname, "./src"),
    "@/assets": path.resolve(__dirname, "./assets"),
  }
});
